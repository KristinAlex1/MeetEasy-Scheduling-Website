"use client";

import DaysList from "@/app/_utils/DaysList";
import React, { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { app } from "@/config/FirebaseConfig";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { toast } from "sonner";

function Availability() {
  const [daysAvailable, setDaysAvailable] = useState({
    Sunday: false,
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
  });
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const db = getFirestore(app);
  const { user } = useKindeBrowserClient();

  useEffect(() => {
    const fetchBusinessInfo = async () => {
      if (user) {
        try {
          const docRef = doc(db, "Business", user.email);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            setDaysAvailable(data.daysAvailable || {});
            setStartTime(data.startTime || "");
            setEndTime(data.endTime || "");
          }
        } catch (error) {
          console.error("Error fetching business info:", error);
        }
      }
    };

    fetchBusinessInfo();
  }, [user, db]);

  const handleDayChange = (day, value) => {
    setDaysAvailable((prev) => ({
      ...prev,
      [day]: value,
    }));
  };

  const handleSave = async () => {
    if (!user) return;

    try {
      const docRef = doc(db, "Business", user.email);
      await updateDoc(docRef, { daysAvailable, startTime, endTime });
      toast.success("Availability updated successfully!");
    } catch (error) {
      console.error("Error updating availability:", error);
      toast.error("Failed to update availability.");
    }
  };

  return (
    <div className="p-8 bg-white shadow rounded-lg max-w-4xl mx-auto">
      <h2 className="text-center text-3xl font-bold text-blue-600 mb-6">
        Availability
      </h2>
      <hr className="border-gray-300 mb-8" />

      <section>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Available Days
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {DaysList.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:shadow transition"
            >
              <Checkbox
                checked={daysAvailable[item.day] || false}
                onCheckedChange={(e) => handleDayChange(item.day, e)}
              />
              <label className="text-gray-700">{item.day}</label>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Available Times
        </h3>
        <div className="flex flex-col md:flex-row gap-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Time
            </label>
            <Input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="border-gray-300 rounded w-full shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End Time
            </label>
            <Input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="border-gray-300 rounded w-full shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </section>

      <div className="mt-10 text-center">
        <Button
          onClick={handleSave}
          className="px-6 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 focus:outline-none"
        >
          Save
        </Button>
      </div>
    </div>
  );
}

export default Availability;

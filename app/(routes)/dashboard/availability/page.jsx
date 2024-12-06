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
  const { user } = useKindeBrowserClient();
  const db = getFirestore(app);

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
    <div className="p-8 bg-white shadow-lg rounded-xl max-w-4xl mx-auto">
      <h1 className="text-center text-4xl font-extrabold text-blue-700 mb-8">
        Set Your Availability
      </h1>

      <div className="border-b mb-6 pb-4">
        <h2 className="text-xl font-semibold text-gray-800">Available Days</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {DaysList.map((item, index) => (
            <div
              key={index}
              className={`flex items-center gap-3 p-4 rounded-lg transition shadow-sm ${
                daysAvailable[item.day]
                  ? "bg-blue-100 border border-blue-500"
                  : "bg-gray-100 hover:shadow-lg"
              }`}
            >
              <Checkbox
                checked={daysAvailable[item.day] || false}
                onCheckedChange={(e) => handleDayChange(item.day, e)}
                className="focus:ring-blue-500"
              />
              <label
                className={`font-medium ${
                  daysAvailable[item.day] ? "text-blue-700" : "text-gray-700"
                }`}
              >
                {item.day}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Available Times</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Time
            </label>
            <Input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="border-gray-300 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500"
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
              className="border-gray-300 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="mt-10 flex justify-center">
        <Button
          onClick={handleSave}
          className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Save Availability
        </Button>
      </div>
    </div>
  );
}

export default Availability;

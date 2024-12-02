"use client";

import DaysList from "@/app/_utils/DaysList";
import React, { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  collection,
  doc,
  getDoc,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
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
    if (user) {
      getBusinessInfo();
    }
  }, [user]);

  const getBusinessInfo = async () => {
    try {
      const docRef = doc(db, "Business", user.email);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const result = docSnap.data();
        setDaysAvailable(result.daysAvailable || {});
        setStartTime(result.startTime || "");
        setEndTime(result.endTime || "");
      } else {
        console.error("No such document!");
      }
    } catch (error) {
      console.error("Error fetching business info:", error);
    }
  };

  const onHandleChange = (day, value) => {
    setDaysAvailable((prev) => ({
      ...prev,
      [day]: value,
    }));
    console.log("Updated Days Available:", daysAvailable);
  };

  const handleSave = async () => {
    try {
      console.log(daysAvailable, startTime, endTime);
      const docRef = doc(db, "Business", user?.email);
      await updateDoc(docRef, {
        daysAvailable,
        startTime,
        endTime,
      });
      toast.success("Changes updated successfully!");
    } catch (error) {
      console.error("Error updating availability:", error);
      toast.error("Failed to update availability.");
    }
  };

  return (
    <div className="p-10 bg-white shadow-md rounded-lg">
      <h2 className="font-bold text-3xl text-blue-600 mb-5">Availability</h2>
      <hr className="mb-7 border-gray-300" />

      {/* Days Availability Section */}
      <div>
        <h2 className="font-semibold text-lg mb-3">Available Days</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {DaysList.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <Checkbox
                checked={daysAvailable[item.day] || false}
                onCheckedChange={(e) => onHandleChange(item.day, e)}
              />
              <span className="text-gray-700">{item.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Time Availability Section */}
      <div className="mt-10">
        <h2 className="font-semibold text-lg mb-3">Available Times</h2>
        <div className="flex flex-col md:flex-row gap-10">
          <div>
            <h3 className="font-medium mb-2">Start Time</h3>
            <Input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="border rounded-lg p-2"
            />
          </div>
          <div>
            <h3 className="font-medium mb-2">End Time</h3>
            <Input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="border rounded-lg p-2"
            />
          </div>
        </div>
      </div>

      <Button
        onClick={handleSave}
        className="mt-10 bg-blue-600 text-white font-semibold hover:bg-blue-700"
      >
        Save
      </Button>
    </div>
  );
}

export default Availability;

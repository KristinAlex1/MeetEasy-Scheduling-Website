import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Clock, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState, useMemo, useCallback } from "react";

function PreviewMeeting({ formValue }) {
  const [date, setDate] = useState(new Date());
  const [timeSlots, setTimeSlots] = useState([]);
  const today = useMemo(() => new Date(), []); // Memoized today's date

  useEffect(() => {
    if (formValue?.duration) {
      createTimeSlot(formValue.duration);
    }
    console.log("Form Value:", formValue); // Debugging
    console.log("Location URL:", formValue?.locationUrl); // Debugging
  }, [formValue?.duration, formValue]);

  /**
   * Creates time slots based on the given interval.
   */
  const createTimeSlot = useCallback((interval) => {
    const startTime = 8 * 60; // 8:00 AM in minutes
    const endTime = 22 * 60; // 10:00 PM in minutes
    const totalSlots = (endTime - startTime) / interval;

    const slots = Array.from({ length: totalSlots }, (_, i) => {
      const totalMinutes = startTime + i * interval;
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      const formattedHours = hours > 12 ? hours - 12 : hours;
      const period = hours >= 12 ? "PM" : "AM";
      return `${String(formattedHours).padStart(2, "0")}:${String(
        minutes
      ).padStart(2, "0")} ${period}`;
    });

    setTimeSlots(slots);
  }, []);

  return (
    <div
      className="p-5 py-10 shadow-lg m-5 border-t-8"
      style={{ borderTopColor: formValue?.themeColor || "#000" }}
    >
      {/* Logo */}
      <Image src="/logo3.png" alt="logo" width={200} height={200} />

      <div className="grid grid-cols-1 md:grid-cols-3 mt-5">
        {/* Meeting Info Section */}
        <div className="p-4 border-r">
          <h2>Business Name</h2>
          <h2 className="font-bold text-3xl">
            {formValue?.eventName || "Meeting Name"}
          </h2>
          <div className="mt-5 flex flex-col gap-4">
            <h2 className="flex gap-2">
              <Clock /> {formValue?.duration || "N/A"} Min
            </h2>
            <h2 className="flex gap-2">
              <MapPin /> {formValue?.locationType || "N/A"} Meeting
            </h2>
            <Link href={formValue?.locationUrl || "#"} className="text-primary">
              {formValue?.locationUrl || "No link provided"}
            </Link>
          </div>
        </div>

        {/* Time and Date Selection */}
        <div className="md:col-span-2 flex px-4">
          <div className="flex flex-col">
            <h2 className="font-bold text-lg">Select Date & Time</h2>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border mt-5"
              disabled={(date) => date <= today}
            />
          </div>
          <div
            className="flex flex-col w-full overflow-auto gap-4 p-5"
            style={{ maxHeight: "400px" }}
          >
            {timeSlots.length > 0 ? (
              timeSlots.map((time) => (
                <Button
                  key={time}
                  className="border-primary text-primary"
                  variant="outline"
                >
                  {time}
                </Button>
              ))
            ) : (
              <p>No time slots available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreviewMeeting;

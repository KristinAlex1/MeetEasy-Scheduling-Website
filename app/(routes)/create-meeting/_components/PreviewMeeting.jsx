import { Clock, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

function PreviewMeeting({ formValue }) {
  const {
    eventName = "Meeting Name",
    duration = "N/A",
    locationType = "N/A",
    locationUrl = "#",
    themeColor = "#4CAF50",
    businessName = "Business Name",
  } = formValue || {};

  const [selectedTime, setSelectedTime] = useState("");
  const generateTimeSlots = (interval) => {
    const slots = [];
    const startHour = 9; // 9 AM
    const endHour = 18; // 6 PM

    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += interval) {
        const period = hour >= 12 ? "PM" : "AM";
        const displayHour = hour > 12 ? hour - 12 : hour;
        slots.push(
          `${String(displayHour).padStart(2, "0")}:${String(minute).padStart(
            2,
            "0"
          )} ${period}`
        );
      }
    }
    return slots;
  };

  const timeSlots = duration !== "N/A" ? generateTimeSlots(Number(duration)) : [];

  return (
    <div
      className="p-6 shadow-lg m-5 border-l-8 rounded-md bg-gray-50"
      style={{ borderLeftColor: themeColor }}
    >
      {/* Header */}
      <div className="flex items-center gap-4">
        <Image src="/logo3.png" alt="logo" width={80} height={80} />
        <div>
          
          <p className="text-sm text-gray-600">
            Manage meetings effortlessly with customizable options.
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="my-4 h-[1px] bg-gray-300"></div>

      {/* Meeting Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Meeting Info */}
        <div>
          <h2 className="text-xl font-bold">{eventName}</h2>
          <div className="mt-3 space-y-2">
            <div className="flex items-center text-gray-600 gap-2">
              <Clock className="text-gray-500" />
              <span>{duration} Min</span>
            </div>
            <div className="flex items-center text-gray-600 gap-2">
              <MapPin className="text-gray-500" />
              <span>{locationType} Meeting</span>
            </div>
            {locationUrl && (
              <Link
                href={locationUrl}
                className="text-primary hover:underline"
                target="_blank"
              >
                {locationUrl}
              </Link>
            )}
          </div>
        </div>

        {/* Time Slots */}
        <div>
          
          <div className="grid grid-cols-3 gap-2">
            {timeSlots.map((slot, index) => (
              <button
                key={index}
                onClick={() => setSelectedTime(slot)}
                className={`px-3 py-1 text-sm rounded-md border ${
                  selectedTime === slot
                    ? "bg-primary text-white"
                    : "border-primary text-primary"
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreviewMeeting;

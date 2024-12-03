import { Clock, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function PreviewMeeting({ formValue }) {
  const {
    eventName = "Meeting Name",
    duration = "N/A",
    locationType = "N/A",
    locationUrl = "#",
    themeColor = "#4CAF50", // Default theme color
    businessName = "Business Name",
  } = formValue || {};

  return (
    <div
      className="p-8 py-12 shadow-xl m-5 border-t-8 rounded-lg bg-white"
      style={{ borderTopColor: themeColor }}
    >
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div className="text-left">
          <h1 className="text-2xl font-extrabold text-gray-800">
            Meeting Preview
          </h1>
          <p className="text-gray-600 mt-1">
            Organize your meetings with ease and professionalism.
          </p>
        </div>
        <Image src="/logo3.png" alt="logo" width={100} height={100} />
      </div>

      {/* Divider */}
      <hr className="my-6 border-gray-300" />

      {/* Meeting Details Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
        {/* Left Side: Meeting Info */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold text-gray-800">{eventName}</h2>
          <div className="flex gap-2 items-center text-gray-600">
            <Clock className="text-gray-500" />
            <span>{duration} Min</span>
          </div>
          <div className="flex gap-2 items-center text-gray-600">
            <MapPin className="text-gray-500" />
            <span>{locationType} Meeting</span>
          </div>
          <Link
            href={locationUrl}
            target="_blank"
            className="text-primary font-semibold hover:underline"
          >
            {locationUrl}
          </Link>
        </div>

        
        
      </div>
    </div>
  );
}

export default PreviewMeeting;

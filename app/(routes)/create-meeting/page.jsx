"use client";
import React, { useState } from "react";
import MeetingForm from "./_components/MeetingForm";

function ScheduleMeeting() {
  const [meetingDetails, updateMeetingDetails] = useState(null); // Using a different variable name

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-100 py-6">
      <div className="shadow-lg rounded-md w-full max-w-lg p-6 bg-white">
        <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">Create Meeting</h2>
        <MeetingForm setFormValue={updateMeetingDetails} />
      </div>
    </div>
  );
}

export default ScheduleMeeting;

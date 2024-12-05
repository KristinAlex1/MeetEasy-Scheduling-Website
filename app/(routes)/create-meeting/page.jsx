"use client";
import React, { useState } from "react";
import MeetingForm from "./_components/MeetingForm";
import PreviewMeeting from "./_components/PreviewMeeting";

function ScheduleMeeting() {
  const [meetingDetails, updateMeetingDetails] = useState(null); // Using a different variable name

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-6 py-4">
      {/* Form Section */}
      <div className="shadow-sm border rounded-md flex flex-col p-5 bg-gray-50">
        <h2 className="text-xl font-bold mb-4 text-gray-700">Create Meeting</h2>
        <MeetingForm setFormValue={updateMeetingDetails} />
      </div>

      {/* Preview Section */}
      <div className="lg:col-span-2 shadow-sm border rounded-md p-5 bg-white">
        <h2 className="text-xl font-bold mb-4 text-gray-700">Meeting Preview</h2>
        <PreviewMeeting formValue={meetingDetails} />
      </div>
    </div>
  );
}

export default ScheduleMeeting;

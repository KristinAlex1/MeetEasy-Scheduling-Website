"use client";
import React, { useState } from "react";
import MeetingForm from "./_components/MeetingForm";
import PreviewMeeting from "./_components/PreviewMeeting";

function CreateMeeting() {
  const [formValue, setFormValue] = useState(null); // Initialize formValue with null

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {/* Meeting Form */}
      <div className="shadow-lg border rounded-lg h-screen flex flex-col justify-start p-4">
        <MeetingForm setFormValue={setFormValue} />
      </div>
      {/* Preview */}
      <div className="md:col-span-2 shadow-lg border rounded-lg p-4">
        <PreviewMeeting formValue={formValue} />
      </div>
    </div>
  );
}

export default CreateMeeting;

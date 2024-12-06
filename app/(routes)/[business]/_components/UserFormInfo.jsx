import { Input } from "@/components/ui/input";
import React, { useState } from "react";

function UserDetailsForm({ updateUserName, updateUserEmail, updateUserNote }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");

  const handleNameChange = (e) => {
    const updatedName = e.target.value;
    setName(updatedName);
    updateUserName(updatedName);
  };

  const handleEmailChange = (e) => {
    const updatedEmail = e.target.value;
    setEmail(updatedEmail);
    updateUserEmail(updatedEmail);
  };

  const handleNotesChange = (e) => {
    const updatedNotes = e.target.value;
    setNotes(updatedNotes);
    updateUserNote(updatedNotes);
  };

  return (
    <div className="p-8 max-w-lg mx-auto flex flex-col gap-5 bg-white rounded-lg shadow-lg">
      <h2 className="font-bold text-2xl text-blue-600 mb-5">Enter Your Details</h2>

      {/* Name Input */}
      <div className="flex flex-col mb-4">
        <label className="font-semibold text-lg text-gray-700" htmlFor="name">
          Name <span className="text-red-500">*</span>
        </label>
        <Input
          id="name"
          value={name}
          onChange={handleNameChange}
          placeholder="Enter the recipient's name"
          className="border-gray-300 focus:ring-primary focus:border-primary p-3 rounded-md"
        />
      </div>

      {/* Email Input */}
      <div className="flex flex-col mb-4">
        <label className="font-semibold text-lg text-gray-700" htmlFor="email">
          Email <span className="text-red-500">*</span>
        </label>
        <Input
          id="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter the recipient's email"
          className="border-gray-300 focus:ring-primary focus:border-primary p-3 rounded-md"
        />
      </div>

      {/* Notes Input */}
      <div className="flex flex-col mb-4">
        <label className="font-semibold text-lg text-gray-700" htmlFor="notes">
          Share any notes
        </label>
        <Input
          id="notes"
          value={notes}
          onChange={handleNotesChange}
          placeholder="Enter any special instructions"
          className="border-gray-300 focus:ring-primary focus:border-primary p-3 rounded-md"
        />
      </div>

      {/* Terms and Conditions */}
      <div className="text-xs text-gray-500 mt-4 mb-5">
        By continuing, you agree to MeetEasy's
        <span className="text-blue-600 cursor-pointer"> terms and conditions</span>.
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          onClick={() => alert("Form submitted!")}
          className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default UserDetailsForm;

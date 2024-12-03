import { Input } from "@/components/ui/input"; 
import React from "react";

function UserFormInfo({ setUserName, setUserEmail, setUserNote }) {
  return (
    <div className="p-6 px-10 flex flex-col gap-6 bg-white rounded-lg shadow-lg max-w-lg mx-auto">
      <h2 className="font-bold text-2xl text-blue-600 mb-6">Enter Your Details</h2>

      {/* Name Input */}
      <div className="flex flex-col">
        <label className="font-semibold text-lg text-gray-700 mb-2" htmlFor="name">
          Name <span className="text-red-500">*</span>
        </label>
        <Input
          id="name"
          onChange={(event) => setUserName(event.target.value)}
          placeholder="Enter your name"
          className="border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary p-3 rounded-md"
        />
      </div>

      {/* Email Input */}
      <div className="flex flex-col">
        <label className="font-semibold text-lg text-gray-700 mb-2" htmlFor="email">
          Email <span className="text-red-500">*</span>
        </label>
        <Input
          id="email"
          onChange={(event) => setUserEmail(event.target.value)}
          placeholder="Enter your email"
          className="border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary p-3 rounded-md"
        />
      </div>

      {/* Notes Input */}
      <div className="flex flex-col">
        <label className="font-semibold text-lg text-gray-700 mb-2" htmlFor="notes">
          Share any Notes
        </label>
        <Input
          id="notes"
          onChange={(event) => setUserNote(event.target.value)}
          placeholder="Enter any notes"
          className="border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary p-3 rounded-md"
        />
      </div>

      {/* Terms and Conditions */}
      <div className="text-xs text-gray-500 mt-4 mb-6">
        By proceeding, you confirm that you have read and agree to the MeetEasy
        <span className="text-blue-600 cursor-pointer"> terms and conditions</span>.
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary">
          Submit
        </button>
      </div>
    </div>
  );
}

export default UserFormInfo;

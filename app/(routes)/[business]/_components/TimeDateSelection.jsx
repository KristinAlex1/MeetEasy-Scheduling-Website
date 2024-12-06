import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import React from "react";

function TimeDateSelection({
  date,
  handleDateChange,
  timeSlots,
  setSelectedTime,
  enableTimeSlot,
  selectedTime,
  prevBooking,
}) {
  /**
   * This function checks if a time slot has already been booked or not.
   * @param {*} time - The time slot to check
   * @returns boolean - Returns true if the time slot is already booked, otherwise false
   */
  const checkTimeSlot = (time) => {
    // Create a Set of all booked times for faster lookup
    const bookedTimes = new Set(prevBooking.map((booking) => booking.selectedTime));
    return bookedTimes.has(time); // Return true if time is booked
  };

  return (
    <div className="md:col-span-2 flex px-6 gap-12 py-6 bg-white rounded-lg shadow-lg">
      {/* Calendar Section */}
      <div className="flex flex-col w-1/2">
        <h2 className="font-bold text-xl text-blue-600 mb-4">Select Date</h2>
        <Calendar
          mode="single"
          selected={date}
          onSelect={(d) => handleDateChange(d)}
          className="rounded-lg border p-4 w-full max-w-sm shadow-sm"
          disabled={(d) => new Date(d) <= new Date()} // Disable past dates
        />
      </div>

      {/* Time Slots Section */}
      <div
        className="flex flex-col w-1/2 overflow-auto gap-4 p-6 bg-gray-100 rounded-lg shadow-lg"
        style={{ maxHeight: "450px" }}
      >
        <h2 className="font-bold text-xl text-blue-600 mb-4">Available Time Slots</h2>
        {timeSlots?.length ? (
          timeSlots.map((time, index) => (
            <Button
              key={`timeslot-${index}`} // Each button has a unique key
              disabled={!enableTimeSlot || checkTimeSlot(time)} // Disable button if the time is not available or already booked
              onClick={() => setSelectedTime(time)}
              className={`border-2 border-primary text-primary hover:bg-primary hover:text-white transition duration-300 ${
                time === selectedTime ? "bg-primary text-white" : ""
              }`}
              variant="outline"
            >
              {time}
            </Button>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No time slots available.</p>
        )}
      </div>
    </div>
  );
}

export default TimeDateSelection;

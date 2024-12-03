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
   * Used to check timeslot whether its already booked or not
   * @param {*} time
   * @returns Boolean
   */
  const checkTimeSlot = (time) => {
    return prevBooking.some((item) => item.selectedTime === time);
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
          disabled={(date) => date <= new Date()}
        />
      </div>

      {/* Time Slots Section */}
      <div
        className="flex flex-col w-1/2 overflow-auto gap-4 p-6 bg-gray-100 rounded-lg shadow-lg"
        style={{ maxHeight: "450px" }}
      >
        <h2 className="font-bold text-xl text-blue-600 mb-4">Available Time Slots</h2>
        {timeSlots?.length > 0 ? (
          timeSlots.map((time, index) => (
            <Button
              key={`timeslot-${index}`} // Add a unique key for each time slot
              disabled={!enableTimeSlot || checkTimeSlot(time)}
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

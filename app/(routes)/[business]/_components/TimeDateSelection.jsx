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
    <div className="md:col-span-2 flex px-4 gap-10">
      {/* Calendar Section */}
      <div className="flex flex-col">
        <h2 className="font-bold text-lg text-blue-600 mb-4">Select Date</h2>
        <Calendar
          mode="single"
          selected={date}
          onSelect={(d) => handleDateChange(d)}
          className="rounded-md border mt-5 p-5 w-full max-w-lg" // Adjusted size and spacing
          disabled={(date) => date <= new Date()}
        />
      </div>

      {/* Time Slots Section */}
      <div
        className="flex flex-col w-full overflow-auto gap-4 p-5 bg-gray-50 rounded-md shadow-md"
        style={{ maxHeight: "400px" }}
      >
        <h2 className="font-bold text-lg text-blue-600 mb-4">Available Time Slots</h2>
        {timeSlots?.length > 0 ? (
          timeSlots.map((time, index) => (
            <Button
              key={`timeslot-${index}`} // Add a unique key for each time slot
              disabled={!enableTimeSlot || checkTimeSlot(time)}
              onClick={() => setSelectedTime(time)}
              className={`border-primary text-primary ${
                time === selectedTime && "bg-primary text-white"
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

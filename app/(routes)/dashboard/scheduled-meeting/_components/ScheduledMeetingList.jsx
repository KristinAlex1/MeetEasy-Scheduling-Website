import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CalendarCheck, Clock, Timer } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function ScheduledMeetingList({ meetingList }) {
  return (
    <div className="space-y-4">
      {meetingList &&
        meetingList.map((meeting, index) => (
          <Accordion
            type="single"
            collapsible
            key={index}
            className="rounded-lg shadow-md border border-gray-200 bg-white"
          >
            <AccordionItem value={`item-${index}`}>
              <AccordionTrigger className="text-lg font-medium p-4 bg-blue-100 rounded-t-lg text-blue-800 hover:bg-blue-200 transition-all duration-200">
                {meeting?.formatedDate}
              </AccordionTrigger>
              <AccordionContent className="p-6 bg-gray-50 rounded-b-lg">
                <div className="flex flex-col gap-4">
                  <h2 className="flex items-center gap-2 text-gray-700 text-sm">
                    <Clock className="text-blue-600" />
                    {meeting?.duration} Min
                  </h2>
                  <h2 className="flex items-center gap-2 text-gray-700 text-sm">
                    <CalendarCheck className="text-blue-600" />
                    {meeting.formatedDate}
                  </h2>
                  <h2 className="flex items-center gap-2 text-gray-700 text-sm">
                    <Timer className="text-blue-600" />
                    {meeting.selectedTime}
                  </h2>

                  <Link
                    href={meeting?.locationUrl ? meeting?.locationUrl : "#"}
                    className="text-blue-600 underline text-sm"
                  >
                    {meeting?.locationUrl}
                  </Link>
                </div>
                <Link href={meeting.locationUrl}>
                  <Button className="mt-6 w-full bg-blue-600 text-white hover:bg-blue-700 transition-all">
                    Join Now
                  </Button>
                </Link>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
    </div>
  );
}

export default ScheduledMeetingList;

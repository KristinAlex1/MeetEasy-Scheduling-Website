"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Image from "next/image";
import Link from "next/link";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { app } from "@/config/FirebaseConfig";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import LocationOption from "@/app/_utils/LocationOption";

const MeetingEventForm = ({ onFormDataChange }) => {
  const [eventTitle, setEventTitle] = useState("");
  const [meetingDuration, setMeetingDuration] = useState(30);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [eventUrl, setEventUrl] = useState("");
  const [themeChoice, setThemeChoice] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [generatedMeetingLink, setGeneratedMeetingLink] = useState("");
  const [calendarIntegration, setCalendarIntegration] = useState(false);

  const { user } = useKindeBrowserClient();
  const db = getFirestore(app);
  const router = useRouter();

  const validateEventUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (err) {
      return false;
    }
  };

  const updateFormData = () => {
    onFormDataChange?.({
      eventTitle,
      meetingDuration,
      selectedLocation,
      eventUrl,
      themeChoice,
    });
  };

  useEffect(() => {
    updateFormData();
  }, [eventTitle, meetingDuration, selectedLocation, eventUrl, themeChoice]);

  const handleCreateEvent = async () => {
    if (!user) {
      toast.error("User not authenticated.");
      return;
    }

    if (!validateEventUrl(eventUrl)) {
      toast.error("Invalid URL format.");
      return;
    }

    setIsLoading(true);
    const eventId = Date.now().toString();

    try {
      await setDoc(doc(db, "MeetingEvent", eventId), {
        id: eventId,
        eventTitle,
        meetingDuration,
        selectedLocation,
        eventUrl,
        themeChoice,
        businessId: doc(db, "Business", user?.email),
        createdBy: user?.email,
      });

      const origin = window.location.origin;
      const eventLink = `${origin}/${user?.email}/${eventId}`;
      setGeneratedMeetingLink(eventLink);

      toast.success("New meeting event created successfully!");
      router.replace("/dashboard/meeting-type");
    } catch (error) {
      console.error("Error creating event:", error?.message || error);
      toast.error("Failed to create event. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyLink = () => {
    if (!generatedMeetingLink) {
      toast.error("No link generated yet.");
      return;
    }

    navigator.clipboard
      .writeText(generatedMeetingLink)
      .then(() => toast.success("Link copied to clipboard!"))
      .catch(() => toast.error("Failed to copy link."));
  };

  return (
    <div className="p-8 max-w-2xl mx-auto bg-white rounded-lg shadow-lg">
      <Link href={"/dashboard"} className="flex gap-2 text-primary hover:text-primary-dark mb-6">
        <ChevronLeft size={20} />
        <span className="text-lg font-semibold">Cancel</span>
      </Link>

      <h2 className="text-3xl text-primary font-semibold text-center mb-6">Create Your Event</h2>
      <hr className="mb-6" />

      <div className="space-y-6">
        <div>
          <label className="block text-lg font-semibold mb-2">Event Title *</label>
          <Input
            placeholder="Name of your event"
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
            className="px-4 py-3 rounded-lg border border-gray-300 w-full focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-lg font-semibold mb-2">Meeting Duration *</label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full py-3 text-lg">
                {meetingDuration} Min
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full">
              {[15, 30, 45, 60].map((duration) => (
                <DropdownMenuItem key={duration} onClick={() => setMeetingDuration(duration)} className="hover:bg-gray-100 px-4 py-2">
                  {duration} Min
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div>
          <label className="block text-lg font-semibold mb-2">Location *</label>
          <div className="grid grid-cols-4 gap-4">
            {LocationOption.map((option) => (
              <div
                key={option.name}
                className={`border flex flex-col items-center p-4 rounded-lg cursor-pointer transition-all hover:bg-primary-light ${selectedLocation === option.name && "bg-primary-light border-primary"}`}
                onClick={() => setSelectedLocation(option.name)}
              >
                <Image src={option.icon} width={30} height={30} alt={option.name} />
                <span className="mt-2">{option.name}</span>
              </div>
            ))}
          </div>
        </div>

        {selectedLocation && (
          <div>
            <label className="block text-lg font-semibold mb-2">Add {selectedLocation} URL *</label>
            <Input
              placeholder="Add URL"
              value={eventUrl}
              onChange={(e) => setEventUrl(e.target.value)}
              className="px-4 py-3 rounded-lg border border-gray-300 w-full focus:ring-2 focus:ring-primary"
            />
          </div>
        )}
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="calendarIntegration"
          checked={calendarIntegration}
          onChange={() => setCalendarIntegration((prev) => !prev)}
          className="mr-2"
        />
        <label htmlFor="calendarIntegration" className="text-lg">Add to Google Calendar</label>
      </div>

      <Button
        className="w-full mt-8 py-3 text-lg font-semibold"
        disabled={!eventTitle || !meetingDuration || !selectedLocation || !eventUrl || isLoading}
        onClick={handleCreateEvent}
      >
        {isLoading ? "Creating..." : "Create Event"}
      </Button>

      {generatedMeetingLink && (
        <Button
          variant="outline"
          className="w-full mt-4 py-3 text-lg"
          onClick={handleCopyLink}
        >
          Copy Link
        </Button>
      )}
    </div>
  );
};

export default MeetingEventForm;

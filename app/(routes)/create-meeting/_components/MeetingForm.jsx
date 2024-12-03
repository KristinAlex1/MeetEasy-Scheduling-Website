"use client";
import React, { useState, useEffect, useCallback } from "react";
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
import ThemeOptions from "@/app/_utils/ThemeOptions";

function MeetingForm({ setFormValue }) {
  const [themeColor, setThemeColor] = useState("");
  const [eventName, setEventName] = useState("");
  const [duration, setDuration] = useState(30);
  const [locationType, setLocationType] = useState("");
  const [locationUrl, setLocationUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatedLink, setGeneratedLink] = useState("");

  const { user } = useKindeBrowserClient();
  const db = getFirestore(app);
  const router = useRouter();

  const validateUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (err) {
      return false;
    }
  };

  const updateFormValue = useCallback(() => {
    if (setFormValue) {
      setFormValue({
        eventName,
        duration,
        locationType,
        locationUrl,
        themeColor,
      });
    }
  }, [eventName, duration, locationType, locationUrl, themeColor, setFormValue]);

  useEffect(() => {
    updateFormValue();
  }, [updateFormValue]);

  const onCreateClick = useCallback(async () => {
    if (!user) {
      toast.error("User not authenticated.");
      return;
    }

    if (!validateUrl(locationUrl)) {
      toast.error("Invalid URL format.");
      return;
    }

    try {
      setLoading(true);
      const id = Date.now().toString();

      await setDoc(doc(db, "MeetingEvent", id), {
        id,
        eventName,
        duration,
        locationType,
        locationUrl,
        themeColor,
        businessId: doc(db, "Business", user?.email),
        createdBy: user?.email,
      });

      const origin = window.location.origin;
      const link = `${origin}/${user?.email}/${id}`;
      setGeneratedLink(link);

      toast.success("New Meeting Event Created!");
      router.replace("/dashboard/meeting-type");
    } catch (error) {
      console.error("Error creating meeting event:", error?.message || error);
      toast.error("Failed to create meeting. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [db, duration, eventName, locationType, locationUrl, themeColor, user, router]);

  const onCopyLink = useCallback(() => {
    if (!generatedLink) {
      toast.error("No link generated yet.");
      return;
    }

    navigator.clipboard
      .writeText(generatedLink)
      .then(() => toast.success("Link copied to clipboard!"))
      .catch(() => toast.error("Failed to copy link."));
  }, [generatedLink]);

  return (
    <div className="p-8 max-w-2xl mx-auto bg-white rounded-lg shadow-lg">
      <Link href={"/dashboard"} className="flex gap-2 text-primary hover:text-primary-dark mb-6">
        <ChevronLeft size={20} />
        <span className="text-lg font-semibold">Cancel</span>
      </Link>

      <h2 className="text-3xl font-semibold text-center mb-6">Create New Event</h2>
      <hr className="mb-6" />

      <div className="space-y-6">
        {/* Event Name */}
        <div>
          <label className="block text-lg font-semibold mb-2">Event Name *</label>
          <Input
            placeholder="Name of your meeting event"
            value={eventName}
            onChange={(event) => setEventName(event.target.value)}
            className="px-4 py-3 rounded-lg border border-gray-300 w-full focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Duration */}
        <div>
          <label className="block text-lg font-semibold mb-2">Duration *</label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full py-3 text-lg">{duration} Min</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full">
              {[15, 30, 45, 60].map((dur) => (
                <DropdownMenuItem key={dur} onClick={() => setDuration(dur)} className="hover:bg-gray-100 px-4 py-2">
                  {dur} Min
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Location */}
        <div>
          <label className="block text-lg font-semibold mb-2">Location *</label>
          <div className="grid grid-cols-4 gap-4">
            {LocationOption.map((option) => (
              <div
                key={option.name}
                className={`border flex flex-col items-center p-4 rounded-lg cursor-pointer transition-all hover:bg-primary-light ${
                  locationType === option.name && "bg-primary-light border-primary"
                }`}
                onClick={() => setLocationType(option.name)}
              >
                <Image src={option.icon} width={30} height={30} alt={option.name} />
                <span className="mt-2">{option.name}</span>
              </div>
            ))}
          </div>
        </div>

        {locationType && (
          <div>
            <label className="block text-lg font-semibold mb-2">Add {locationType} URL *</label>
            <Input
              placeholder="Add URL"
              value={locationUrl}
              onChange={(event) => setLocationUrl(event.target.value)}
              className="px-4 py-3 rounded-lg border border-gray-300 w-full focus:ring-2 focus:ring-primary"
            />
          </div>
        )}

        {/* Theme Color */}
        <div>
          <label className="block text-lg font-semibold mb-2">Select Theme Color</label>
          <div className="flex justify-evenly">
            {ThemeOptions.map((color) => (
              <div
                key={color}
                className={`h-8 w-8 rounded-full cursor-pointer transition-all ${
                  themeColor === color ? "border-4 border-black" : ""
                }`}
                style={{ backgroundColor: color }}
                onClick={() => setThemeColor(color)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <Button
        className="w-full mt-8 py-3 text-lg font-semibold"
        disabled={!eventName || !duration || !locationType || !locationUrl || loading}
        onClick={onCreateClick}
      >
        {loading ? "Creating..." : "Create Event"}
      </Button>

      {/* Copy Link Button */}
      {generatedLink && (
        <Button
          variant="outline"
          className="w-full mt-4 py-3 text-lg"
          onClick={onCopyLink}
        >
          Copy Link
        </Button>
      )}
    </div>
  );
}

export default MeetingForm;

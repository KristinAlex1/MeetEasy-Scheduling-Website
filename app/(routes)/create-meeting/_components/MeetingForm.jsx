"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import React, { useEffect, useState, useCallback } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LocationOption from "@/app/_utils/LocationOption";
import Image from "next/image";
import Link from "next/link";
import ThemeOptions from "@/app/_utils/ThemeOptions";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { app } from "@/config/FirebaseConfig";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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

        try {
            setLoading(true);
            const id = Date.now().toString();

            // Save the meeting event to Firestore
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

            // Construct the URL dynamically
            const origin = window.location.origin;
            const link = `${origin}/${user?.email}/${id}`; // Excludes `/meeting`
            console.log("Generated Link:", link);
            setGeneratedLink(link);

            toast.success("New Meeting Event Created!");
            router.replace("/dashboard/meeting-type"); // Redirect after creation
        } catch (error) {
            console.error("Error creating meeting event:", error);
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
            .then(() => {
                console.log("Copied Link:", generatedLink);
                toast.success("Link copied to clipboard!");
            })
            .catch(() => {
                toast.error("Failed to copy link.");
            });
    }, [generatedLink]);

    return (
        <div className="p-5">
            <Link href={"/dashboard"}>
                <h2 className="flex gap-2">
                    <ChevronLeft /> Cancel
                </h2>
            </Link>
            <div className="mt-4">
                <h2 className="font-bold text-2xl my-4">Create New Event</h2>
                <hr />
            </div>
            <div className="flex flex-col gap-3 my-4">
                <h2 className="font-bold">Event Name *</h2>
                <Input
                    placeholder="Name of your meeting event"
                    value={eventName}
                    onChange={(event) => setEventName(event.target.value)}
                />

                <h2 className="font-bold">Duration *</h2>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="max-w-40">
                            {duration} Min
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {[15, 30, 45, 60].map((dur) => (
                            <DropdownMenuItem key={dur} onClick={() => setDuration(dur)}>
                                {dur} Min
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>

                <h2 className="font-bold">Location *</h2>
                <div className="grid grid-cols-4 gap-3">
                    {LocationOption?.map((option) => (
                        <div
                            key={option.name}
                            className={`border flex flex-col justify-center items-center p-3 rounded-lg cursor-pointer hover:bg-blue-100 hover:border-primary ${
                                locationType === option.name && "bg-blue-100 border-primary"
                            }`}
                            onClick={() => setLocationType(option.name)}
                        >
                            <Image
                                src={option.icon}
                                width={30}
                                height={30}
                                alt={option.name}
                            />
                            <h2>{option.name}</h2>
                        </div>
                    ))}
                </div>
                {locationType && (
                    <>
                        <h2 className="font-bold">Add {locationType} Url *</h2>
                        <Input
                            placeholder="Add Url"
                            value={locationUrl}
                            onChange={(event) => setLocationUrl(event.target.value)}
                        />
                    </>
                )}
                <h2 className="font-bold">Select Theme Color</h2>
                <div className="flex justify-evenly">
                    {ThemeOptions?.map((color) => (
                        <div
                            key={color}
                            className={`h-7 w-7 rounded-full ${
                                themeColor === color && "border-4 border-black"
                            }`}
                            style={{ backgroundColor: color }}
                            onClick={() => setThemeColor(color)}
                        ></div>
                    ))}
                </div>
            </div>

            <Button
                className="w-full mt-9"
                disabled={!eventName || !duration || !locationType || !locationUrl || loading}
                onClick={onCreateClick}
            >
                {loading ? "Creating..." : "Create"}
            </Button>

            {generatedLink && (
                <Button variant="outline" className="w-full mt-3" onClick={onCopyLink}>
                    Copy Link
                </Button>
            )}
        </div>
    );
}

export default MeetingForm;

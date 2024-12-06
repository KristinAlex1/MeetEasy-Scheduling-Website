"use client";
import { Button } from "@/components/ui/button";
import { app } from "@/config/FirebaseConfig";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  orderBy,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { Clock, MapPin, Pen, Settings, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function EventList() {
  const db = getFirestore(app);
  const { user } = useKindeBrowserClient();
  const [userBusinessInfo, setUserBusinessInfo] = useState(null);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchEvents();
      retrieveBusinessInfo();
    }
  }, [user]);

  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      const eventsQuery = query(
        collection(db, "Events"),
        where("createdBy", "==", user?.email),
        orderBy("id", "desc")
      );

      const eventSnapshot = await getDocs(eventsQuery);
      const eventData = eventSnapshot.docs.map((doc) => doc.data());
      setEvents(eventData);
    } catch (error) {
      console.error("Error fetching events:", error);
      toast.error("Failed to load events.");
    } finally {
      setIsLoading(false);
    }
  };

  const retrieveBusinessInfo = async () => {
    try {
      const businessDocRef = doc(db, "Business", user.email);
      const businessDocSnap = await getDoc(businessDocRef);

      if (businessDocSnap.exists()) {
        setUserBusinessInfo(businessDocSnap.data());
      } else {
        console.warn("No business info available.");
      }
    } catch (error) {
      console.error("Error fetching business info:", error);
    }
  };

  const handleDeleteEvent = async (event) => {
    try {
      await deleteDoc(doc(db, "Events", event?.id));
      toast.success("Event successfully deleted!");
      fetchEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
      toast.error("Failed to delete event.");
    }
  };

  const handleCopyLink = (event) => {
    if (!userBusinessInfo?.businessName || !event?.id) {
      toast.error("Missing business or event details.");
      return;
    }

    const eventUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${userBusinessInfo.businessName}/${event.id}`;
    window.open(eventUrl, "_blank");

    navigator.clipboard
      .writeText(eventUrl)
      .then(() => toast.success("Event link copied to clipboard!"))
      .catch((error) => {
        console.error("Failed to copy event link:", error);
        toast.error("Unable to copy the link.");
      });
  };

  return (
    <div className="mt-10">
      <h1 className="text-center text-3xl font-bold mb-8 text-blue-600">
        My Scheduled Events
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {isLoading ? (
          <h2 className="text-center text-lg text-gray-600">Loading events...</h2>
        ) : events.length > 0 ? (
          events.map((event) => (
            <div
              key={event.id}
              className="border shadow-lg border-t-8 rounded-lg p-6 bg-white hover:shadow-2xl transition-all duration-300"
              style={{ borderTopColor: event?.themeColor || "#000" }}
            >
              <div className="flex justify-between items-center">
                <h2 className="font-semibold text-xl text-center flex-grow">
                  {event?.eventName}
                </h2>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Settings className="cursor-pointer hover:text-gray-700 transition duration-200" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem className="flex gap-2">
                      <Pen /> Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="flex gap-2"
                      onClick={() => handleDeleteEvent(event)}
                    >
                      <Trash /> Remove
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex justify-between text-gray-600 mt-4">
                <span className="flex gap-2 items-center">
                  <Clock /> {event.duration} Minutes
                </span>
                <span className="flex gap-2 items-center">
                  <MapPin /> {event.locationType}
                </span>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between items-center mt-4">
                <Button
                  onClick={() => handleCopyLink(event)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
                >
                  Set Meeting Time
                </Button>
                <Button
                  variant="outline"
                  className="rounded-lg border-primary text-primary px-4 py-2 hover:bg-gray-100"
                >
                  Share Event
                </Button>
              </div>
            </div>
          ))
        ) : (
          <h2 className="text-center text-lg text-gray-600">No events found.</h2>
        )}
      </div>
    </div>
  );
}

export default EventList;

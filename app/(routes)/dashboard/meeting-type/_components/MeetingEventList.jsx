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

function MeetingEventList() {
  const db = getFirestore(app);
  const { user } = useKindeBrowserClient();
  const [businessInfo, setBusinessInfo] = useState(null);
  const [eventList, setEventList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      getEventList();
      fetchBusinessInfo();
    }
  }, [user]);

  const getEventList = async () => {
    try {
      setLoading(true);
      const q = query(
        collection(db, "MeetingEvent"),
        where("createdBy", "==", user?.email),
        orderBy("id", "desc")
      );

      const querySnapshot = await getDocs(q);
      const events = querySnapshot.docs.map((doc) => doc.data());
      setEventList(events);
    } catch (error) {
      console.error("Error fetching events:", error);
      toast.error("Failed to fetch events.");
    } finally {
      setLoading(false);
    }
  };

  const fetchBusinessInfo = async () => {
    try {
      const docRef = doc(db, "Business", user.email);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setBusinessInfo(docSnap.data());
      } else {
        console.warn("No business info found.");
      }
    } catch (error) {
      console.error("Error fetching business info:", error);
    }
  };

  const onDeleteMeetingEvent = async (event) => {
    try {
      await deleteDoc(doc(db, "MeetingEvent", event?.id));
      toast.success("Meeting Event Deleted!");
      getEventList();
    } catch (error) {
      console.error("Error deleting event:", error);
      toast.error("Failed to delete event.");
    }
  };

  const onCopyClickHandler = (event) => {
    if (!businessInfo?.businessName || !event?.id) {
      toast.error("Missing business or event information.");
      return;
    }

    const meetingEventUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${businessInfo.businessName}/${event.id}`;
    window.open(meetingEventUrl, "_blank");

    navigator.clipboard
      .writeText(meetingEventUrl)
      .then(() => toast.success("Link copied to clipboard!"))
      .catch((error) => {
        console.error("Failed to copy link:", error);
        toast.error("Failed to copy link.");
      });
  };

  return (
    <div className="mt-10">
      <h1 className="text-center text-3xl font-bold mb-8 text-gray-800">
        Meeting List
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {loading ? (
          <h2 className="text-center text-lg text-gray-600">Loading...</h2>
        ) : eventList.length > 0 ? (
          eventList.map((event) => (
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
                      onClick={() => onDeleteMeetingEvent(event)}
                    >
                      <Trash /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex justify-between text-gray-600 mt-4">
                <span className="flex gap-2 items-center">
                  <Clock /> {event.duration} Min
                </span>
                <span className="flex gap-2 items-center">
                  <MapPin /> {event.locationType}
                </span>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between items-center mt-4">
                <Button
                  onClick={() => onCopyClickHandler(event)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
                >
                  Schedule Time
                </Button>
                <Button
                  variant="outline"
                  className="rounded-lg border-primary text-primary px-4 py-2 hover:bg-gray-100"
                >
                  Share
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

export default MeetingEventList;

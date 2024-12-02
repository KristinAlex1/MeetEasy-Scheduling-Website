"use client";

import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ScheduledMeetingList from "./_components/ScheduledMeetingList";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { app } from "@/config/FirebaseConfig";
import { format } from "date-fns";

function ScheduledMeeting() {
  const db = getFirestore(app);
  const { user } = useKindeBrowserClient();
  const [meetingList, setMeetingList] = useState([]);

  useEffect(() => {
    if (user) {
      getScheduledMeetings();
    }
  }, [user]);

  /**
   * Fetches scheduled meetings from Firestore for the logged-in user.
   */
  const getScheduledMeetings = async () => {
    try {
      setMeetingList([]);
      const q = query(
        collection(db, "ScheduledMeetings"),
        where("businessEmail", "==", user.email)
      );
      const querySnapshot = await getDocs(q);

      const meetings = [];
      querySnapshot.forEach((doc) => {
        console.log("Fetched Meeting:", doc.data());
        meetings.push(doc.data());
      });

      setMeetingList(meetings);
    } catch (error) {
      console.error("Error fetching meetings:", error);
    }
  };

  /**
   * Filters the meeting list based on type (upcoming or expired).
   * @param {string} type - Type of meeting filter ('upcoming' or 'expired').
   * @returns {Array} - Filtered list of meetings.
   */
  const filterMeetingList = (type) => {
    const currentTime = format(new Date(), "t"); // Current time in formatted timestamp
    return meetingList.filter((item) =>
      type === "upcoming"
        ? item.formatedTimeStamp >= currentTime
        : item.formatedTimeStamp < currentTime
    );
  };

  return (
    <div className="p-10 bg-white shadow-md rounded-lg">
      <h2 className="font-bold text-3xl text-blue-600 mb-5">Scheduled Meetings</h2>
      <hr className="my-5 border-gray-300" />
      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="flex justify-center gap-4">
          <TabsTrigger
            value="upcoming"
            className="font-semibold text-blue-600 hover:bg-blue-50 hover:text-blue-800"
          >
            Upcoming
          </TabsTrigger>
          <TabsTrigger
            value="expired"
            className="font-semibold text-red-600 hover:bg-red-50 hover:text-red-800"
          >
            Expired
          </TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className="mt-5">
          <ScheduledMeetingList meetingList={filterMeetingList("upcoming")} />
        </TabsContent>
        <TabsContent value="expired" className="mt-5">
          <ScheduledMeetingList meetingList={filterMeetingList("expired")} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default ScheduledMeeting;

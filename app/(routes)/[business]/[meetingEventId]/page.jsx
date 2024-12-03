"use client";
import React, { useEffect, useState } from "react";
import MeetingTimeDateSelection from "../_components/MeetingTimeDateSelection";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { app } from "@/config/FirebaseConfig";

function SharedMeetingEvent({ params: paramsPromise }) {
  const db = getFirestore(app);
  const [params, setParams] = useState(null); // Store resolved params
  const [businessInfo, setBusinessInfo] = useState(null);
  const [eventInfo, setEventInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const resolvedParams = await paramsPromise; // Resolve params
      setParams(resolvedParams);
    })();
  }, [paramsPromise]);

  useEffect(() => {
    if (params) {
      getMeetingBusinessAndEventDetails();
    }
  }, [params]);

  /**
   * Fetches business information and event details for the specified business owner and event.
   */
  const getMeetingBusinessAndEventDetails = async () => {
    setLoading(true);
    try {
      // Query to get business info based on the business name
      const q = query(
        collection(db, "Business"),
        where("businessName", "==", params.business)
      );
      const docSnap = await getDocs(q);

      docSnap.forEach((doc) => {
        setBusinessInfo(doc.data());
      });

      // Fetch event details based on the meeting event ID
      const docRef = doc(db, "MeetingEvent", params?.meetingEventId);
      const result = await getDoc(docRef);
      setEventInfo(result.data());
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 rounded-md shadow-md">
      {loading ? (
        <div className="flex justify-center items-center">
          <span className="text-xl text-blue-600">Loading...</span>
        </div>
      ) : (
        <MeetingTimeDateSelection
          eventInfo={eventInfo}
          businessInfo={businessInfo}
        />
      )}
    </div>
  );
}

export default SharedMeetingEvent;

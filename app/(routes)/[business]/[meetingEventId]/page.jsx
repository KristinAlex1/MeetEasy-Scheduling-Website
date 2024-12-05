"use client";
import React, { useEffect, useState } from "react";
import MeetingTimeDateSelection from "../_components/MeetingTimeDateSelection";
import { collection, doc, getDoc, getDocs, getFirestore, query, where } from "firebase/firestore";
import { app } from "@/config/FirebaseConfig";

function SharedMeetingEvent({ params: eventParamsPromise }) {
  const firestore = getFirestore(app); // Renamed db to firestore for clarity
  const [eventParams, setEventParams] = useState(null); // Renamed params to eventParams
  const [businessDetails, setBusinessDetails] = useState(null); // Renamed businessInfo
  const [meetingDetails, setMeetingDetails] = useState(null); // Renamed eventInfo
  const [isLoading, setIsLoading] = useState(true); // Renamed loading to isLoading

  useEffect(() => {
    (async () => {
      const resolvedParams = await eventParamsPromise; // Resolving eventParams
      setEventParams(resolvedParams); // Storing resolved eventParams
    })();
  }, [eventParamsPromise]);

  useEffect(() => {
    if (eventParams) {
      fetchBusinessAndEventDetails(); // Fetch details only when eventParams are available
    }
  }, [eventParams]);

  /**
   * Fetches business and event details from Firestore based on the provided parameters.
   */
  const fetchBusinessAndEventDetails = async () => {
    setIsLoading(true);
    try {
      // Query Firestore for business details based on business name
      const businessQuery = query(
        collection(firestore, "Business"),
        where("businessName", "==", eventParams.business)
      );
      const businessSnapshot = await getDocs(businessQuery);

      businessSnapshot.forEach((doc) => {
        setBusinessDetails(doc.data()); // Set business details after fetching
      });

      // Fetch event details based on event ID
      const eventRef = doc(firestore, "MeetingEvent", eventParams?.meetingEventId);
      const eventSnapshot = await getDoc(eventRef);
      setMeetingDetails(eventSnapshot.data()); // Set event details after fetching
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setIsLoading(false); // Set loading state to false after fetching
    }
  };

  return (
    <div className="container p-6 bg-light rounded-lg shadow-lg">
      {isLoading ? (
        <div className="centered">
          <span className="loading-text">Loading, please wait...</span>
        </div>
      ) : (
        <MeetingTimeDateSelection eventInfo={meetingDetails} businessInfo={businessDetails} />
      )}
    </div>
  );
}

export default SharedMeetingEvent;

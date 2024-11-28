"use client";
import React, { useEffect, useState } from 'react';
import MeetingTimeDateSelection from '../_components/MeetingTimeDateSelection';
import { collection, doc, getDoc, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { app } from '@/config/FirebaseConfig';

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
     * Used to get Business Info and Event Details for Given Login User/Business Owner
     */
    const getMeetingBusinessAndEventDetails = async () => {
        setLoading(true);
        try {
            const q = query(collection(db, 'Business'), where('businessName', '==', params.business));
            const docSnap = await getDocs(q);

            docSnap.forEach((doc) => {
                setBusinessInfo(doc.data());
            });

            const docRef = doc(db, 'MeetingEvent', params?.meetingEventId);
            const result = await getDoc(docRef);
            setEventInfo(result.data());
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <MeetingTimeDateSelection 
                eventInfo={eventInfo}
                businessInfo={businessInfo}
            />
        </div>
    );
}

export default SharedMeetingEvent;

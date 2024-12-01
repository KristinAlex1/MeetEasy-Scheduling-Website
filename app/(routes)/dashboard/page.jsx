"use client";

import React, { useEffect, useState } from "react";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { app } from "@/config/FirebaseConfig";
import {
  useKindeBrowserClient,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs";
import { useRouter } from "next/navigation";
import MeetingEventList from "./meeting-type/_components/MeetingEventList";
import { Button } from "@/components/ui/button";

function Dashboard() {
  const db = getFirestore(app);
  const { user } = useKindeBrowserClient();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      console.log("useEffect triggered with user:", user);
      isBusinessRegistered();
    }
  }, [user]);

  const isBusinessRegistered = async () => {
    try {
      if (!user?.email) {
        console.error("User email is unavailable.");
        return;
      }

      const docRef = doc(db, "BUSINESS", user.email);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Business exists:", docSnap.data());
      } else {
        console.log(
          "No such document. Redirecting to business registration..."
        );
        router.replace("/dashboard");
      }
    } catch (error) {
      console.error("Error checking business registration:", error);
    } finally {
      setLoading(false); // Stop loading in all cases
    }
  };

  if (!user) {
    return (
      <h2>User is not logged in. Please log in to access the dashboard.</h2>
    );
  }

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <div className="flex justify-between px-5 ">
        <h1 className="border-primary text-primary font-extrabold text-6xl">
          Dashboard
        </h1>
        <LogoutLink>
          <Button variant="destructive">Log out</Button>
        </LogoutLink>
      </div>

      <hr className="my-7 mx-10" style={{ height: '10px' }}/>
      <div className="px-10">
        <MeetingEventList />

      </div>
      
    </div>
  );
}

export default Dashboard;

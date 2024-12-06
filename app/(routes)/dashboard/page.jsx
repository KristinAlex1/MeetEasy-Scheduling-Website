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
      console.log("User found:", user);
      checkIfBusinessExists();
    }
  }, [user]);

  const checkIfBusinessExists = async () => {
    try {
      if (!user?.email) {
        console.error("User email is unavailable.");
        return;
      }

      const businessDoc = doc(db, "BUSINESS", user.email);
      const businessSnapshot = await getDoc(businessDoc);

      if (businessSnapshot.exists()) {
        console.log("Business is already registered:", businessSnapshot.data());
      } else {
        console.log("Business not registered, redirecting to registration...");
        router.replace("/dashboard");
      }
    } catch (error) {
      console.error("Error while checking business registration:", error);
    } finally {
      setLoading(false);
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
      <div className="flex justify-between items-center px-5">
        <h1 className="border-primary text-primary text-center font-extrabold text-6xl flex-1">
          Dashboard
        </h1>
        <LogoutLink>
          <Button variant="destructive">Log out</Button>
        </LogoutLink>
      </div>

      <hr className="my-7 mx-10" style={{ height: '10px' }} />
      <div className="px-10">
        <MeetingEventList />
      </div>
    </div>
  );
}

export default Dashboard;

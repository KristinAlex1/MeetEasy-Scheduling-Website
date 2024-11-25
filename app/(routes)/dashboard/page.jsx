"use client";

import React, { useEffect, useState } from "react";

import { doc, getDoc, getFirestore } from "firebase/firestore";
import { app } from "@/config/FirebaseConfig";
import {
  useKindeBrowserClient,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs";
import { useRouter } from "next/navigation";
import MeetingType from "./meeting-type/page";

function Dashboard() {
  const db = getFirestore(app);
  const { user } = useKindeBrowserClient();
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    user && isBusinessRegistered();
  }, [user]);

  const isBusinessRegistered = async () => {
    if (!user || !user.email) {
      console.log("User email not available");
      return;
    }

    const docRef = doc(db, "BUSINESS", user.email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setLoading(false);
    } else {
      console.log("No such document!");
      setLoading(false);
      router.replace("/dashboard");
    }
  };

  return (
    <div>
      <MeetingType />
    </div>
  );
}

export default Dashboard;

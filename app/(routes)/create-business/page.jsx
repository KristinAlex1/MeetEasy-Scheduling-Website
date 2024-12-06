"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { app } from "@/config/FirebaseConfig";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";

function CreateBusiness() {
  const [businessName, setBusinessName] = useState("");
  const [loading, setLoading] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const db = getFirestore(app);
  const { user } = useKindeBrowserClient();
  const router = useRouter();

  // Check if user is logged in on component mount
  useEffect(() => {
    if (user?.email) {
      setIsUserLoggedIn(true);
    }
  }, [user]);

  // Function to sanitize and create the business URL
  const generateBusinessUrl = (name) => {
    if (typeof window === "undefined") {
      throw new Error("URL generation cannot happen on the server.");
    }
    const sanitized = name.replace(/[^a-zA-Z0-9-_]/g, "_");
    return `${window.location.origin}/dashboard/${sanitized}`;
  };

  // Function to add the business info to Firestore
  const addBusinessToFirestore = async (name) => {
    if (!isUserLoggedIn) {
      toast.error("You must be logged in to create a business.");
      return;
    }

    try {
      await setDoc(doc(db, "Business", user.email), {
        businessName: name.replace(/\s+/g, "_"),
        email: user.email,
        userName: `${user.given_name} ${user.family_name}`,
      });
      toast.success("Your business was created successfully!");
      const url = generateBusinessUrl(name);
      router.replace(url);
    } catch (error) {
      toast.error("Something went wrong, please try again.");
      console.error("Error creating business:", error);
    }
  };

  // Handler for button click
  const onCreateBusinessClick = () => {
    if (!businessName.trim()) {
      toast.error("Please enter a valid business name.");
      return;
    }

    if (businessName.length < 3) {
      toast.error("Business name must be at least 3 characters.");
      return;
    }

    setLoading(true);
    addBusinessToFirestore(businessName).finally(() => setLoading(false));
  };

  return (
    <div className="p-14 flex flex-col items-center gap-20 my-10">
      <Image src="/logo3.png" width={200} height={200} alt="Business Logo" />
      <div className="flex flex-col items-center gap-4 max-w-3xl">
        <h2 className="text-4xl font-bold">What should we call your business?</h2>
        <p className="text-slate-500">You can change this later in settings.</p>
        <div className="w-full">
          <label className="text-slate-400">Business Name</label>
          <Input
            placeholder="Ex. TubeGuruji"
            className="mt-2"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value.trimStart())}
          />
        </div>
        <Button
          className="w-full"
          disabled={!businessName.trim() || loading}
          onClick={onCreateBusinessClick}
        >
          {loading ? "Creating..." : "Create Business"}
        </Button>
      </div>
    </div>
  );
}

export default CreateBusiness;

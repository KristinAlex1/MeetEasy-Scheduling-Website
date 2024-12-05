"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { app } from "@/config/FirebaseConfig";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

function CreateBusiness() {
  const [businessName, setBusinessName] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const db = getFirestore(app);
  const { user } = useKindeBrowserClient();
  const router = useRouter();

  // Utility function for generating business URL
  const createBusinessUrl = (businessName) => {
    if (typeof window === "undefined") {
      throw new Error("Cannot generate URL on the server side.");
    }
    const sanitizedBusinessName = businessName.replace(/[^a-zA-Z0-9-_]/g, "_");
    const currentOrigin = window.location.origin;
    return `${currentOrigin}/dashboard/${sanitizedBusinessName}`;
  };

  // Function to create a new business in Firestore
  const saveBusinessToFirestore = async (businessName) => {
    try {
      await setDoc(doc(db, "Business", user.email), {
        businessName: businessName.replace(/\s+/g, "_"),
        email: user.email,
        userName: `${user.given_name} ${user.family_name}`,
      });
      toast.success("Business Created Successfully!");
      const generatedUrl = createBusinessUrl(businessName);
      router.replace(generatedUrl);
    } catch (error) {
      toast.error("Failed to create business. Please try again.");
      console.error("Error creating business:", error);
    }
  };

  // Button click handler
  const handleCreateBusinessClick = () => {
    if (!user || !businessName.trim()) {
      toast.error("Business name is required.");
      return;
    }

    setIsProcessing(true);
    saveBusinessToFirestore(businessName)
      .finally(() => setIsProcessing(false));
  };

  return (
    <div className="p-14 items-center flex flex-col gap-20 my-10">
      <Image src="/logo3.png" width={200} height={200} alt="Business Logo" />
      <div className="flex flex-col items-center gap-4 max-w-3xl">
        <h2 className="text-4xl font-bold">What should we call your business?</h2>
        <p className="text-slate-500">You can always change this later from settings</p>
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
          disabled={!businessName.trim() || isProcessing}
          onClick={handleCreateBusinessClick}
        >
          {isProcessing ? "Creating..." : "Create Business"}
        </Button>
      </div>
    </div>
  );
}

export default CreateBusiness;

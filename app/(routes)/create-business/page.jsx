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
  const [loading, setLoading] = useState(false);
  const db = getFirestore(app);
  const { user } = useKindeBrowserClient();
  const router = useRouter();

  const generateBusinessUrl = (businessName, base = "") => {
    if (typeof window === "undefined") {
      throw new Error("Cannot generate URL on the server side.");
    }

    const origin = window.location.origin;
    const sanitizedName = businessName.replace(/[^a-zA-Z0-9-_]/g, "_");
    return `${origin}/${base}/${sanitizedName}`;
  };

  const onCreateBusiness = async () => {
    if (typeof window === "undefined") {
      toast.error("This action is only available on the client.");
      return;
    }

    if (!user || !businessName.trim()) {
      toast.error("Please provide all required information.");
      return;
    }

    try {
      setLoading(true);

      const formattedBusinessName = businessName.replace(/\s+/g, "_");
      await setDoc(doc(db, "Business", user.email), {
        businessName: formattedBusinessName,
        email: user.email,
        userName: `${user.given_name} ${user.family_name}`,
      });

      toast.success("New Business Created!");
      const url = generateBusinessUrl(formattedBusinessName, "dashboard");
      console.log("Generated URL:", url);
      router.replace(url);
    } catch (error) {
      console.error("Error creating business:", error);
      toast.error("Failed to create business. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-14 items-center flex flex-col gap-20 my-10">
      <Image src="/logo3.png" width={200} height={200} alt="Business Logo" />
      <div className="flex flex-col items-center gap-4 max-w-3xl">
        <h2 className="text-4xl font-bold">What should we call you?</h2>
        <p className="text-slate-500">
          You can always change this later from settings
        </p>
        <div className="w-full">
          <label className="text-slate-400">Team Name</label>
          <Input
            placeholder="Ex. TubeGuruji"
            className="mt-2"
            value={businessName}
            onChange={(event) =>
              setBusinessName(event.target.value.trimStart())
            }
          />
        </div>
        <Button
          className="w-full"
          disabled={!businessName.trim() || loading}
          onClick={onCreateBusiness}
        >
          {loading ? "Creating..." : "Create Business"}
        </Button>
      </div>
    </div>
  );
}

export default CreateBusiness;

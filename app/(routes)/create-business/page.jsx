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
    const [businessName, setBusinessName] = useState(""); // Controlled input
    const [loading, setLoading] = useState(false); // Loading state for button
    const db = getFirestore(app);
    const { user } = useKindeBrowserClient();
    const router = useRouter();

    /**
     * Helper to construct URLs without "/meeting"
     */
    const generateBusinessUrl = (businessName, base = "") => {
        const origin = window.location.origin;
        return `${origin}/${base}/${businessName}`.replace(/\/\//g, "/"); // Remove duplicate slashes
    };

    /**
     * Handles the creation of a new business and saves it to Firebase Firestore.
     */
    const onCreateBusiness = async () => {
        if (!user || !businessName.trim()) {
            toast.error("Please provide all required information.");
            return;
        }

        try {
            setLoading(true);
            console.log(`Creating business for user: ${user.email}, Name: ${businessName}`);

            // Save business details in Firestore
            const formattedBusinessName = businessName.replace(/\s+/g, "_"); // Replace spaces with underscores

            await setDoc(doc(db, "Business", user.email), {
                businessName: formattedBusinessName,
                email: user.email,
                userName: `${user.given_name} ${user.family_name}`,
            });

            console.log("Business successfully created.");
            toast.success("New Business Created!");

            // Navigate to the business dashboard
            const url = generateBusinessUrl(formattedBusinessName, "dashboard");
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
            <Image src="/logo.svg" width={200} height={200} alt="Business Logo" />
            <div className="flex flex-col items-center gap-4 max-w-3xl">
                <h2 className="text-4xl font-bold">What should we call you?</h2>
                <p className="text-slate-500">You can always change this later from settings</p>
                <div className="w-full">
                    <label className="text-slate-400">Team Name</label>
                    <Input
                        placeholder="Ex. TubeGuruji"
                        className="mt-2"
                        value={businessName} // Controlled input
                        onChange={(event) => setBusinessName(event.target.value.trimStart())}
                    />
                </div>
                <Button
                    className="w-full"
                    disabled={!businessName.trim() || loading} // Disable button during loading or empty input
                    onClick={onCreateBusiness}
                >
                    {loading ? "Creating..." : "Create Business"}
                </Button>
            </div>
        </div>
    );
}

export default CreateBusiness;

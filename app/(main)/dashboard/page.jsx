"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AppLayout from "../meetings/layout";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usernameSchema } from "@/app/lib/validators";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";

const Dashboard = () => {
  const { isLoaded, user } = useUser();
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(null);

  const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm({
    resolver: zodResolver(usernameSchema),
    defaultValues: {
      username: "", // Initial value
    },
  });

  // Generate a username based on user details
  const generateUsername = (firstName, lastName) => {
    const randomNumber = Math.floor(Math.random() * 10000); // Generate a random number
    return `${lastName || "user"}${firstName || "guest"}${randomNumber}`.toLowerCase();
  };

  // Fetch username on user load and synchronize with backend
  useEffect(() => {
    if (isLoaded && user) {
      const username = generateUsername(user?.firstName, user?.lastName);

      setLoading(true);
      fetch("/api/updateUsername", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.sessionId}`, // Include the session token
        },
        body: JSON.stringify({ username }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
          }
          return response.json();
        })
        .then(() => {
          setValue("username", username); // Update input field with backend-synced value
          setServerError(null); // Clear any server error messages
        })
        .catch((error) => {
          console.error("Error saving username:", error.message);
          setServerError("Failed to save username. Please try again.");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [isLoaded, user, setValue]);

  // Handle form submission to update username
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const currentUsername = getValues("username");
      if (data.username === currentUsername) {
        console.log("Username is unchanged.");
        setLoading(false);
        return;
      }
      const response = await fetch("/api/updateUsername", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.sessionId}`, // Include the session token
        },
        body: JSON.stringify({ username: data.username }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      console.log("Username updated successfully:", result);
      setServerError(null); // Clear any server error messages
    } catch (error) {
      console.error("Error updating username:", error.message);
      setServerError("Failed to update username. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isLoaded) {
    return <div>Loading user data...</div>;
  }

  return (
    <div className="space-y-8">
      <AppLayout>
        {/* Welcome Card */}
        <Card>
          <CardHeader>
            <CardTitle>Welcome, {user?.firstName || "User"}</CardTitle>
          </CardHeader>
        </Card>

        {/* Unique Link Card */}
        <Card>
          <CardHeader>
            <CardTitle>Your Unique Link</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <div className="flex items-center gap-2">
                  <span>{window?.location.origin}/</span>
                  {/* Username Input */}
                  <Input
                    {...register("username")}
                    type="text"
                    placeholder="Username"
                    className="border rounded-md px-2 py-1"
                  />
                </div>
                {errors.username && (
                  <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
                )}
                {serverError && (
                  <p className="text-red-500 text-sm mt-1">{serverError}</p>
                )}
              </div>
              {loading && (
                <BarLoader className="mb-4" width="100%" color="#36d7b7" />
              )}
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Update Username"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </AppLayout>
    </div>
  );
};

export default Dashboard;

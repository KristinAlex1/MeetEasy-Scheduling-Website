"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AppLayout from "../meetings/layout";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usernameSchema } from "@/app/lib/validators";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";

const Dashboard = () => {
  const { isLoaded, user } = useUser();

  // Initialize form with resolver and default values
  const { register, handleSubmit, setValue } = useForm({
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

  // Set the username once the user data is loaded
  useEffect(() => {
    console.log("isLoaded:", isLoaded);
    console.log("User Object:", user);

    if (isLoaded) {
      const username = generateUsername(user?.firstName, user?.lastName);
      setValue("username", username);
      console.log("Generated username set to:", username);
    }
  }, [isLoaded, user, setValue]);

  // Handle form submission
  const onSubmit = async (data) => {
    console.log("Form Submitted with Data:", data);
  };

  // Show loading state while user data is being fetched
  if (!isLoaded) {
    return <div>Loading...</div>;
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
                  <span>{window?.location.origin}</span>
                  {/* Username Input */}
                  <Input
                    {...register("username")}
                    type="text"
                    placeholder="Username"
                    className="border rounded-md px-2 py-1"
                  />
                </div>
              </div>
              <Button type="submit">Update Username</Button>
            </form>
          </CardContent>
        </Card>
      </AppLayout>
    </div>
  );
};

export default Dashboard;

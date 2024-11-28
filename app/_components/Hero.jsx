import { Button } from "@/components/ui/button";
import { Calendar, Clock, LinkIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import React from "react";
import Link from "next/link";

function Hero() {
  const features = [
    {
      icon: Calendar,
      title: "Create Events",
      description: "Easily set up and customize your event types",
    },
    {
      icon: Clock,
      title: "Manage Availability",
      description: "Define your availability to streamline scheduling",
    },
    {
      icon: LinkIcon,
      title: "Custom Links",
      description: "Share your personalized scheduling link",
    },
  ];

  return (
    <main className="container mx-auto px-10 py-5">
      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row px-5 items-center justify-between gap-12 mb-10 shadow-bottom-md">
        <div className="lg:w-1/2 order-2 lg:order-1">
          <h1 className="text-7xl text-blue-600 font-extrabold px-5 pb-6 gradient-title">
            Scheduling Made Easy
          </h1>
          <p className="text-xl px-5 text-gray-600 mb-10">
            MeetEasy helps you manage your time effectively. Create events, set
            your availability, and let others book time with you seamlessly.
          </p>
          <div className="flex px-10 gap-8 mb-3">
            <Button>
              <Image
                alt="google"
                src="/search.png" // Ensure this image exists in the public folder
                width={25}
                height={25}
              />
              Sign up with Google
            </Button>
            <Button>
              <Image
                alt="facebook"
                src="/facebook.png" // Ensure this image exists in the public folder
                width={25}
                height={25}
              />
              Sign up with Facebook
            </Button>
          </div>
          <hr />
          <div className="flex justify-center mr-20 mt-3">
            <Link className="mr-5 text-primary" href="/signup"> {/* Ensure a valid path */}
              Sign up with Email
            </Link>
          </div>
        </div>
        <div className="lg:w-1/2 flex justify-center order-1 lg:order-2">
          <div className="relative w-full max-w-md aspect-square">
            <Image
              src="/poster.png" // Ensure this image exists in the public folder
              alt="Meeteasy Poster"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mb-24">
        <h2 className="text-6xl text-center text-blue-600 font-bold px-5 pb-10">
          Key Features
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon; // Assign the icon to a variable for proper rendering
            return (
              <Card key={index}>
                <CardHeader>
                  <Icon className="w-12 h-12 text-blue-500 mb-4 mx-auto" />
                  <CardTitle className="text-center text-blue-600">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-gray-600">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </main>
  );
}

export default Hero;

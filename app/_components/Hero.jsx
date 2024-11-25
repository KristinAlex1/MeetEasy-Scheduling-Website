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
              {" "}
              <Image
                alt="google"
                src="/search.png"
                width={"25"}
                height={"25"}
              />
              Sign up with Google
            </Button>
            <Button>
              {" "}
              <Image
                alt="facebook"
                src="/facebook.png"
                width={"25"}
                height={"25"}
              />
              Sign up with Facebook
            </Button>
          </div>
          <hr></hr>
          <div className="flex justify-center mr-20 mt-3">
            <Link className="mr-5 text-primary" href="">
              Sign up with Email
            </Link>
          </div>
        </div>
        <div className="lg:w-1/2 flex justify-center order-1 lg:order-2">
          <div className="relative w-full max-w-md aspect-square">
            <Image
              src="/poster.png"
              alt="Meeteasy Poster"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center my-20">
        <div className="text-center  max-w-3xl relative mx-auto">
          <h2 className="font-bold text-[60px] mt-10 text-blue-600">
            Easy Scheduling Ahead
          </h2>
          <h2 className="text-xl mt-5 text-slate-500">
            MeetEasy is your scheduling automation platform for eliminating the
            back-and-forth emails to find the perfect time — and so much more.
          </h2>
          <div className="flex gap-4 flex-col mt-5">
            <div className="flex flex-col justify-center items-center my-20"></div>
            <div className="hidden lg:block">
              <Image
                alt="profile1"
                src="/profile1.png"
                width={100}
                height={100}
                className="h-[100px] object-cover rounded-full absolute top-[-50px] right-[-150px] shadow-2xl"
                style={{
                  objectFit: "cover",
                  boxShadow: "0 10px 20px rgba(0, 0, 0, 0.5)",
                }}
              />
              <Image
                alt="profile2"
                src="/profile2.png"
                width={100}
                height={100}
                className="h-[100px] object-cover rounded-full absolute top-[50px] left-[-150px] shadow-2xl"
                style={{
                  objectFit: "cover",
                  boxShadow: "0 10px 20px rgba(0, 0, 0, 0.5)",
                }}
              />
              <Image
                alt="profile3"
                src="/profile3.png"
                width={100}
                height={100}
                className="h-[100px] object-cover rounded-full absolute bottom-[-50px] left-[-150px] shadow-2xl"
                style={{
                  objectFit: "cover",
                  boxShadow: "0 10px 20px rgba(0, 0, 0, 0.5)",
                }}
              />
              <Image
                alt="profile4"
                src="/profile4.png"
                width={100}
                height={100}
                className="h-[100px] object-cover rounded-full absolute bottom-[-50px] right-[-150px] shadow-2xl"
                style={{
                  objectFit: "cover",
                  boxShadow: "0 10px 20px rgba(0, 0, 0, 0.5)",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-24">
        <h2 className="text-6xl text-center text-blue-600 font-bold px-5 pb-10 pt- -5 gradient-title">
          Key Features
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            return (
              <Card key={index}>
                <CardHeader>
                  <feature.icon className="w-12 h-12 text-blue-500 mb-4 mx-auto" />
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

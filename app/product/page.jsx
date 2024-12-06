"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs";

function ProductPage() {
  // Define features with descriptive content
  const features = [
    {
      id: 1,
      title: "Simplified Scheduling",
      description:
        "Set your availability and let MeetEasy handle the rest. Automated scheduling minimizes back-and-forth communication.",
      icon: "/icons/calendar-icon.png", // Ensure this exists in /public/icons/
    },
    {
      id: 2,
      title: "Integrated Calendar",
      description:
        "Sync with your Google account to ensure your meetings fit seamlessly into your schedule.",
      icon: "/icons/integration-icon.png", // Ensure this exists in /public/icons/
    },
    {
      id: 3,
      title: "Secure Authentication",
      description:
        "Built with robust security features to protect your data and ensure privacy.",
      icon: "/icons/security-icon.png", // Ensure this exists in /public/icons/
    },
    {
      id: 4,
      title: "Customizable Features",
      description:
        "Tailor your meeting experience with themes, custom invites, and personalized settings.",
      icon: "/icons/customization-icon.png", // Ensure this exists in /public/icons/
    },
  ];

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-blue-200 text-white py-16">
        <div className="container mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
              MeetEasy: Simplify Your Scheduling
            </h1>
            <p className="text-lg md:text-xl mb-6">
              Your one-stop platform for effortless meeting management. Save
              time, stay organized, and boost productivity with MeetEase.
            </p>
            <LoginLink>
                <Button className="px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-200 transition-all">
                Get Started
                </Button>
            </LoginLink>
          </div>
          <div className="md:w-1/2">
            <Image
              src="/logo3.png" // Ensure this exists in /public/
              alt="MeetEasy Hero"
              width={500}
              height={500}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-6 md:px-10">
          <h2 className="text-3xl font-bold text-center mb-10">
            Why Choose MeetEasy?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div
                key={feature.id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <Image
                  src="/calendar.png.png"
                  alt={`${feature.title} Icon`}
                  width={60}
                  height={60}
                  className="mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-6 md:px-10">
          <h2 className="text-3xl font-bold text-center mb-10">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-700 mb-4">
                "MeetEasy has revolutionized how I schedule meetings. It's
                incredibly easy to use and saves so much time!"
              </p>
              <h4 className="text-lg font-bold">- Sarah Johnson</h4>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-700 mb-4">
                "The calendar integration is a game changer. I love how
                everything syncs perfectly."
              </p>
              <h4 className="text-lg font-bold">- David Lee</h4>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-700 mb-4">
                "Highly customizable and secure. MeetEasy is the perfect tool
                for my business meetings."
              </p>
              <h4 className="text-lg font-bold">- Maria Gonzalez</h4>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Simplify Your Meetings?
          </h2>
          <LoginLink>
            <Button className="px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-200 transition-all">
                    Get Started Today
            </Button>

          </LoginLink>

        </div>
      </section>
    </main>
  );
}

export default ProductPage;

"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState } from "react";

function ProductPage() {
  const [features] = useState([
    {
      id: 1,
      title: "Simplified Scheduling",
      description:
        "Set your availability and let MeetEasy handle the rest. Automated scheduling minimizes back-and-forth communication.",
      icon: "/icons/calendar-icon.png",
    },
    {
      id: 2,
      title: "Integrated Calendar",
      description:
        "Sync with Google account to ensure your meetings fit seamlessly into your schedule.",
      icon: "/icons/integration-icon.png",
    },
    {
      id: 3,
      title: "Secure Authentication",
      description:
        "Built with robust security features to protect your data and ensure privacy.",
      icon: "/icons/security-icon.png",
    },
    {
      id: 4,
      title: "Customizable Features",
      description:
        "Tailor your meeting experience with themes, custom invites, and personalized settings.",
      icon: "/icons/customization-icon.png",
    },
  ]);

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center gap-10">
          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
              MeetEasy: Simplify Your Scheduling
            </h1>
            <p className="text-lg md:text-xl mb-6">
              Your one-stop platform for effortless meeting management. Save
              time, stay organized, and boost productivity with MeetEase.
            </p>
            <Button className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-200 transition-all">
              Get Started
            </Button>
          </div>
          <div className="md:w-1/2">
            <Image
              src="logo3.png"
              alt="MeetEasy Hero"
              width={500}
              height={500}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 md:px-10 py-16">
        <h2 className="text-3xl font-bold text-center mb-10">
          Why Choose MeetEase?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-all"
            >
              <Image
                src={feature.icon}
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
                "MeetEase has revolutionized how I schedule meetings. It's
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
                "Highly customizable and secure. MeetEase is the perfect tool
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
          <Button className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-200 transition-all">
            Get Started Today
          </Button>
        </div>
      </section>
    </main>
  );
}

export default ProductPage;

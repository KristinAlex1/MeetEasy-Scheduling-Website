'use client'; // Mark this file as client-side

import { useState } from "react";  // Now you can use useState
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import React from "react";

function Confirmation() {
  const [fullName, setFullName] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [email, setEmail] = useState("");

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!fullName || !review || rating === 0 || !email) {
      alert("Please fill out all fields");
      return;
    }

    try {
      // Here you would typically send the review data to a backend or Firestore
      // For now, we just log it
      console.log({ fullName, review, rating, email });

      // After submission, clear the form
      setFullName("");
      setReview("");
      setRating(0);
      setEmail("");

      alert("Review submitted successfully! We will send a confirmation email.");

      // You can call an API function to send an email here
      sendEmailToRecipient();
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  const sendEmailToRecipient = async () => {
    // Function to send email (e.g., using SendGrid, Nodemailer, etc.)
    const emailContent = `
      Hi, ${fullName} has scheduled a meeting and submitted a review. Below are the details:
      
      Meeting Time: [Insert Meeting Time Here]
      Review: ${review}
      Rating: ${rating} stars

      Thank you!`;

    // API call to send the email goes here (e.g., using Fetch API)
    console.log("Sending email with content:", emailContent);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-20">
      <CheckCircle className="h-9 w-9 text-green-500" />
      <h2 className="font-bold text-3xl">Your meeting scheduled successfully!</h2>
      <h2 className="text-lg text-gray-500">Confirmation sent on your email</h2>
      
      {/* Review Form */}
      <div className="mt-8 w-full max-w-md">
        <h3 className="text-xl font-semibold mb-4">Please submit your review:</h3>
        <form onSubmit={handleReviewSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Your Name"
            className="p-2 border rounded"
            required
          />
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Your Review"
            className="p-2 border rounded"
            required
          />
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => setRating(star)}
                className={`cursor-pointer text-xl ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
              >
                ★
              </span>
            ))}
          </div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Recipient's Email"
            className="p-2 border rounded"
            required
          />
          <button type="submit" className="p-2 bg-blue-600 text-white rounded">
            Submit Review and Send Email
          </button>
        </form>
      </div>
      
      <Link href={"/"}>
        <Button className="mt-4">Thank you</Button>
      </Link>
    </div>
  );
}

export default Confirmation;

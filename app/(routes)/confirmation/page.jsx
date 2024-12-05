'use client'; // Mark this file as client-side

import { useState } from 'react'; // Now you can use useState
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import ReactConfetti from 'react-confetti'; // For confetti effect

function Confirmation() {
  const [fullName, setFullName] = useState('');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle the form submission
  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!fullName || !review || rating === 0 || !email) {
      alert('Please fill out all fields');
      return;
    }

    try {
      console.log({ fullName, review, rating, email });

      // Clear the form after submission
      setFullName('');
      setReview('');
      setRating(0);
      setEmail('');

      // Show success and trigger confetti effect
      setIsSubmitted(true);
      alert('Review submitted successfully! We will send a confirmation email.');

      sendEmailToRecipient();
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const sendEmailToRecipient = async () => {
    const emailContent = `
      Hi, ${fullName} has scheduled a meeting and submitted a review. Below are the details:
      Meeting Time: [Insert Meeting Time Here]
      Review: ${review}
      Rating: ${rating} stars
      Thank you!`;

    console.log('Sending email with content:', emailContent);
  };

  return (
    <div className="relative p-20 flex flex-col items-center justify-center gap-6">
      {isSubmitted && <ReactConfetti width={window.innerWidth} height={window.innerHeight} />}
      <CheckCircle className="h-12 w-12 text-green-600 mb-4" />
      <h2 className="font-extrabold text-4xl text-center text-gray-800">Your meeting has been scheduled successfully!</h2>
      <h3 className="text-lg text-center text-gray-600">A confirmation has been sent to your email.</h3>

      {/* Review Form */}
      <div className="mt-8 max-w-md w-full">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">We'd love to hear your thoughts!</h3>
        <form onSubmit={handleReviewSubmit} className="space-y-4">
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Your Name"
            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Write your review"
            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <div className="flex gap-3 items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => setRating(star)}
                className={`cursor-pointer text-2xl ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
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
            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button type="submit" className="w-full p-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700">
            Submit Review and Send Confirmation Email
          </button>
        </form>
      </div>

      {/* Redirect Button */}
      <Link href="/">
        <Button className="mt-6 px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700">
          Thank You!
        </Button>
      </Link>
    </div>
  );
}

export default Confirmation;

import { useEffect, useState } from "react";  // Combine imports into one line
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs";

// ProductPage component
function ProductPage() {
  // State to store reviews and new review data
  const [reviews, setReviews] = useState([]);
  const [user, setUser] = useState("");  // State to store user name for submitting review
  const [content, setContent] = useState("");  // State to store review content
  const [error, setError] = useState("");  // Error handling state
  
  // Fetch existing reviews from the API
  const fetchReviews = async () => {
    try {
      const response = await fetch("/api/reviews");
      if (response.ok) {
        const data = await response.json();
        setReviews(data);  // Update state with the fetched reviews
      } else {
        setError("Failed to load reviews."); // Show error message if fetch fails
      }
    } catch (err) {
      console.error("Error fetching reviews:", err);
      setError("Error fetching reviews.");  // Display error in case of network issue
    }
  };

  // Submit a new review
  const submitReview = async (e) => {
    e.preventDefault();  // Prevent the default form submission
    if (!user || !content) {
      setError("Please enter both your name and review content.");
      return;
    }

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user, content }),
      });

      if (response.ok) {
        const newReview = await response.json();
        setReviews([newReview, ...reviews]);  // Add the new review to the front of the reviews list
        setUser("");  // Clear the input fields
        setContent("");
        setError("");  // Clear error if submission is successful
      } else {
        setError("Failed to add review.");  // Handle the case where submission fails
      }
    } catch (err) {
      console.error("Error submitting review:", err);
      setError("Error submitting review.");  // Error handling for submission
    }
  };

  // Fetch reviews when the component mounts
  useEffect(() => {
    fetchReviews();
  }, []);  // Empty dependency array ensures this runs only once on component mount

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
              Your one-stop platform for effortless meeting management. Save time, stay organized, and boost productivity with MeetEase.
            </p>
            <LoginLink>
              <Button className="px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-200 transition-all">
                Get Started
              </Button>
            </LoginLink>
          </div>
          <div className="md:w-1/2">
            <Image
              src="/logo3.png"
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
            {/* Render feature icons and descriptions here */}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-6 md:px-10">
          <h2 className="text-3xl font-bold text-center mb-10">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Render existing reviews */}
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <p className="text-gray-700 mb-4">{review.content}</p>
                  <h4 className="text-lg font-bold">- {review.user}</h4>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600">No reviews yet. Be the first to submit!</p>
            )}
          </div>
        </div>
      </section>

      {/* Submit Review Section */}
      <section className="py-16">
        <div className="container mx-auto px-6 md:px-10">
          <h2 className="text-3xl font-bold text-center mb-10">Submit Your Review</h2>
          {error && <p className="text-red-500 text-center">{error}</p>} {/* Error message */}
          <form onSubmit={submitReview} className="max-w-lg mx-auto">
            <input
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              placeholder="Your Name"
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
            />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Your Review"
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
              rows="4"
            />
            <Button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all">
              Submit Review
            </Button>
          </form>
        </div>
      </section>

      {/* Additional Sections */}
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

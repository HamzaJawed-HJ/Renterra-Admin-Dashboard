"use client";

import React, { useEffect, useState } from "react";
import ReviewTable, { ReviewType } from "@/components/reviews/ReviewTable";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Not authorized");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("http://localhost:3000/api/reviews/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch reviews");

        const data = await res.json();
        console.log("API Response for Reviews:", data);

        if (Array.isArray(data)) {
          setReviews(data);
        } else {
          setError("No reviews found");
        }
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <main className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2">Reviews</h1>
      <p className="text-gray-600 mb-4">View all renter and owner reviews</p>
      <ReviewTable reviews={reviews} />
    </main>
  );
}

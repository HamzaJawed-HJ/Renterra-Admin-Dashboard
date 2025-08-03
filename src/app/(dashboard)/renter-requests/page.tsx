"use client";

import React, { useEffect, useState } from "react";
import RentalRequestTable from "@/components/rental-request/RentalRequestTable";
import { RentalRequestType } from "@/components/rental-request/RentalRequestTable";

export default function RenterRequestsPage() {
  const [rentalRequests, setRentalRequests] = useState<RentalRequestType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRentalRequests = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Not authorized");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          "http://localhost:3000/api/admin/getAllRenterRequest",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch rental requests");

        const data = await res.json();
        console.log("API Response for Renter Requests:", data);

        if (data && Array.isArray(data.rentalRequests)) {
          setRentalRequests(data.rentalRequests);
        } else {
          setError("No rental requests found");
        }
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchRentalRequests();
  }, []);

  if (loading) return <p>Loading renter requests...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <main className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2">Renter Requests</h1>
      <p className="text-gray-600 mb-4">
        View and manage all rental requests from renters
      </p>
      <RentalRequestTable rentalRequests={rentalRequests} />
    </main>
  );
}

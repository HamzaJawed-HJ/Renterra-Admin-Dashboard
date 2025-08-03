"use client";

import React, { useEffect, useState } from "react";
import RenterTable from "@/components/renters/RenterTable"; // Pass renters to RenterTable
import { renter as mockRenters } from "@/data/renter"; // Fallback static data if needed

const RenterData = () => {
  const [renters, setRenters] = useState<any[]>([]); // Renters state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRenters = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Not authorized");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("http://localhost:3000/api/admin/getAllRenter", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch renters");

        const data = await res.json();
        console.log("API Response for Renters:", data); // Log full response

        // Check if 'owners' field exists and is an array
        if (data && Array.isArray(data.owners)) {
          setRenters(data.owners);  // Use 'owners' as the source for renters
        } else {
          setError("No renters found in the response");
          setRenters(mockRenters); // Fallback to static data if API data is empty
        }
      } catch (err: any) {
        setError(err.message || "Something went wrong");
        setRenters(mockRenters); // Fallback to static data if API call fails
      } finally {
        setLoading(false);
      }
    };

    fetchRenters(); // Fetch renters on mount
  }, []); // Empty dependency to run only on component mount

  useEffect(() => {
    console.log("Renters state after fetching:", renters); // Log the renters state
  }, [renters]); // Log renters state when it changes

  // Loading and error states
  if (loading) return <p>Loading renters...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2">Renter</h1>
      <p className="text-gray-600 mb-4">View all Registered Renters</p>
      <RenterTable renters={renters} /> {/* Pass renters (owners) to RenterTable */}
    </div>
  );
};

export default RenterData;

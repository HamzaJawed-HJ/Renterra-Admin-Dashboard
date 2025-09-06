"use client";

import React, { useEffect, useState } from "react";
import AgreementTable, { AgreementType } from "@/components/agreements/AgreementTable";

export default function AgreementsPage() {
  const [agreements, setAgreements] = useState<AgreementType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAgreements = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Not authorized");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("http://localhost:3000/api/agreements/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch agreements");

        const data = await res.json();
        console.log("API Response for Agreements:", data);

        if (data && Array.isArray(data.agreements)) {
          setAgreements(data.agreements);
        } else {
          setError("No agreements found");
        }
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchAgreements();
  }, []);

  if (loading) return <p>Loading agreements...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <main className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2">Agreements</h1>
      <p className="text-gray-600 mb-4">
        View all agreements between renters and owners
      </p>
      <AgreementTable agreements={agreements} />
    </main>
  );
}

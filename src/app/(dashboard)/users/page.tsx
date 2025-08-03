"use client";

import React, { useEffect, useState } from "react";
import UserTable from "@/components/users/UserTable";

const UserData = () => {
  const [users, setUsers] = useState<any[]>([]); // users state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Not authorized");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("http://localhost:3000/api/admin/getAllUsers", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch users");

        const data = await res.json();

        console.log("API Response:", data);

        // Access the users inside 'renters' instead of 'users'
        const renters = Array.isArray(data.renters) ? data.renters : [];

        console.log("Users array (renters):", renters);

        setUsers(renters); // Set renters to users
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); // Empty dependency to only run on component mount

  useEffect(() => {
    console.log("Users state after fetching:", users);
  }, [users]); // This will log every time users state is updated

  if (loading) return <p>Loading users...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2">Users</h1>
      <p className="text-gray-600 mb-4">Manage and view all registered users</p>
      <UserTable users={users} /> {/* Pass the users state to UserTable */}
    </div>
  );
};

export default UserData;

"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAuth } from "@/context/AuthContext";
import { Lock } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import LoginPage from "./loginpage";

interface InputFieldProps {
  type?: string;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  label?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
}

export function InputField({
  type,
  placeholder,
  value,
  disabled,
  label,
  onChange,
  name,
}: InputFieldProps) {
  return (
    <div className="grid gap-1.5">
      {label && <label className="text-sm text-gray-600">{label}</label>}
      <Input
        className="bg-blue-50 border border-blue-200 focus:ring-2 focus:ring-blue-400"
        type={type}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={onChange}
        name={name}
      />
    </div>
  );
}

export default function LoginModal() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name!]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:3000/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data?.message || "Login failed");

      localStorage.setItem("token", data.token);
      login({ name: "Admin", email: formData.email });

      alert("Login successful!");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      {/* Trigger Button (You can style it like your glossy login button) */}
      <LoginPage/>

      {/* Modal Content */}
      <DialogContent className="sm:max-w-[425px] bg-gradient-to-br from-blue-50 via-white to-blue-100 rounded-2xl shadow-2xl border-0 p-0 overflow-hidden">
        <DialogTitle asChild>
          <VisuallyHidden>Admin Login</VisuallyHidden>
        </DialogTitle>

        <div className="flex flex-col items-center justify-center py-8 px-6">
          {/* Header */}
          <div className="flex flex-col items-center mb-6">
            <div className="bg-blue-600 rounded-full p-3 mb-3 shadow-lg">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-blue-700 mb-1 text-center">
              Welcome to Renterra Admin
            </h1>
            <p className="text-gray-500 text-center text-base mb-2">
              Sign in to manage rentals, view bookings & access admin features.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="w-full max-w-xs grid gap-4">
            <InputField
              type="email"
              name="email"
              placeholder="Enter Email"
              label="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <InputField
              type="password"
              name="password"
              placeholder="Enter Password"
              label="Password"
              value={formData.password}
              onChange={handleChange}
            />

            {error && (
              <p className="text-sm text-red-500 font-medium -mt-2">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 px-4 py-2 font-medium bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow hover:from-blue-600 hover:to-blue-700 active:scale-95 transition-all"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

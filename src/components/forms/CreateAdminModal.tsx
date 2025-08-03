"use client";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import axios from "axios";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";

interface InputFieldProps {
  type?: string;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  label?: string;
  name?: string;
}

export function InputField({
  type,
  placeholder,
  value,
  disabled,
  label,
  name,
}: InputFieldProps) {
  return (
    <div className="grid gap-1.5">
      {label && <label className="text-sm">{label}</label>}
      <Input
        className="bg-secondary/50"
        type={type}
        placeholder={placeholder}
        value={value}
        name={name}
        disabled={disabled}
      />
    </div>
  );
}

export default function CreateAdminAccount() {
  const inputs = [
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter Email",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Create Password",
    },
    // { label: "Role", type: "text", value: "Admin", disabled: true },
    // {
    //   label: "Created at",
    //   type: "text",
    //   value: new Date().toLocaleString(), // or Date.now().toString()
    //   disabled: true,
    // },
  ];

const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const email = e.currentTarget.email.value;
  const password = e.currentTarget.password.value;
  const data = { email, password };

  const token = localStorage.getItem("token");
  if (!token) {
    alert("No token found. Please login first.");
    return;
  }

  try {
    await axios.post("http://localhost:3000/api/admin/createAdmin", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    alert("Admin account created successfully");
  } catch (error: any) {
    // Show specific error message from backend if available
    const message =
      error.response?.data?.message || "Something went wrong. Please try again.";
    alert(message);
    console.error("Create Admin Error:", error);
  }
};


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-foreground">
          Create Admin
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="my-2">
          <DialogTitle className="priText font-semibold">
            Create Admin
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={submitHandler}>
          <div className="grid gap-4">
            {inputs.map((each, index) => (
              <InputField
                key={index}
                name={each.name}
                type={each.type}
                placeholder={each.placeholder}
                // value={each.value}
                // disabled={each.disabled}
                label={each.label}
              />
            ))}
          </div>
          <button
            type="submit"
            className="mt-2 px-3 py-2 font-medium bg-emerald-600 text-white rounded-md hover:bg-emerald-500 active:bg-emerald-600"
          >
            Create New Admin
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

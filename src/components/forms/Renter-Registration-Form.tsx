// COMMIT 1: Initial setup and imports
"use client"; // Required for Next.js 13+ App Router

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Phone,
  Store,
  MapPin,
  CreditCard,
  UserCheck,
} from "lucide-react";

// COMMIT 2: Define form data structure and types
interface FormData {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
  shopName: string;
  shopAddress: string;
  cnic: string;
  area: string;
  role: string;
}

interface FormErrors {
  [key: string]: string;
}

// COMMIT 3: Define role options
const ROLE_OPTIONS = [
  { value: "retailer", label: "Retailer" },
  { value: "wholesaler", label: "Wholesaler" },
  { value: "distributor", label: "Distributor" },
  { value: "manufacturer", label: "Manufacturer" },
  { value: "owner", label: "owner" },
];

export default function RegistrationForm() {
  // COMMIT 4: Initialize state variables
  const [mounted, setMounted] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    shopName: "",
    shopAddress: "",
    cnic: "",
    area: "",
    role: "",
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // COMMIT 4.1: Handle hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4'>
        <div className='max-w-2xl mx-auto'>
          <Card className='shadow-2xl border-0'>
            <CardHeader className='text-center pb-8'>
              <CardTitle className='text-3xl font-bold text-gray-900'>
                Create Account
              </CardTitle>
              <CardDescription className='text-lg text-gray-600 mt-2'>
                Loading...
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    );
  }

  // COMMIT 5: Handle input changes with error clearing
  const handleInputChange = (field: keyof FormData, value: string): void => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  // COMMIT 6: Form validation logic
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Personal information validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    }

    if (!formData.cnic.trim()) {
      newErrors.cnic = "CNIC is required";
    } else if (!/^\d{5}-\d{7}-\d{1}$/.test(formData.cnic)) {
      newErrors.cnic = "CNIC format should be 12345-1234567-1";
    }

    // Business information validation
    if (!formData.shopName.trim()) {
      newErrors.shopName = "Shop name is required";
    }

    if (!formData.shopAddress.trim()) {
      newErrors.shopAddress = "Shop address is required";
    }

    if (!formData.area.trim()) {
      newErrors.area = "Area is required";
    }

    if (!formData.role) {
      newErrors.role = "Role is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // COMMIT 7: Form submission handler
  const handleSubmit = async (): Promise<void> => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      // POST to your API endpoint
      const response = await fetch(
        "http://localhost:3000/api/renter/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        // Handle HTTP error status
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.message || `HTTP error! status: ${response.status}`
        );
      }

      const result = await response.json();
      console.log("Registration successful:", result);

      // Show success message
      setSubmitMessage({
        type: "success",
        text: "Registration successful! Welcome aboard!",
      });

      // Reset form after successful submission
      setFormData({
        fullName: "",
        email: "",
        password: "",
        phoneNumber: "",
        shopName: "",
        shopAddress: "",
        cnic: "",
        area: "",
        role: "",
      });

      // // Optional: Redirect after delay
      // setTimeout(() => {
      //   window.location.href = '/login';
      // }, 2000);
    } catch (error) {
      console.error("Registration failed:", error);

      // Show user-friendly error message
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Registration failed. Please try again.";

      setSubmitMessage({
        type: "error",
        text: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // COMMIT 8: Toggle password visibility
  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };

  // COMMIT 9: Render form field with error handling
  const renderFormField = (
    id: keyof FormData,
    label: string,
    type: string = "text",
    placeholder: string = "",
    icon?: React.ReactNode,
    isTextarea: boolean = false
  ) => {
    const hasError = !!errors[id];
    const inputClasses = `transition-all ${
      hasError ? "border-red-500 focus:border-red-500" : "focus:border-blue-500"
    }`;
    const iconClasses = icon ? "pl-10" : "";

    return (
      <div className='space-y-2'>
        <Label
          htmlFor={id}
          className='text-sm font-medium'
        >
          {label} *
        </Label>
        <div className='relative'>
          {icon && (
            <div className='absolute left-3 top-3 w-4 h-4 text-gray-400'>
              {icon}
            </div>
          )}
          {isTextarea ? (
            <Textarea
              id={id}
              placeholder={placeholder}
              value={formData[id]}
              onChange={(e) => handleInputChange(id, e.target.value)}
              className={`min-h-20 ${inputClasses}`}
              suppressHydrationWarning
            />
          ) : (
            <Input
              id={id}
              type={type}
              placeholder={placeholder}
              value={formData[id]}
              onChange={(e) => handleInputChange(id, e.target.value)}
              className={`${iconClasses} ${inputClasses}`}
              suppressHydrationWarning
              autoComplete='off'
            />
          )}
        </div>
        {hasError && <p className='text-sm text-red-600'>{errors[id]}</p>}
      </div>
    );
  };

  // COMMIT 10: Main component render
  return (
    <div className='bg-gradient-to-br py-8 px-4'>
      <div className='max-w-2xl mx-auto'>
        <Card className='shadow-2xl border-0'>
          {/* COMMIT 11: Header section */}
          <CardHeader className='text-center pb-8'>
            <CardTitle className='text-3xl font-bold text-gray-900'>
              Create Account
            </CardTitle>
            <CardDescription className='text-lg text-gray-600 mt-2'>
              Register your business to get started
            </CardDescription>
          </CardHeader>

          <CardContent className='p-8'>
            <div className='space-y-6'>
              {/* COMMIT 12: Personal Information Section */}
              <div className='space-y-4'>
                <h3 className='text-lg font-semibold text-gray-800 flex items-center gap-2'>
                  <User className='w-5 h-5' />
                  Personal Information
                </h3>

                <div className='grid md:grid-cols-2 gap-4'>
                  {renderFormField(
                    "fullName",
                    "Full Name",
                    "text",
                    "Enter your full name"
                  )}
                  {renderFormField(
                    "email",
                    "Email Address",
                    "email",
                    "Enter your email",
                    <Mail className='w-4 h-4' />
                  )}
                </div>

                <div className='grid md:grid-cols-2 gap-4'>
                  {/* Password field with toggle */}
                  <div className='space-y-2'>
                    <Label
                      htmlFor='password'
                      className='text-sm font-medium'
                    >
                      Password *
                    </Label>
                    <div className='relative'>
                      <Input
                        id='password'
                        type={showPassword ? "text" : "password"}
                        placeholder='Create a password'
                        value={formData.password}
                        onChange={(e) =>
                          handleInputChange("password", e.target.value)
                        }
                        className={`pr-10 transition-all ${
                          errors.password
                            ? "border-red-500 focus:border-red-500"
                            : "focus:border-blue-500"
                        }`}
                        suppressHydrationWarning
                        autoComplete='new-password'
                      />
                      <button
                        type='button'
                        onClick={togglePasswordVisibility}
                        className='absolute right-3 top-3 text-gray-400 hover:text-gray-600'
                      >
                        {showPassword ? (
                          <EyeOff className='w-4 h-4' />
                        ) : (
                          <Eye className='w-4 h-4' />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className='text-sm text-red-600'>{errors.password}</p>
                    )}
                  </div>

                  {renderFormField(
                    "phoneNumber",
                    "Phone Number",
                    "tel",
                    "+92 300 1234567",
                    <Phone className='w-4 h-4' />
                  )}
                </div>

                <div className='grid md:grid-cols-2 gap-4'>
                  {renderFormField(
                    "cnic",
                    "CNIC",
                    "text",
                    "12345-1234567-1",
                    <CreditCard className='w-4 h-4' />
                  )}

                  {/* Role selection dropdown */}
                  <div className='space-y-2'>
                    <Label
                      htmlFor='role'
                      className='text-sm font-medium'
                    >
                      Role *
                    </Label>
                    <div className='relative'>
                      <UserCheck className='absolute left-3 top-3 w-4 h-4 text-gray-400 z-10' />
                      <Select
                        value={formData.role}
                        onValueChange={(value) =>
                          handleInputChange("role", value)
                        }
                      >
                        <SelectTrigger
                          className={`pl-10 transition-all ${
                            errors.role
                              ? "border-red-500 focus:border-red-500"
                              : "focus:border-blue-500"
                          }`}
                          suppressHydrationWarning
                        >
                          <SelectValue placeholder='Select your role' />
                        </SelectTrigger>
                        <SelectContent>
                          {ROLE_OPTIONS.map((role) => (
                            <SelectItem
                              key={role.value}
                              value={role.value}
                            >
                              {role.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    {errors.role && (
                      <p className='text-sm text-red-600'>{errors.role}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* COMMIT 13: Business Information Section */}
              <div className='space-y-4 pt-6 border-t border-gray-200'>
                <h3 className='text-lg font-semibold text-gray-800 flex items-center gap-2'>
                  <Store className='w-5 h-5' />
                  Business Information
                </h3>

                <div className='grid md:grid-cols-2 gap-4'>
                  {renderFormField(
                    "shopName",
                    "Shop Name",
                    "text",
                    "Enter your shop name"
                  )}
                  {renderFormField(
                    "area",
                    "Area",
                    "text",
                    "e.g., Gulshan-e-Iqbal",
                    <MapPin className='w-4 h-4' />
                  )}
                </div>

                {renderFormField(
                  "shopAddress",
                  "Shop Address",
                  "text",
                  "Enter your complete shop address",
                  undefined,
                  true
                )}
              </div>

              {/* COMMIT 14: Success/Error messages */}
              {submitMessage && (
                <Alert
                  className={`${
                    submitMessage.type === "success"
                      ? "border-green-200 bg-green-50"
                      : "border-red-200 bg-red-50"
                  }`}
                >
                  <AlertDescription
                    className={`${
                      submitMessage.type === "success"
                        ? "text-green-800"
                        : "text-red-800"
                    }`}
                  >
                    {submitMessage.text}
                  </AlertDescription>
                </Alert>
              )}

              {/* COMMIT 14.1: Validation error alert */}
              {Object.keys(errors).length > 0 && !submitMessage && (
                <Alert className='border-red-200 bg-red-50'>
                  <AlertDescription className='text-red-800'>
                    Please fix the errors above before submitting.
                  </AlertDescription>
                </Alert>
              )}

              {/* COMMIT 15: Submit button */}
              <Button
                type='button'
                onClick={handleSubmit}
                className='w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold transition-all duration-200 transform hover:scale-[1.02]'
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className='flex items-center justify-center gap-2'>
                    <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                    Creating Account...
                  </div>
                ) : (
                  "Create Account"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

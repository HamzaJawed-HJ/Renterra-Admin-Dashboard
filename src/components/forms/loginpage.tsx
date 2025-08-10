"use client";
import React from "react";
import { DialogTrigger } from "../ui/dialog";
import Image from "next/image";
import { FaLock } from "react-icons/fa";

const LoginPage = () => {
  return (
    <div className="min-h-screen w-full relative flex flex-col md:flex-row items-center justify-center p-6">
      {/* Abstract Background */}
      <div className="min-h-screen absolute inset-0 bg-gradient-to-br from-blue-100 via-indigo-200 to-purple-300">
  {/* Top Left Blob */}
  <div className="absolute top-[-120px] left-[-120px] w-[450px] h-[450px] 
                  bg-gradient-to-br from-blue-400 via-cyan-300 to-teal-400 
                  rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>

  {/* Bottom Right Blob */}
  <div className="absolute bottom-[-120px] right-[-120px] w-[450px] h-[450px] 
                  bg-gradient-to-br from-indigo-500 via-blue-400 to-purple-400 
                  rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse 
                  animation-delay-500"></div>

  {/* Extra Floating Accent */}
  <div className="absolute top-[40%] left-[60%] w-[250px] h-[250px] 
                  bg-gradient-to-br from-pink-400 via-purple-300 to-blue-300 
                  rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse 
                  animation-delay-700"></div>
</div>

      {/* Content Wrapper */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16">
        {/* Illustration Section */}
        <div className="flex flex-col items-center md:items-start justify-center space-y-8 text-center md:text-left">
          <Image
            src="/car.png"
            alt="Car Illustration"
            width={380}
            height={380}
            priority
            className="drop-shadow-2xl hover:scale-105 transition-transform duration-500"
          />
          <div className="max-w-lg space-y-5">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              Your Ultimate{" "}
              <span className="text-blue-600">Car Rental</span> Experience
            </h1>
            <p className="text-gray-600 text-lg md:text-xl">
              Find your perfect car and start exploring the best rental cars
              right now. Seamless booking, best prices, and your favorite cars
              in one place.
            </p>
          </div>
        </div>

        {/* Admin Login Card */}
        <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-sm border border-gray-100 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-100 rounded-full blur-3xl opacity-30"></div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Admin Login</h2>
          <p className="text-gray-500 mb-8 text-base">
            Sign in to manage rentals, view bookings, and access admin features.
          </p>

          {/* Glossy Login Button */}
          <DialogTrigger asChild>
            <button className="w-full flex items-center justify-center space-x-3 rounded-full px-6 py-3 font-semibold text-white shadow-lg bg-gradient-to-b from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 transition-all duration-300 relative overflow-hidden">
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-inner">
                <FaLock className="text-blue-600 text-lg" />
              </span>
              <span className="text-lg">Log in</span>
              {/* Shine effect */}
              <span className="absolute top-0 left-0 w-full h-full bg-white opacity-20 transform -skew-y-12 translate-y-[-150%] hover:translate-y-[150%] transition-transform duration-700"></span>
            </button>
          </DialogTrigger>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

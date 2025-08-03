"use client";

import React from "react";
import CreateAdminAccount from "../forms/CreateAdminModal";
import LoginAdminAccount from "../forms/loginAdminModal";
import { useAuth } from "@/context/AuthContext"; // 👈 import context

const Header = () => {
  const { user, logout } = useAuth(); // 👈 get current user and logout

  return (
    <header className='w-full flex items-center justify-between p-2.5 bg-primary fixed left-0 top-0 border-b border-border z-50'>
      <div>
        <h1 className='priText capitalize font-semibold'>Admin Panel</h1>
      </div>
      <div className='flex gap-4 items-center'>
        <div className='text-sm text-white flex gap-2'>
          {!user && <LoginAdminAccount />}
          <CreateAdminAccount />
        </div>
        {user && (
          <div className='cursor-pointer flex items-center gap-2.5 bg-secondary rounded-md p-2 px-2.5'>
            <div className='rounded-full size-8 outline-2 outline-border uppercase flex items-center justify-center text-sm font-semibold'>
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div className='grid text-sm'>
              <span className='capitalize leading-4'>{user.name}</span>
              <span className='lowercase leading-4'>{user.email}</span>
            </div>
            <button
              onClick={logout}
              className="ml-4 px-2 py-1 bg-red-600 text-white rounded hover:bg-red-500 text-xs"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

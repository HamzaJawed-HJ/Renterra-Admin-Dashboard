"use client";
import React, { useEffect, useState } from "react";
import { FaToggleOff, FaToggleOn } from "react-icons/fa6";

const ThemButton: React.FC<{ className?: string }> = ({ className }) => {
  const [theme, setTheme] = useState<boolean>(false);

  useEffect(() => {
    const match = document.cookie.match(/theme=(true|false)/);
    const savedTheme = match ? match[1] === "true" : false;

    setTheme(savedTheme);

    if (savedTheme) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !theme;
    setTheme(newTheme);
    document.cookie = `theme=${newTheme}; path=/;`;

    if (newTheme) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className={
        !className
          ? `w-full flex p-2 rounded-md gap-2.5 items-center hover:bg-secondary cursor-pointer`
          : `${className}`
      }
    >
      {/* {theme ? (
        <>
          <FaToggleOn className='size-6' />
          <span className='capitalize smallText'>Switch to light</span>
        </>
      ) : (
        <>
          <FaToggleOff className='size-6' />
          <span className='capitalize smallText'>Switch to dark</span>
        </>
      )} */}
    </button>
  );
};

export default ThemButton;

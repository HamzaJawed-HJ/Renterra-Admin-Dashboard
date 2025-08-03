"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserType } from "@/types/User";

export const userColumns: ColumnDef<UserType>[] = [



  
  {
    accessorKey: "fullName",
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Full Name
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </Button>
    ),
    cell: ({ row }) => (
      <div className='font-medium'>{row.getValue("fullName")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Email
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </Button>
    ),
    cell: ({ row }) => <div className='lowercase'>{row.getValue("email")}</div>,
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
    cell: ({ row }) => (
      <div className='font-mono'>{row.getValue("phoneNumber")}</div>
    ),
  },
  {
    accessorKey: "cnic",
    header: "CNIC",
    cell: ({ row }) => (
      <div className='font-mono text-sm'>{row.getValue("cnic")}</div>
    ),
  },

  {
    accessorKey: "profilePicture",
    header: "Profile Picture",
    cell: ({ row }) => {
      const value = row.getValue("profilePicture");
      return value ? (
        <img
          src={typeof value === 'string' ? `/uploads/${value}` : ''}
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover border"
        />
      ) : (
        <span className="text-xs text-gray-400">N/A</span>
      );
    },
  },
  {
    accessorKey: "cnicPicture",
    header: "CNIC Picture",
    cell: ({ row }) => {
      const value = row.getValue("cnicPicture");
      return value ? (
        <img
          src={typeof value === 'string' ? `/uploads/${value}` : ''}
          alt="CNIC"
          className="w-10 h-10 rounded object-cover border"
        />
      ) : (
        <span className="text-xs text-gray-400">N/A</span>
      );
    },
  },

  
 
];

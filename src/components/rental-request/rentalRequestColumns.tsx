"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface RentalRequestType {
  _id: string;
  productID: string;
  renterID: string;
  status: string;
  requestDate?: string;  // optional
  // Add more fields as per your data model
}

export const rentalRequestColumns: ColumnDef<RentalRequestType>[] = [
  {
    accessorKey: "_id",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Request ID
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="font-mono">{row.getValue("_id")}</div>,
  },
  {
    accessorKey: "productID",
    header: "Product ID",
    cell: ({ row }) => <div>{row.getValue("productID")}</div>,
  },
  {
    accessorKey: "renterID",
    header: "Renter ID",
    cell: ({ row }) => <div>{row.getValue("renterID")}</div>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Status
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="capitalize font-semibold">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "requestDate",
    header: "Request Date",
    cell: ({ row }) => (
      <div>
        {row.getValue("requestDate")
          ? new Date(row.getValue("requestDate")).toLocaleDateString()
          : "N/A"}
      </div>
    ),
  },
];

"use client";

import React from "react";
import { RenterType } from "@/types/Renters";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import { useReactTable, getCoreRowModel, ColumnDef, flexRender } from "@tanstack/react-table";
import { useState } from "react";

interface RenterTableProps {
  renters: RenterType[];
  setRenters: React.Dispatch<React.SetStateAction<RenterType[]>>;
}





export default function RenterTable({ renters , setRenters}: RenterTableProps) {
  const BASE_URL = "http://localhost:3000";
  const DEFAULT_AVATAR = "/default-avatar.png";  
  const [selectedRenter, setSelectedRenter] = useState<RenterType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

const [confirmModalOpen, setConfirmModalOpen] = useState(false);
const [renterToToggle, setRenterToToggle] = useState<RenterType | null>(null);


const handleBlockClick = (renter: RenterType) => {
  setRenterToToggle(renter);
  setConfirmModalOpen(true);
};


  const renterColumns: ColumnDef<RenterType>[] = [
    {
      header: "Profile",
      cell: ({ row }) => {
        const renter = row.original;
        return (
          <div className="flex items-center">
            {renter.profilePicture ? (
              <img
                src={`${BASE_URL}/uploads/${renter.profilePicture}`}
                alt="Profile"
                className="h-12 w-12 object-cover rounded-full border"
              />
            ) : (
              <span className="text-gray-400 italic text-sm">No image</span>
            )}
          </div>
        );
      },
    },
    {
      header: "CNIC Image",
      cell: ({ row }) => {
        const renter = row.original;
        return (
          <div className="flex items-center">
            {renter.cnicPicture ? (
              <img
                src={`${BASE_URL}/uploads/${renter.cnicPicture}`}
                alt="CNIC"
                className="h-12 w-12 object-cover rounded border"
              />
            ) : (
              <span className="text-gray-400 italic text-sm">No image</span>
            )}
          </div>
        );
      },
    },
    {
      header: "Full Name",
      accessorKey: "fullName",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Phone",
      accessorKey: "phoneNumber",
    },
    {
      header: "CNIC",
      accessorKey: "cnic",
    },
    {
      header: "Area",
      accessorKey: "area",
    },
    {
      header: "Shop Name",
      accessorKey: "shopName",
    },
    {
      header: "Shop Address",
      accessorKey: "shopAddress",
    },

    {
      header: "Status",
      cell: ({ row }) => {
        const renter = row.original;
        return (
          <Button
            variant={renter.isBlocked ? "destructive" : "default"}
            className={`text-xs ${!renter.isBlocked ? "text-black border-gray-300" : ""}`}
            onClick={(e) => {
              e.stopPropagation(); // Prevent row modal open
              handleBlockClick(renter); // Custom function to open confirm dialog
            }}
          >
            {renter.isBlocked ? "Unblock" : "Block Renter"}
          </Button>
        );
      },
    }


  ];



  const table = useReactTable({
    data: renters,
    columns: renterColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleRowClick = (renter: RenterType) => {
    setSelectedRenter(renter);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRenter(null);
  };

  const renderImage = (src: string | undefined, alt: string) =>
    src ? (
      <div className="flex flex-col items-center gap-2">
        <img src={`/uploads/${src}`} alt={alt} className="w-20 h-20 object-cover border rounded-full shadow" />
        <a href={`/uploads/${src}`} download className="text-xs text-blue-600 underline">Download</a>
      </div>
    ) : (
      <div className="flex flex-col items-center gap-2">
        <img src={DEFAULT_AVATAR} alt="Default" className="w-20 h-20 object-cover border rounded-full shadow" />
        <span className="text-xs text-gray-400">N/A</span>
      </div>
    );

  return (
    <div className="overflow-x-auto border rounded-md">
      <div className="w-full overflow-auto rounded-xl shadow-lg bg-white border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-gray-100 sticky top-0 z-10">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="py-3 px-4 text-gray-700 font-semibold">
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  onClick={() => handleRowClick(row.original)}
                  key={row.id}
                  className="cursor-pointer hover:bg-primary/10 transition even:bg-gray-50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-2 px-4 truncate" title={String(cell.getValue())}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={renterColumns.length} className="h-24 text-center">
                  No renters found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-3xl rounded-2xl shadow-2xl bg-white p-8">
          <DialogHeader>

            <DialogTitle className="text-2xl font-bold text-primary text-gray-800">Renter Details</DialogTitle>
            <DialogClose
              onClick={closeModal}
              className="absolute right-1 top-1 rounded-full bg-gray-200 hover:bg-gray-300 p-2 h-10 w-10"
            >
              {/* <X className="h-5 w-5" /> */}
            </DialogClose>
          </DialogHeader>
          <div className="divide-y divide-gray-200 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6">
              {/* Profile Picture */}
              <div className="flex flex-col items-center">
                {renderImage(selectedRenter?.profilePicture, "Profile")}
                <span className="mt-2 text-gray-600 text-lg font-semibold">{selectedRenter?.fullName}</span>
              </div>
              {/* Details */}
              <div>
                <div className="mb-2"><span className="font-semibold">Email:</span> {selectedRenter?.email}</div>
                <div className="mb-2"><span className="font-semibold">Phone:</span> {selectedRenter?.phoneNumber}</div>
                <div className="mb-2"><span className="font-semibold">Role:</span>
                  <span className="ml-2 px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">{selectedRenter?.role}</span>
                </div>
                <div className="mb-2"><span className="font-semibold">Area:</span> {selectedRenter?.area}</div>
                <div className="mb-2"><span className="font-semibold">CNIC:</span> {selectedRenter?.cnic}</div>
                <div className="mb-2"><span className="font-semibold">User ID:</span> {selectedRenter?._id}</div>
                <div className="mb-2"><span className="font-semibold">Created At:</span> {selectedRenter?.createdAt ? new Date(selectedRenter.createdAt).toLocaleString() : "N/A"}</div>
                <div className="mb-2"><span className="font-semibold">Updated At:</span> {selectedRenter?.updatedAt ? new Date(selectedRenter.updatedAt).toLocaleString() : "N/A"}</div>
                <div className="mb-2"><span className="font-semibold">Password (Hashed):</span> <span className="font-mono text-xs break-all">{selectedRenter?.password}</span></div>
              </div>
            </div>
            {/* CNIC Picture and more details */}
            <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="font-semibold mb-2">CNIC Picture</div>
                {renderImage(selectedRenter?.cnicPicture, "CNIC")}
              </div>
              {/* ...other details if needed */}
            </div>
          </div>
          <div className="flex justify-end mt-6 pt-4 border-t">
            <Button onClick={closeModal} variant="outline">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>


      <Dialog open={confirmModalOpen} onOpenChange={setConfirmModalOpen}>
        <DialogContent className="rounded-xl max-w-md">
          <DialogHeader>
            <DialogTitle>
              {renterToToggle?.isBlocked ? "Unblock Renter?" : "Block Renter?"}
            </DialogTitle>
          </DialogHeader>
          <div className="text-gray-600">
            Are you sure you want to{" "}
            <span className="font-bold">
              {renterToToggle?.isBlocked ? "Unblock" : "Block"}
            </span>{" "}
            {renterToToggle?.fullName}?
          </div>
          <div className="flex justify-end mt-4 gap-2">
            <Button variant="outline" onClick={() => setConfirmModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant={renterToToggle?.isBlocked ? "default" : "destructive"}
               className={`text-xs ${renterToToggle?.isBlocked ? "text-black border-gray-300" : ""}`}
              onClick={async () => {
                if (!renterToToggle) return;

                try {
                  const token = localStorage.getItem("token");
                  const res = await fetch(`http://localhost:3000/api/admin/toggleBlockOwner/${renterToToggle._id}`, {
                    method: "PATCH",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`,
                    },
                  });

                  if (!res.ok) throw new Error("Failed to update block status");

                  // Optimistic UI update
                  setConfirmModalOpen(false);
                  setRenterToToggle(null);

                  // Update UI
                  const updatedRenters = renters.map((r) =>
                    r._id === renterToToggle._id
                      ? { ...r, isBlocked: !r.isBlocked }
                      : r
                  );
                  setRenters(updatedRenters);

                  // Show success toast/snackbar
                  alert(`Renter has been ${renterToToggle.isBlocked ? "unblocked" : "blocked"} successfully`);
                } catch (err) {
                  alert("Something went wrong!");
                }
              }}
            >
              {renterToToggle?.isBlocked ? "Unblock" : "Block"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

    </div>
  );
}



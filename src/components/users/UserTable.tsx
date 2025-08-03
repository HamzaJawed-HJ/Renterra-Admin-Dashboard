"use client";

import React, { useState } from "react";
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
  flexRender,
} from "@tanstack/react-table";
import { userColumns } from "./userColumns";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { ChevronDown } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserType } from "@/types/User";

interface UserTableProps {
  users: UserType[];
  setUsers: React.Dispatch<React.SetStateAction<UserType[]>>;
}

export default function UserTable({ users, setUsers }: UserTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userDetails, setUserDetails] = useState<UserType | null>(null);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [userToToggle, setUserToToggle] = useState<UserType | null>(null);

  const columns = [
    ...userColumns,
    {
      header: "Status",
      cell: ({ row }: any) => {
        const user = row.original;
        return (
          <Button
            variant={user.isBlocked ? "destructive" : "outline"}
            className={`text-xs ${!user.isBlocked ? "text-black border border-gray-400" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              setUserToToggle(user);
              setConfirmModalOpen(true);
            }}
          >
            {user.isBlocked ? "Unblock" : "Block User"}
          </Button>
        );
      },
    },
  ];

  const table = useReactTable({
    data: users,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: { sorting, columnFilters, columnVisibility },
  });

  const handleRowClick = (user: UserType) => {
    setUserDetails(user);
    setIsModalOpen(true);
  };

  const DEFAULT_AVATAR = "/default-avatar.png";
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
    <>
      {/* Filter Section */}
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Filter by email..."
            value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
            onChange={(e) => table.getColumn("email")?.setFilterValue(e.target.value)}
            className="max-w-sm border"
          />
          <Input
            placeholder="Filter by name..."
            value={(table.getColumn("fullName")?.getFilterValue() as string) ?? ""}
            onChange={(e) => table.getColumn("fullName")?.setFilterValue(e.target.value)}
            className="max-w-sm border"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table.getAllColumns().filter(col => col.getCanHide()).map(col => (
              <DropdownMenuCheckboxItem
                key={col.id}
                checked={col.getIsVisible()}
                onCheckedChange={(val) => col.toggleVisibility(!!val)}
              >
                {col.id}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table */}
      <div className="w-full overflow-auto rounded-xl shadow-lg bg-white border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id} className="bg-gray-100 sticky top-0 z-10">
                {headerGroup.headers.map(header => (
                  <TableHead key={header.id} className="py-3 px-4 text-gray-700 font-semibold">
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow
                  key={row.id}
                  onClick={() => handleRowClick(row.original)}
                  className="cursor-pointer hover:bg-primary/10 transition even:bg-gray-50"
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id} className="py-2 px-4 truncate" title={String(cell.getValue())}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">No users found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between py-4">
        <div className="text-sm text-gray-500">
          Showing {table.getRowModel().rows.length} of {users.length} users
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>

      {/* Confirm Block/Unblock Modal */}
      <Dialog open={confirmModalOpen} onOpenChange={setConfirmModalOpen}>
        <DialogContent className="rounded-xl max-w-md">
          <DialogHeader>
            <DialogTitle>{userToToggle?.isBlocked ? "Unblock User?" : "Block User?"}</DialogTitle>
          </DialogHeader>
          <div className="text-gray-600">
            Are you sure you want to <strong>{userToToggle?.isBlocked ? "unblock" : "block"}</strong>{" "}
            {userToToggle?.fullName}?
          </div>
          <div className="flex justify-end mt-4 gap-2">
            <Button variant="outline" onClick={() => setConfirmModalOpen(false)}>Cancel</Button>
            <Button
               className={`text-xs ${userToToggle?.isBlocked ? "text-black border border-gray-400" : ""}`}
          
              variant={userToToggle?.isBlocked ? "default" : "destructive"}
              onClick={async () => {
                if (!userToToggle) return;

                try {
                  const token = localStorage.getItem("token");
                  const res = await fetch(`http://localhost:3000/api/admin/toggleBlockUser/${userToToggle._id}`, {
                    method: "PATCH",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`,
                    },
                  });

                  if (!res.ok) throw new Error("Failed to update status");

                  setUsers(prev =>
                    prev.map(u => u._id === userToToggle._id ? { ...u, isBlocked: !u.isBlocked } : u)
                  );

                  alert(`User has been ${userToToggle.isBlocked ? "unblocked" : "blocked"} successfully`);
                } catch {
                  alert("Something went wrong!");
                } finally {
                  setConfirmModalOpen(false);
                  setUserToToggle(null);
                }
              }}
            >
              {userToToggle?.isBlocked ? "Unblock" : "Block"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* User Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-3xl rounded-2xl shadow-2xl bg-white p-8">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-primary text-gray-800">User Details</DialogTitle>
            <DialogClose onClick={() => setIsModalOpen(false)} />
          </DialogHeader>
          {userDetails ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div className="flex flex-col items-center">
                {renderImage(userDetails.profilePicture, "Profile")}
                <span className="mt-2 text-gray-600 text-lg font-semibold">{userDetails.fullName}</span>
              </div>
              <div>
                <div className="mb-2"><strong>Email:</strong> {userDetails.email}</div>
                <div className="mb-2"><strong>Phone:</strong> {userDetails.phoneNumber}</div>
                <div className="mb-2"><strong>Area:</strong> {userDetails.area}</div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">No user details available</div>
          )}
          <div className="flex justify-end mt-6 pt-4 border-t">
            <Button onClick={() => setIsModalOpen(false)} variant="outline">Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

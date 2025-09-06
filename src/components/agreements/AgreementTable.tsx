"use client";

import React from "react";
import {
    ColumnDef,
    useReactTable,
    getCoreRowModel,
    flexRender,
} from "@tanstack/react-table";
import Image from "next/image";
import dayjs from "dayjs";

export type AgreementType = {
    _id: string;
    ownerID: {
        fullName: string;
        profilePicture?: string;
    };
    renterID: {
        fullName: string;
    };
    productID: {
        name: string;
        category: string;
        price: number;
        location: string;
    };
    pickupDate: string;
    returnDate: string;
    status: string;
    isPaid: boolean;
    fileUrl: string;
};

const AgreementTable = ({ agreements }: { agreements: AgreementType[] }) => {
    const columns: ColumnDef<AgreementType>[] = [
        {
            header: "Owner",
            accessorKey: "ownerID",
            cell: ({ row }) => {
                const owner = row.original.ownerID;
                return (
                    <div className="flex items-Start gap-2">

                        {/* {owner?.profilePicture && (
                            <img
                                src={`http://localhost:3000/uploads/${owner.profilePicture}`}
                                alt={owner.fullName}
                                className="w-8 h-8 rounded-full object-cover"
                            />
                        )} */}
                        {/* {owner?.profilePicture && (
              <Image
                src={`http://localhost:3000/uploads/${owner.profilePicture}`}
                alt={owner.fullName}
                width={32}
                height={32}
                className="w-8 h-8 rounded-full object-cover"
              />
            )} */}
                        <span>{owner.fullName}</span>
                    </div>
                );
            },
        },
        {
            header: "Renter",
            accessorKey: "renterID.fullName",
            cell: ({ row }) => row.original.renterID.fullName,
        },
        {
            header: "Product",
            accessorKey: "productID.name",
            cell: ({ row }) => {
                const product = row.original.productID;
                return (
                    <div>
                        <p>{product.name}</p>
                        <span className="text-xs text-gray-500">{product.category}</span>
                    </div>
                );
            },
        },
        {
            header: "Location",
            accessorKey: "productID.location",
            cell: ({ row }) => row.original.productID.location,
        },
        {
            header: "Price",
            accessorKey: "productID.price",
            cell: ({ row }) => `PKR ${row.original.productID.price.toLocaleString()}`,
        },
        {
            header: "Pickup Date",
            accessorKey: "pickupDate",
            cell: ({ row }) => dayjs(row.original.pickupDate).format("DD-MM-YYYY"),
        },
        {
            header: "Return Date",
            //  size: 280, // 👈 increase width (default is auto)
            accessorKey: "returnDate",
            cell: ({ row }) => dayjs(row.original.returnDate).format("DD-MM-YYYY"),
        },
        {
            header: "Status",
            accessorKey: "status",
            cell: ({ row }) => (
                <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${row.original.status === "active"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-green-100 text-green-700"
                        }`}
                >
                    {row.original.status}
                </span>
            ),
        },
        {
            header: "Payment",
            accessorKey: "isPaid",
            cell: ({ row }) => (
                <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${row.original.isPaid
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                >
                    {row.original.isPaid ? "Paid" : "Unpaid"}
                </span>
            ),
        },
        {
            header: "Agreement PDF",
            accessorKey: "fileUrl",
            cell: ({ row }) => (
                <button
                    onClick={() =>
                        window.open(`http://localhost:3000${row.original.fileUrl}`, "_blank")
                    }
                    className="text-blue-600 hover:underline"
                >
                    View PDF
                </button>
            ),
        },
    ];

    const table = useReactTable({
        data: agreements,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="overflow-x-auto border rounded-md">
            <table className="min-w-full text-sm text-left">
                <thead className="bg-gray-100">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th key={header.id} className="px-4 py-2 font-medium">
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.length > 0 ? (
                        table.getRowModel().rows.map((row) => (
                            <tr key={row.id} className="border-t">
                                {row.getVisibleCells().map((cell) => (
                                    <td key={cell.id} className="px-4 py-2">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={columns.length} className="px-4 py-2 text-center">
                                No agreements found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AgreementTable;

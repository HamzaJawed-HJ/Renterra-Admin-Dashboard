// "use client";

// import {
//   ColumnDef,
//   flexRender,
//   getCoreRowModel,
//   useReactTable,
// } from "@tanstack/react-table";
// import React from "react";
// import dayjs from "dayjs";

// export type ReviewType = {
//   _id: string;
//   agreementId: string;
//   renterId: {
//     _id: string;
//     email: string;
//     fullName: string;
//     profilePicture?: string;
//   };
//   ownerId: {
//     _id: string;
//     email: string;
//     fullName: string;
//     profilePicture?: string;
//   };
//   productId: {
//     _id: string;
//     name: string;
//     price: number;
//     image?: string;
//   };
//   rating: number;
//   comment: string;
//   createdAt: string;
// };

// interface ReviewTableProps {
//   reviews: ReviewType[];
// }

// const ReviewTable: React.FC<ReviewTableProps> = ({ reviews }) => {
//   const columns: ColumnDef<ReviewType>[] = [
//     {
//       header: "Renter",
//       accessorKey: "renterId",
//       cell: ({ row }) => {
//         const renter = row.original.renterId;
//         return (
//           <div className="flex items-center space-x-2">
//             {renter?.profilePicture && (
//               <img
//                 src={`http://localhost:3000/uploads/${renter.profilePicture}`}
//                 alt={renter.fullName}
//                 className="w-8 h-8 rounded-full object-cover"
//               />
//             )}
//             <span>{renter?.fullName}</span>
//           </div>
//         );
//       },
//     },
//     {
//       header: "Owner",
//       accessorKey: "ownerId",
//       cell: ({ row }) => {
//         const owner = row.original.ownerId;
//         return (
//           <div className="flex items-center space-x-2">
//             {owner?.profilePicture && (
//               <img
//                 src={`http://localhost:3000/uploads/${owner.profilePicture}`}
//                 alt={owner.fullName}
//                 className="w-8 h-8 rounded-full object-cover"
//               />
//             )}
//             <span>{owner?.fullName}</span>
//           </div>
//         );
//       },
//     },
//     {
//       header: "Product",
//       accessorKey: "productId",
//       cell: ({ row }) => {
//         const product = row.original.productId;
//         return (
//           <div className="flex items-center space-x-2">
//             {product?.image && (
//               <img
//                 src={`http://localhost:3000/uploads/${product.image}`}
//                 alt={product.name}
//                 className="w-10 h-10 rounded-md object-cover"
//               />
//             )}
//             <span>{product?.name}</span>
//           </div>
//         );
//       },
//     },
//     {
//       header: "Rating",
//       accessorKey: "rating",
//       cell: ({ row }) => {
//         const rating = row.original.rating;
//         return (
//           <div className="text-yellow-500">
//             {"⭐".repeat(rating)}{" "}
//             <span className="text-gray-500 text-sm">({rating})</span>
//           </div>
//         );
//       },
//     },
//     {
//       header: "Comment",
//       accessorKey: "comment",
//     },
//     {
//       header: "Date",
//       accessorKey: "createdAt",
//       cell: ({ row }) =>
//         dayjs(row.original.createdAt).format("DD-MM-YYYY"),
//     },
//   ];

//   const table = useReactTable({
//     data: reviews,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//   });

//   return (
//     <div className="overflow-x-auto border rounded-lg">
//       <table className="min-w-full border-collapse">
//         <thead className="bg-gray-100">
//           {table.getHeaderGroups().map((headerGroup) => (
//             <tr key={headerGroup.id}>
//               {headerGroup.headers.map((header) => (
//                 <th
//                   key={header.id}
//                   className="px-4 py-2 text-left text-sm font-medium text-gray-700"
//                 >
//                   {flexRender(
//                     header.column.columnDef.header,
//                     header.getContext()
//                   )}
//                 </th>
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody>
//           {table.getRowModel().rows.map((row) => (
//             <tr key={row.id} className="border-t">
//               {row.getVisibleCells().map((cell) => (
//                 <td key={cell.id} className="px-4 py-2 text-sm text-gray-800">
//                   {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ReviewTable;



"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useState } from "react";
import dayjs from "dayjs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export type ReviewType = {
  _id: string;
  agreementId: string;
  renterId: {
    _id: string;
    email: string;
    fullName: string;
    profilePicture?: string;
  };
  ownerId: {
    _id: string;
    email: string;
    fullName: string;
    profilePicture?: string;
  };
  productId: {
    _id: string;
    name: string;
    price: number;
    image?: string;
  };
  rating: number;
  comment: string;
  createdAt: string;
};

interface ReviewTableProps {
  reviews: ReviewType[];
}

const ReviewTable: React.FC<ReviewTableProps> = ({ reviews: initialReviews }) => {
  const [reviews, setReviews] = useState(initialReviews);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState<ReviewType | null>(null);

  const handleDelete = async () => {
    if (!reviewToDelete) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `http://localhost:3000/api/reviews/${reviewToDelete._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Failed to delete review");

      setReviews((prev) =>
        prev.filter((r) => r._id !== reviewToDelete._id)
      );

      alert("Review deleted successfully");
    } catch {
      alert("Something went wrong!");
    } finally {
      setConfirmModalOpen(false);
      setReviewToDelete(null);
    }
  };

  const columns: ColumnDef<ReviewType>[] = [
    {
      header: "Renter",
      accessorKey: "renterId",
      cell: ({ row }) => {
        const renter = row.original.renterId;
        return (
          <div className="flex items-center space-x-2">
            {renter?.profilePicture && (
              <img
                src={`http://localhost:3000/uploads/${renter.profilePicture}`}
                alt={renter.fullName}
                className="w-8 h-8 rounded-full object-cover"
              />
            )}
            <span>{renter?.fullName}</span>
          </div>
        );
      },
    },
    {
      header: "Owner",
      accessorKey: "ownerId",
      cell: ({ row }) => {
        const owner = row.original.ownerId;
        return (
          <div className="flex items-center space-x-2">
            {owner?.profilePicture && (
              <img
                src={`http://localhost:3000/uploads/${owner.profilePicture}`}
                alt={owner.fullName}
                className="w-8 h-8 rounded-full object-cover"
              />
            )}
            <span>{owner?.fullName}</span>
          </div>
        );
      },
    },
    {
      header: "Product",
      accessorKey: "productId",
      cell: ({ row }) => {
        const product = row.original.productId;
        return (
          <div className="flex items-center space-x-2">
            {product?.image && (
              <img
                src={`http://localhost:3000/uploads/${product.image}`}
                alt={product.name}
                className="w-10 h-10 rounded-md object-cover"
              />
            )}
            <span>{product?.name}</span>
          </div>
        );
      },
    },
    {
      header: "Rating",
      accessorKey: "rating",
      cell: ({ row }) => {
        const rating = row.original.rating;
        return (
          <div className="text-yellow-500">
            {"⭐".repeat(rating)}{" "}
            <span className="text-gray-500 text-sm">({rating})</span>
          </div>
        );
      },
    },
    {
      header: "Comment",
      accessorKey: "comment",
    },
    {
      header: "Date",
      accessorKey: "createdAt",
      cell: ({ row }) =>
        dayjs(row.original.createdAt).format("DD-MM-YYYY"),
    },
    {
      header: "Actions",
      id: "actions",
      cell: ({ row }) => (
        <Button
          variant="destructive"
          size="sm"
          onClick={() => {
            setReviewToDelete(row.original);
            setConfirmModalOpen(true);
          }}
        >
          Delete
        </Button>
      ),
    },
  ];

  const table = useReactTable({
    data: reviews,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-2 text-left text-sm font-medium text-gray-700"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-t">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-2 text-sm text-gray-800">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Confirm Delete Modal */}
      <Dialog open={confirmModalOpen} onOpenChange={setConfirmModalOpen}>
        <DialogContent className="rounded-xl max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Review?</DialogTitle>
          </DialogHeader>
          <div className="text-gray-600">
            Are you sure you want to <strong>delete</strong> this review from{" "}
            <span className="font-semibold">{reviewToDelete?.renterId.fullName}</span>?
          </div>
          <div className="flex justify-end mt-4 gap-2">
            <Button variant="outline" onClick={() => setConfirmModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ReviewTable;

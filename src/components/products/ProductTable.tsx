"use client";

import React from "react";

interface ProductTableProps {
  products: any[];
}

export default function ProductTable({ products }: ProductTableProps) {
  return (
    <div className="overflow-x-auto border rounded-md">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Image</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Name</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Category</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Description</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Price</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Location</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Time Period</th>

            {/* Owner Info */}
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Owner Name</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Owner Email</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Phone</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">CNIC</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Area</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Shop Name</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Shop Address</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {products.map((product) => (
            <tr key={product._id}>
              <td className="px-4 py-2">
                <img
                  src={`http://localhost:3000/uploads/${product.image}`}
                  alt={product.name}
                  className="h-12 w-12 object-cover rounded"
                />
              </td>
              <td className="px-4 py-2 text-sm">{product.name}</td>
              <td className="px-4 py-2 text-sm">{product.category}</td>
              <td className="px-4 py-2 text-sm">{product.description}</td>
              <td className="px-4 py-2 text-sm">Rs. {product.price}</td>
              <td className="px-4 py-2 text-sm">{product.location}</td>
              <td className="px-4 py-2 text-sm">{product.timePeriod}</td>

              {/* Owner Info */}
              <td className="px-4 py-2 text-sm">{product.ownerID?.fullName || "-"}</td>
              <td className="px-4 py-2 text-sm">{product.ownerID?.email || "-"}</td>
              <td className="px-4 py-2 text-sm">{product.ownerID?.phoneNumber || "-"}</td>
              <td className="px-4 py-2 text-sm">{product.ownerID?.cnic || "-"}</td>
              <td className="px-4 py-2 text-sm">{product.ownerID?.area || "-"}</td>
              <td className="px-4 py-2 text-sm">{product.ownerID?.shopName || "-"}</td>
              <td className="px-4 py-2 text-sm">{product.ownerID?.shopAddress || "-"}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import ProductTable from "@/components/products/ProductTable";

const ProductData = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Not authorized");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("http://localhost:3000/api/admin/getAllProductsWithOwnerDetails", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        console.log("API Response for Products:", data);

        if (data && Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          setError("No products found");
        }
      } catch (err: any) {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2">All Products with Owner Details</h1>
      <ProductTable products={products} />
    </div>
  );
};

export default ProductData;

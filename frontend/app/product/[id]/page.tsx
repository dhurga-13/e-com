import React from "react";
import Link from "next/link";
import { getProductByIdFromDB } from "@/lib/products";
import ProductDetailClient from "./ProductDetailClient";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const product = await getProductByIdFromDB(resolvedParams.id);

  if (!product) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-20">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <Link href="/" className="text-[#1565C0] hover:underline">
          Go Home
        </Link>
      </div>
    );
  }

  return <ProductDetailClient product={product} />;
}

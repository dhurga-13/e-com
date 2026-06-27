"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Trash2, Minus, Plus, ShoppingBag } from "lucide-react"; // Keep these imports
import { useCart } from "@/context/CartContext"; // Keep this import
import { placeOrder } from "@/app/actions/checkout";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } =
    useCart();
  
  const { data: session } = useSession();
  const router = useRouter();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = async () => {
    if (!session) {
      alert("Please log in to place an order.");
      router.push("/login?callbackUrl=/cart");
      return;
    }

    if (items.length === 0) return;

    setIsCheckingOut(true);
    try {
      const res = await placeOrder(items, totalPrice);
      if (res?.error) {
        alert(res.error);
      } else if (res?.success) {
        clearCart();
        alert("Order placed successfully! You can view it on the admin dashboard.");
        router.push("/admin/dashboard");
      }
    } catch (e) {
      alert("Something went wrong while placing your order.");
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="w-full">
      <main className="w-full min-h-[70vh] py-8 md:py-12 bg-[#f9f9f9]">
        <div className="max-w-[1540px] mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl md:text-[28px] font-black text-[#1a1a1a] mb-6 md:mb-8">
            Shopping Cart
          </h1>

          {items.length === 0 ? (
            // empty state
            <div className="flex flex-col items-center justify-center py-16 md:py-24 gap-4 text-center">
              <ShoppingBag
                size={64}
                className="text-gray-200 md:w-20 md:h-20"
              />
              <p className="text-lg md:text-[20px] font-bold text-gray-400">
                Your cart is empty
              </p>
              <Link
                href="/"
                className="bg-[#1565C0] text-white px-8 py-3 text-[14px] font-bold hover:bg-[#0D47A1] transition-colors"
              >
                CONTINUE SHOPPING
              </Link>
            </div>
          ) : (
            // cart content
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
              {/* LEFT - Cart table */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                {/* Header */}
                <div className="hidden md:grid bg-[#f5f5f5] px-6 py-4 grid-cols-[2.5fr_1fr_1.2fr_1fr] text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                  <span>PRODUCT</span>
                  <span className="text-center">PRICE</span>
                  <span className="text-center">QUANTITY</span>
                  <span className="text-right">TOTAL</span>
                </div>

                {/* Items */}
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col md:grid md:grid-cols-[2.5fr_1fr_1.2fr_1fr] items-center px-4 md:px-6 py-6 border-b border-gray-100 last:border-0"
                  >
                    {/* Product col */}
                    <div className="flex items-center gap-4 w-full md:w-auto">
                      <div className="relative w-20 h-20 md:w-[88px] md:h-[88px] bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] md:text-[11px] text-gray-400 uppercase tracking-widest">
                          {item.category}
                        </span>
                        <span className="text-sm md:text-[15px] font-bold text-[#1a1a1a] leading-tight">
                          {item.name}
                        </span>
                        <span
                          onClick={() => removeFromCart(item.id)}
                          className="text-[11px] text-red-400 hover:text-red-600 cursor-pointer mt-1"
                        >
                          Remove
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between w-full mt-6 md:mt-0 md:contents">
                      {/* Price col */}
                      <div className="md:text-center">
                        <span className="md:hidden text-[10px] text-gray-400 block uppercase mb-1">
                          Price
                        </span>
                        <span className="text-sm md:text-[14px] font-semibold text-[#1a1a1a]">
                          ${item.price.toFixed(2)}
                        </span>
                      </div>

                      {/* Quantity col */}
                      <div className="flex flex-col items-center">
                        <span className="md:hidden text-[10px] text-gray-400 block uppercase mb-1">
                          Quantity
                        </span>
                        <div className="flex items-center border border-gray-200 rounded bg-white overflow-hidden">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-gray-100 border-r border-gray-300"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-10 h-8 flex items-center justify-center text-[14px] font-semibold border-x border-gray-300">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-gray-100 border-l border-gray-300"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>

                      {/* Total col */}
                      <div className="text-right md:text-right">
                        <span className="md:hidden text-[10px] text-gray-400 block uppercase mb-1">
                          Subtotal
                        </span>
                        <span className="text-base md:text-[16px] font-black text-[#1565C0]">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Footer */}
                <div className="px-4 md:px-6 py-4 flex flex-col sm:flex-row gap-4 justify-between items-center bg-gray-50">
                  <Link
                    href="/"
                    className="text-[13px] text-[#1565C0] font-bold uppercase tracking-wider hover:underline"
                  >
                    ← Continue Shopping
                  </Link>
                  <span
                    onClick={clearCart}
                    className="text-[13px] text-red-400 hover:text-red-600 cursor-pointer font-semibold"
                  >
                    Clear Cart
                  </span>
                </div>
              </div>

              {/* RIGHT - Order Summary */}
              <div className="bg-white rounded-xl shadow-sm p-5 md:p-6 h-fit lg:sticky lg:top-8">
                <h2 className="text-lg md:text-[20px] font-black text-[#1a1a1a] mb-6 pb-4 border-b border-gray-100">
                  Order Summary
                </h2>

                {/* Summary rows */}
                <div className="flex flex-col gap-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-[14px] text-gray-500">Subtotal</span>
                    <span className="text-[14px] font-semibold text-[#1a1a1a]">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[14px] text-gray-500">Shipping</span>
                    <span className="text-[14px] font-semibold text-green-600">
                      Free
                    </span>
                  </div>
                  <div className="w-full h-px bg-gray-200" />
                  <div className="flex justify-between items-center">
                    <span className="text-[16px] font-black">Total</span>
                    <span className="text-[20px] font-black text-[#1565C0]">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Checkout button */}
                <button 
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full h-[52px] bg-[#1565C0] text-white text-[15px] font-black tracking-wide flex items-center justify-center gap-2 hover:bg-[#0D47A1] transition-colors mb-3 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <ShoppingBag size={18} /> {isCheckingOut ? "PROCESSING..." : "PROCEED TO CHECKOUT"}
                </button>

                {/* Payment row */}
                <div className="flex items-center justify-center gap-2 mt-4">
                  <span className="text-[11px] text-gray-400">We Accept:</span>
                  <div className="w-10 h-6 bg-gray-100 rounded flex items-center justify-center text-[10px] font-bold text-gray-500">
                    VISA
                  </div>
                  <div className="w-10 h-6 bg-gray-100 rounded flex items-center justify-center text-[10px] font-bold text-gray-500">
                    MC
                  </div>
                  <div className="w-10 h-6 bg-gray-100 rounded flex items-center justify-center text-[10px] font-bold text-gray-500">
                    PP
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

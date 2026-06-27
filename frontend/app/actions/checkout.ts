"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function placeOrder(cartItems: any[], totalAmount: number) {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "You must be logged in to place an order." };
  }

  if (!cartItems || cartItems.length === 0) {
    return { error: "Your cart is empty." };
  }

  try {
    const order = await prisma.order.create({
      data: {
        userId: session.user.id,
        amount: totalAmount,
        status: "Processing",
        items: {
          create: cartItems.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
    });

    return { success: true, orderId: order.id };
  } catch (error) {
    console.error("Order creation error:", error);
    return { error: "An error occurred while placing your order. Please try again." };
  }
}

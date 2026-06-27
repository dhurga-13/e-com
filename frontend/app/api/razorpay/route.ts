import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount } = body;

    if (!amount) {
      return NextResponse.json({ error: "Amount is required" }, { status: 400 });
    }

    // Check if we are using demo keys
    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (keyId === "rzp_test_demo_key" || !keyId) {
      // Mock order for demo purposes
      return NextResponse.json({
        id: "order_demo_" + Math.random().toString(36).substring(2, 15),
        amount: Math.round(amount * 100),
        currency: "INR",
      });
    }

    const razorpay = new Razorpay({
      key_id: keyId as string,
      key_secret: keySecret as string,
    });

    const options = {
      amount: Math.round(amount * 100), // amount in smallest currency unit
      currency: "INR",
      receipt: "receipt_" + Math.random().toString(36).substring(2, 15),
    };

    const order = await razorpay.orders.create(options);
    return NextResponse.json(order);
  } catch (error) {
    console.error("Razorpay error:", error);
    return NextResponse.json(
      { error: "Error creating Razorpay order" },
      { status: 500 }
    );
  }
}

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export const GET = auth(async function GET(req) {
  if (!req.auth?.user?.id) return Response.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const items = await prisma.cartItem.findMany({
      where: { userId: req.auth.user.id },
      include: { product: true }
    });
    return Response.json(items);
  } catch (error) {
    return Response.json({ error: "Internal Error" }, { status: 500 });
  }
});

export const POST = auth(async function POST(req) {
  if (!req.auth?.user?.id) return Response.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { productId, quantity = 1 } = await req.json();

    const existing = await prisma.cartItem.findUnique({
      where: {
        userId_productId: {
          userId: req.auth.user.id,
          productId
        }
      }
    });

    let item;
    if (existing) {
      item = await prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + quantity },
        include: { product: true }
      });
    } else {
      item = await prisma.cartItem.create({
        data: {
          userId: req.auth.user.id,
          productId,
          quantity
        },
        include: { product: true }
      });
    }

    return Response.json(item);
  } catch (error) {
    return Response.json({ error: "Internal Error" }, { status: 500 });
  }
});

export const PUT = auth(async function PUT(req) {
  if (!req.auth?.user?.id) return Response.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { productId, quantity } = await req.json();

    if (quantity <= 0) {
      await prisma.cartItem.delete({
        where: { userId_productId: { userId: req.auth.user.id, productId } }
      });
      return Response.json({ message: "Item removed" });
    }

    const item = await prisma.cartItem.update({
      where: { userId_productId: { userId: req.auth.user.id, productId } },
      data: { quantity },
      include: { product: true }
    });

    return Response.json(item);
  } catch (error) {
    return Response.json({ error: "Internal Error" }, { status: 500 });
  }
});

export const DELETE = auth(async function DELETE(req) {
  if (!req.auth?.user?.id) return Response.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const searchParams = req.nextUrl.searchParams;
    const productId = searchParams.get("productId");

    if (productId) {
      await prisma.cartItem.delete({
        where: { userId_productId: { userId: req.auth.user.id, productId } }
      });
    } else {
      await prisma.cartItem.deleteMany({
        where: { userId: req.auth.user.id }
      });
    }

    return Response.json({ message: "Item(s) removed" });
  } catch (error) {
    return Response.json({ error: "Internal Error" }, { status: 500 });
  }
});

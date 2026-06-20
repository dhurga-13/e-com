import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export const GET = auth(async function GET(req) {
  if (!req.auth?.user?.id) return Response.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const items = await prisma.wishlistItem.findMany({
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
    const { productId } = await req.json();

    const existing = await prisma.wishlistItem.findUnique({
      where: {
        userId_productId: {
          userId: req.auth.user.id,
          productId
        }
      }
    });

    if (existing) {
      return Response.json(existing);
    }

    const item = await prisma.wishlistItem.create({
      data: {
        userId: req.auth.user.id,
        productId,
      },
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
      await prisma.wishlistItem.delete({
        where: { userId_productId: { userId: req.auth.user.id, productId } }
      });
    } else {
      await prisma.wishlistItem.deleteMany({
        where: { userId: req.auth.user.id }
      });
    }

    return Response.json({ message: "Item(s) removed" });
  } catch (error) {
    return Response.json({ error: "Internal Error" }, { status: 500 });
  }
});

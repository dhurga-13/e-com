"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useSession } from "next-auth/react";
import { Product } from "@/lib/products";

type WishlistContextType = {
  items: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (id: string) => void;
  isWishlisted: (id: string) => boolean;
  totalItems: number;
  isLoading: boolean;
};

const WishlistContext = createContext<WishlistContextType | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const [items, setItems] = useState<Product[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load initial data
  useEffect(() => {
    if (status === "loading") return;

    if (session?.user) {
      fetch("/api/wishlist")
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setItems(data.map((d) => d.product));
          }
          setLoaded(true);
          setIsLoading(false);
        })
        .catch(() => {
          setLoaded(true);
          setIsLoading(false);
        });
    } else {
      const savedWishlist = localStorage.getItem("wishlist");
      if (savedWishlist) {
        setItems(JSON.parse(savedWishlist));
      }
      setLoaded(true);
      setIsLoading(false);
    }
  }, [session, status]);

  // Save guest wishlist to localStorage
  useEffect(() => {
    if (loaded && !session?.user) {
      localStorage.setItem("wishlist", JSON.stringify(items));
    }
  }, [items, loaded, session]);

  const addToWishlist = async (product: Product) => {
    if (session?.user) {
      const res = await fetch("/api/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id }),
      });
      if (res.ok) {
        setItems((prev) =>
          prev.find((i) => i.id === product.id) ? prev : [...prev, product],
        );
      }
    } else {
      setItems((prev) =>
        prev.find((i) => i.id === product.id) ? prev : [...prev, product],
      );
    }
  };

  const removeFromWishlist = async (id: string) => {
    if (session?.user) {
      await fetch(`/api/wishlist?productId=${id}`, { method: "DELETE" });
    }
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const isWishlisted = (id: string) => items.some((i) => i.id === id);
  const totalItems = items.length;

  return (
    <WishlistContext.Provider
      value={{
        items,
        addToWishlist,
        removeFromWishlist,
        isWishlisted,
        totalItems,
        isLoading,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}

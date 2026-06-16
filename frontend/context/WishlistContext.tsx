"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Product } from "@/lib/products";

type WishlistContextType = {
  items: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (id: string) => void;
  isWishlisted: (id: string) => boolean;
  totalItems: number;
};

const WishlistContext = createContext<WishlistContextType | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);

  // Load wishlist from localStorage on initial render
  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    if (savedWishlist) {
      setItems(JSON.parse(savedWishlist));
    }
  }, []);

  // Save wishlist to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(items));
  }, [items]);

  const addToWishlist = (product: Product) => {
    setItems((prev) =>
      prev.find((i) => i.id === product.id) ? prev : [...prev, product],
    );
  };

  const removeFromWishlist = (id: string) =>
    setItems((prev) => prev.filter((i) => i.id !== id));
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

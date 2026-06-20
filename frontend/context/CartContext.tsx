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

export type CartItem = Product & { quantity: number };

type CartContextType = {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isLoading: boolean;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const [items, setItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load initial data
  useEffect(() => {
    if (status === "loading") return;

    if (session?.user) {
      // Fetch from API
      fetch("/api/cart")
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            const formatted = data.map((d) => ({
              ...d.product,
              quantity: d.quantity,
            }));
            setItems(formatted);
          }
          setLoaded(true);
          setIsLoading(false);
        })
        .catch(() => {
          setLoaded(true);
          setIsLoading(false);
        });
    } else {
      // Load from localStorage
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
      setLoaded(true);
      setIsLoading(false);
    }
  }, [session, status]);

  // Save guest cart to localStorage
  useEffect(() => {
    if (loaded && !session?.user) {
      localStorage.setItem("cart", JSON.stringify(items));
    }
  }, [items, loaded, session]);

  const addToCart = async (product: Product) => {
    if (session?.user) {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id, quantity: 1 }),
      });
      if (res.ok) {
        setItems((prev) => {
          const existing = prev.find((i) => i.id === product.id);
          if (existing)
            return prev.map((i) =>
              i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
            );
          return [...prev, { ...product, quantity: 1 }];
        });
      }
    } else {
      setItems((prev) => {
        const existing = prev.find((i) => i.id === product.id);
        if (existing)
          return prev.map((i) =>
            i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
          );
        return [...prev, { ...product, quantity: 1 }];
      });
    }
  };

  const removeFromCart = async (id: string) => {
    if (session?.user) {
      await fetch(`/api/cart?productId=${id}`, { method: "DELETE" });
    }
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = async (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    
    if (session?.user) {
      await fetch("/api/cart", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: id, quantity }),
      });
    }
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity } : i)));
  };

  const clearCart = async () => {
    if (session?.user) {
      await fetch("/api/cart", { method: "DELETE" });
    }
    setItems([]);
  };

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

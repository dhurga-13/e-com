// ===== E-Com Type Definitions =====

export type { Product } from "@/lib/products";

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface NavLink {
  label: string;
  href: string;
  isActive?: boolean;
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

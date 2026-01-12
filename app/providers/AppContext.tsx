'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';

/* ---------------- TYPES ---------------- */

// Adjust this Product type if your product has more fields
export type Product = {
  id: number;
  title?: string;
  price?: number;
  image?: string;
};

type AppContextType = {
  favorites: number[];
  toggleFavorite: (id: number | string) => void;
  cartItems: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
};

/* ---------------- CONTEXT ---------------- */

const AppContext = createContext<AppContextType | null>(null);

/* ---------------- PROVIDER ---------------- */

type AppProviderProps = {
  children: ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage on client
  useEffect(() => {
    const savedFavs = localStorage.getItem('favorites-products');
    const savedCart = localStorage.getItem('cart-products');

    if (savedFavs) setFavorites(JSON.parse(savedFavs));
    if (savedCart) setCartItems(JSON.parse(savedCart));

    setIsHydrated(true);
  }, []);

  /* -------- FAVORITES (numbers) -------- */

  const toggleFavorite = (id: number | string) => {
    const productId = Number(id);

    setFavorites((prev) => {
      const updated = prev.includes(productId)
        ? prev.filter((item) => item !== productId)
        : [...prev, productId];

      localStorage.setItem(
        'favorites-products',
        JSON.stringify(updated)
      );
      return updated;
    });
  };

  /* -------- CART (objects) -------- */

  const addToCart = (product: Product) => {
    setCartItems((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) return prev;

      const updated = [...prev, product];
      localStorage.setItem(
        'cart-products',
        JSON.stringify(updated)
      );
      return updated;
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      localStorage.setItem(
        'cart-products',
        JSON.stringify(updated)
      );
      return updated;
    });
  };

  const value: AppContextType = {
    favorites,
    toggleFavorite,
    cartItems,
    addToCart,
    removeFromCart,
  };

  return (
    <AppContext.Provider value={value}>
      {/* Prevents hydration mismatch */}
      {isHydrated ? children : null}
    </AppContext.Provider>
  );
}

/* ---------------- HOOK ---------------- */

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used inside AppProvider');
  }
  return context;
};

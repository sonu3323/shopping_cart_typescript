import * as React from 'react';
import { createContext, ReactNode, useContext } from 'react';
import fetchData from '../data/apiData';
import { Product } from '../data/type';

interface ShoppingCartProviderProps {
  children: ReactNode;
}

interface CartItem {
  id: number;
  quantity: number;
  title: string;
  brand: string;
  category: string;
  images: string[];
  rating: number;
  price: number;
  thumbnail: string;
  stock: number;
  description: string;
}
interface ShoppingCartContext {
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  cartQuantity: number;
  cartItems: CartItem[];
  products: Product[];
}

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [cartItems, setCartItems] = React.useState<CartItem[]>([]);

  const [products, setProducts] = React.useState<Product[]>([]);

  React.useEffect(() => {
    fetchData().then((res) => {
      setProducts(res.data.products);
    });
  }, []);

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0,
  );

  const getItemQuantity = (id: number) => {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  };

  const increaseCartQuantity = (id: number) => {
    setCartItems((currentItem) => {

      console.log(currentItem.find((item) => item.id === id));

      if (currentItem.find((item) => item.id === id) == null) {
        return [
          ...currentItem,
          { ...products.find((item) => item.id === id), quantity: 1 },
        ];
      } else {
        return currentItem.map((item) => {
          if (item.id === id) {
            return {
              ...products.find((item) => item.id === id),
              quantity: item.quantity + 1,
            };
          } else {
            return item;
          }
        });
      }
    });
  };

  const decreaseCartQuantity = (id: number) => {
    setCartItems((currentItem) => {
      if (currentItem.find((item) => item.id === id)?.quantity === 1) {
        return currentItem.filter((item) => item.id !== id);
      } else {
        return currentItem.map((item) => {
          if (item.id === id) {
            return {
              ...products.find((item) => item.id === id),
              quantity: item.quantity - 1,
            };
          } else {
            return item;
          }
        });
      }
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems((currentItem) => {
      return currentItem.filter((item) => item.id !== id);
    });
  };

  console.log('DDD =>', cartItems);

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        cartItems,
        cartQuantity,
        products,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}

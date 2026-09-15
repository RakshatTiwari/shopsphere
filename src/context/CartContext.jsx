import { useCallback, useEffect, useMemo, useReducer } from "react";
import { CartContext } from "./cartContext";
import { readStorage, writeStorage } from "../utils/storage";

const CART_STORAGE_KEY = "cart";

const FREE_SHIPPING_THRESHOLD = 100;
const STANDARD_SHIPPING_COST = 9.99;
const TAX_RATE = 0.08;

const initialState = {
  items: [],
};

function getInitialState() {
  return readStorage(CART_STORAGE_KEY, initialState);
}

function roundCurrency(value) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id,
      );

      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) => {
            if (item.id !== action.payload.id) {
              return item;
            }

            return {
              ...item,
              quantity: Math.min(
                item.quantity + action.payload.quantity,
                item.stock,
              ),
            };
          }),
        };
      }

      return {
        ...state,
        items: [...state.items, action.payload],
      };
    }

    case "UPDATE_QUANTITY":
      return {
        ...state,
        items: state.items
          .map((item) => {
            if (item.id !== action.payload.id) {
              return item;
            }

            const quantity = Math.max(
              1,
              Math.min(action.payload.quantity, item.stock),
            );

            return {
              ...item,
              quantity,
            };
          })
          .filter((item) => item.quantity > 0),
      };

    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };

    case "CLEAR_CART":
      return initialState;

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(
    cartReducer,
    initialState,
    getInitialState,
  );

  useEffect(() => {
    writeStorage(CART_STORAGE_KEY, state);
  }, [state]);

  const addToCart = useCallback((product, quantity = 1) => {
    if (!product || product.stock <= 0) {
      return;
    }

    const safeQuantity = Math.max(1, Math.min(quantity, product.stock));

    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
        stock: product.stock,
        quantity: safeQuantity,
      },
    });
  }, []);

  const updateQuantity = useCallback((productId, quantity) => {
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: {
        id: productId,
        quantity,
      },
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    dispatch({
      type: "REMOVE_ITEM",
      payload: productId,
    });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({
      type: "CLEAR_CART",
    });
  }, []);

  const cartItemCount = useMemo(
    () => state.items.reduce((total, item) => total + item.quantity, 0),
    [state.items],
  );

  const cartSubtotal = useMemo(
    () =>
      roundCurrency(
        state.items.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        ),
      ),
    [state.items],
  );

  const shippingCost = useMemo(() => {
    if (cartSubtotal === 0) {
      return 0;
    }

    return cartSubtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_COST;
  }, [cartSubtotal]);

  const taxAmount = useMemo(
    () => roundCurrency(cartSubtotal * TAX_RATE),
    [cartSubtotal],
  );

  const cartTotal = useMemo(
    () => roundCurrency(cartSubtotal + shippingCost + taxAmount),
    [cartSubtotal, shippingCost, taxAmount],
  );

  const amountUntilFreeShipping = useMemo(
    () => roundCurrency(Math.max(0, FREE_SHIPPING_THRESHOLD - cartSubtotal)),
    [cartSubtotal],
  );

  const value = useMemo(
    () => ({
      items: state.items,
      cartItemCount,
      cartSubtotal,
      shippingCost,
      taxAmount,
      cartTotal,
      amountUntilFreeShipping,
      freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
    }),
    [
      state.items,
      cartItemCount,
      cartSubtotal,
      shippingCost,
      taxAmount,
      cartTotal,
      amountUntilFreeShipping,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

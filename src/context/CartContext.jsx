import { useMemo, useReducer } from "react";
import { CartContext } from "./cartContext";

const initialState = {
  items: [],
};

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
  const [state, dispatch] = useReducer(cartReducer, initialState);

  function addToCart(product, quantity = 1) {
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
  }

  function updateQuantity(productId, quantity) {
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: {
        id: productId,
        quantity,
      },
    });
  }

  function removeFromCart(productId) {
    dispatch({
      type: "REMOVE_ITEM",
      payload: productId,
    });
  }

  function clearCart() {
    dispatch({
      type: "CLEAR_CART",
    });
  }

  const cartItemCount = useMemo(
    () => state.items.reduce((total, item) => total + item.quantity, 0),
    [state.items],
  );

  const cartSubtotal = useMemo(
    () =>
      state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      ),
    [state.items],
  );

  const value = useMemo(
    () => ({
      items: state.items,
      cartItemCount,
      cartSubtotal,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
    }),
    [state.items, cartItemCount, cartSubtotal],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

import { useCallback, useEffect, useMemo, useReducer } from "react";
import { WishlistContext } from "./wishlistContext";
import { readStorage, writeStorage } from "../utils/storage";

const WISHLIST_STORAGE_KEY = "wishlist";

const initialState = {
  items: [],
};

function getInitialState() {
  return readStorage(WISHLIST_STORAGE_KEY, initialState);
}

function wishlistReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_ITEM": {
      const exists = state.items.some((item) => item.id === action.payload.id);

      if (exists) {
        return {
          ...state,
          items: state.items.filter((item) => item.id !== action.payload.id),
        };
      }

      return {
        ...state,
        items: [...state.items, action.payload],
      };
    }

    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };

    case "CLEAR_WISHLIST":
      return initialState;

    default:
      return state;
  }
}

export function WishlistProvider({ children }) {
  const [state, dispatch] = useReducer(
    wishlistReducer,
    initialState,
    getInitialState,
  );

  useEffect(() => {
    writeStorage(WISHLIST_STORAGE_KEY, state);
  }, [state]);

  const toggleWishlist = useCallback((product) => {
    if (!product) {
      return;
    }

    dispatch({
      type: "TOGGLE_ITEM",
      payload: {
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
        rating: product.rating,
        category: product.category,
        stock: product.stock,
      },
    });
  }, []);

  const removeFromWishlist = useCallback((productId) => {
    dispatch({
      type: "REMOVE_ITEM",
      payload: productId,
    });
  }, []);

  const clearWishlist = useCallback(() => {
    dispatch({
      type: "CLEAR_WISHLIST",
    });
  }, []);

  const isInWishlist = useCallback(
    (productId) => state.items.some((item) => item.id === productId),
    [state.items],
  );

  const wishlistItemCount = state.items.length;

  const value = useMemo(
    () => ({
      items: state.items,
      wishlistItemCount,
      toggleWishlist,
      removeFromWishlist,
      clearWishlist,
      isInWishlist,
    }),
    [
      state.items,
      wishlistItemCount,
      toggleWishlist,
      removeFromWishlist,
      clearWishlist,
      isInWishlist,
    ],
  );

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

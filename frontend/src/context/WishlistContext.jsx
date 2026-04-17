import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Create context
const WishlistContext = createContext();

// Initial state
const initialState = {
  wishlistItems: [],
  wishlistCount: 0
};

// Action types
const ADD_TO_WISHLIST = 'ADD_TO_WISHLIST';
const REMOVE_FROM_WISHLIST = 'REMOVE_FROM_WISHLIST';
const LOAD_WISHLIST = 'LOAD_WISHLIST';
const CLEAR_WISHLIST = 'CLEAR_WISHLIST';

// Reducer function
const wishlistReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_WISHLIST:
      const existingItem = state.wishlistItems.find(item => item.id === action.payload.id);
      if (existingItem) {
        return state; // Item already in wishlist
      }
      const newWishlistItems = [...state.wishlistItems, action.payload];
      localStorage.setItem('wishlist', JSON.stringify(newWishlistItems));
      return {
        ...state,
        wishlistItems: newWishlistItems,
        wishlistCount: newWishlistItems.length
      };
    
    case REMOVE_FROM_WISHLIST:
      const filteredItems = state.wishlistItems.filter(item => item.id !== action.payload);
      localStorage.setItem('wishlist', JSON.stringify(filteredItems));
      return {
        ...state,
        wishlistItems: filteredItems,
        wishlistCount: filteredItems.length
      };
    
    case LOAD_WISHLIST:
      return {
        ...state,
        wishlistItems: action.payload,
        wishlistCount: action.payload.length
      };
    
    case CLEAR_WISHLIST:
      localStorage.removeItem('wishlist');
      return {
        ...state,
        wishlistItems: [],
        wishlistCount: 0
      };
    
    default:
      return state;
  }
};

// Provider component
export const WishlistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, initialState);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      try {
        const wishlistItems = JSON.parse(savedWishlist);
        dispatch({ type: LOAD_WISHLIST, payload: wishlistItems });
      } catch (error) {
        // Error loading wishlist
      }
    }
  }, []);

  // Actions
  const addToWishlist = (product) => {
    dispatch({ type: ADD_TO_WISHLIST, payload: product });
  };

  const removeFromWishlist = (productId) => {
    dispatch({ type: REMOVE_FROM_WISHLIST, payload: productId });
  };

  const clearWishlist = () => {
    dispatch({ type: CLEAR_WISHLIST });
  };

  const isInWishlist = (productId) => {
    return state.wishlistItems.some(item => item.id === productId);
  };

  const getWishlistCount = () => {
    return state.wishlistCount;
  };

  const getWishlistItems = () => {
    return state.wishlistItems;
  };

  const value = {
    wishlistItems: state.wishlistItems,
    wishlistCount: state.wishlistCount,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    isInWishlist,
    getWishlistCount,
    getWishlistItems
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

// Custom hook to use the wishlist context
export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export default WishlistContext;

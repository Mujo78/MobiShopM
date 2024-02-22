import { createContext, useContext, useEffect, useReducer } from "react";
import { useCart } from "../features/Cart/useCart";
import { useDeleteCartItem } from "../features/Cart/useDeleteCartItem";

const CartContext = createContext();

const CART_ACTION_TYPES = {
  CART_ITEMS_START: "CART_START",
  CART_SUCCESS: "CART_SUCCESS",
  CART_FAILURE: "CART_FAILURE",
  CART_DELETE_SUCCESS: "CART_DELETE_SUCCESS",
};

const initialState = {
  cartItems: [],
  status: "start",
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case CART_ACTION_TYPES.CART_ITEMS_START:
      return { ...state, status: "pending" };
    case CART_ACTION_TYPES.CART_FAILURE:
      return { ...state, status: "failed", error: action.payload };
    case CART_ACTION_TYPES.CART_SUCCESS:
      return { ...state, cartItems: action.payload, status: "idle", error: "" };
    case CART_ACTION_TYPES.CART_DELETE_SUCCESS:
      const itemId = action.payload;
      return {
        ...state,
        cartItems: state.cartItems.filter((m) => m.id !== itemId),
        status: "idle",
        error: "",
      };
    default:
      throw new Error("Something went wrong, please try again later!");
  }
}

function CartProvider({ children }) {
  const [{ cartItems, status }, dispatch] = useReducer(reducer, initialState);

  const { data, isError, isFetching, error: cartError } = useCart();
  const { mutate } = useDeleteCartItem();

  useEffect(() => {
    async function fetchMyCart() {
      dispatch({ type: CART_ACTION_TYPES.CART_ITEMS_START });
      try {
        dispatch({ type: CART_ACTION_TYPES.CART_SUCCESS, payload: data });
      } catch (error) {
        dispatch({
          type: CART_ACTION_TYPES.CART_FAILURE,
          payload: cartError.message,
        });
      }
    }

    fetchMyCart();
  }, [data, isError, isFetching, cartError]);

  function deleteCartItem(itemId) {
    dispatch({ type: CART_ACTION_TYPES.CART_ITEMS_START });

    mutate(itemId, {
      onSuccess: () => {
        dispatch({
          type: CART_ACTION_TYPES.CART_DELETE_SUCCESS,
          payload: itemId,
        });
      },
      onError: () => {
        dispatch({
          type: CART_ACTION_TYPES.CART_FAILURE,
          payload: "Something went wrong, please try again later!",
        });
      },
    });
  }

  return (
    <CartContext.Provider
      value={{ cartItems, status, isError, deleteCartItem }}
    >
      {children}
    </CartContext.Provider>
  );
}

function useCartData() {
  const context = useContext(CartContext);
  if (!context)
    throw new Error("Something went wrong, please try again later!");

  return context;
}

export { CartProvider, useCartData };

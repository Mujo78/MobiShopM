import { createContext, useContext, useEffect, useReducer } from "react";
import { useDeleteCartItem } from "../features/Cart/useDeleteCartItem";
import { useAddToCart } from "../features/Cart/useAddToCart";
import { useUpdateCartItem } from "../features/Cart/useUpdateCartItem";
import { useOrderFromCart } from "../features/Cart/useOrderFromCart";
import { useCart } from "../features/Cart/useCart";

const CartContext = createContext();

const CART_ACTION_TYPES = {
  CART_ITEMS_START: "CART_START",
  CART_SUCCESS: "CART_SUCCESS",
  CART_FAILURE: "CART_FAILURE",
  CART_DELETE_SUCCESS: "CART_DELETE_SUCCESS",
  CART_ADD_SUCCESS: "CART_ADD_SUCCESS",
  CART_ITEM_UPDATED_SUCCESS: "CART_ITEM_UPDATE_SUCCESS",
  CART_ITEM_ORDER_SUCCESS: "CART_ITEM_ORDER_SUCCESS",
};

const initialState = {
  cartItems: [],
  total: 0,
  numOfItems: 0,
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
      return {
        ...state,
        cartItems: action.payload?.data,
        numOfItems: action.payload?.data?.length,
        total: action.payload?.total,
        status: "idle",
        error: "",
      };
    case CART_ACTION_TYPES.CART_DELETE_SUCCESS:
      const cartItem = state.cartItems.find((m) => m.id === action.payload);
      return {
        ...state,
        cartItems: state.cartItems.filter((m) => m.id !== cartItem.id),
        total: state.total - cartItem?.total,
        numOfItems: state.numOfItems - 1,
        status: "idle",
        error: "",
      };
    case CART_ACTION_TYPES.CART_ADD_SUCCESS:
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
        total: state.total + action.payload.total,
        numOfItems: state.numOfItems + 1,
        status: "idle",
        error: "",
      };
    case CART_ACTION_TYPES.CART_ITEM_UPDATED_SUCCESS:
      const updatedItems = state.cartItems.map((item) => {
        if (item.id === action.payload?.itemId) {
          return {
            ...item,
            quantity: action.payload?.quantity,
            total: item.total + action.payload?.total,
          };
        }
        return item;
      });

      return {
        ...state,
        cartItems: updatedItems,
        total: state.total + action.payload?.total,
        status: "idle",
        error: "",
      };
    case CART_ACTION_TYPES.CART_ITEM_ORDER_SUCCESS:
      const foundedCartItem = state.cartItems.find(
        (m) => m.id === action.payload.id
      );
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.id !== foundedCartItem.id
        ),
        total: state.total - action.payload.total,
        numOfItems: state.numOfItems - 1,
        status: "idle",
        error: "",
      };

    default:
      throw new Error("Something went wrong, please try again later!");
  }
}

function CartProvider({ children }) {
  const [{ cartItems, status, numOfItems, total }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const { data, isFetching, isError, isFetched } = useCart();
  const { mutate: addToCartFn } = useAddToCart();
  const { mutate: updateCartItemFn } = useUpdateCartItem();
  const { mutate: buyFromCartFn } = useOrderFromCart();
  const { mutate } = useDeleteCartItem();

  useEffect(() => {
    if (isFetching) {
      dispatch({ type: CART_ACTION_TYPES.CART_ITEMS_START });
    }
    try {
      if (isFetched && !isError) {
        dispatch({ type: CART_ACTION_TYPES.CART_SUCCESS, payload: data });
      }
    } catch (error) {
      dispatch({
        type: CART_ACTION_TYPES.CART_FAILURE,
        payload: error.message,
      });
    }
  }, [data, isError, isFetched, isFetching]);

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

  function addItemToCart(mobileId, quantity, additionalFn) {
    dispatch({ type: CART_ACTION_TYPES.CART_ITEMS_START });
    addToCartFn(
      { mobileId, quantity },
      {
        onSuccess: (data) => {
          dispatch({
            type: CART_ACTION_TYPES.CART_ADD_SUCCESS,
            payload: data,
          });
          if (additionalFn) {
            additionalFn();
          }
        },
        onError: () => {
          dispatch({
            type: CART_ACTION_TYPES.CART_FAILURE,
            payload: "Something went wrong, please try again later!",
          });
        },
      }
    );
  }

  function orderCartItemFn(itemId, payment_info, additionalFn) {
    dispatch({ type: CART_ACTION_TYPES.CART_ITEMS_START });
    buyFromCartFn(
      { itemId, payment_info },
      {
        onSuccess: (data) => {
          dispatch({
            type: CART_ACTION_TYPES.CART_ITEM_ORDER_SUCCESS,
            payload: data,
          });
          if (additionalFn) {
            additionalFn();
          }
        },
        onError: () => {
          dispatch({
            type: CART_ACTION_TYPES.CART_FAILURE,
            payload: "Something went wrong, please try again later!",
          });
        },
      }
    );
  }

  function updateCartItem(itemId, quantity) {
    dispatch({ type: CART_ACTION_TYPES.CART_ITEMS_START });
    updateCartItemFn(
      { itemId, quantity },
      {
        onSuccess: (data) => {
          dispatch({
            type: CART_ACTION_TYPES.CART_ITEM_UPDATED_SUCCESS,
            payload: { total: data.total, itemId, quantity },
          });
        },
        onError: () => {
          dispatch({
            type: CART_ACTION_TYPES.CART_FAILURE,
            payload: "Something went wrong, please try again later!",
          });
        },
      }
    );
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        status,
        isError,
        numOfItems,
        deleteCartItem,
        addItemToCart,
        updateCartItem,
        orderCartItemFn,
        total,
      }}
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

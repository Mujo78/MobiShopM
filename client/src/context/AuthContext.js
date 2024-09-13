import { createContext, useContext, useReducer } from "react";
import { userLogin } from "../features/User/api";

const AuthContext = createContext();

const AUTH_ACTION_TYPES = {
  LOGIN_START: "LOGIN_START",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAILURE: "LOGIN_FAILURE",
  LOGOUT: "LOGOUT",
  USER_INFO: "USER INFO CHANGE",
};

const userStorage = localStorage.getItem("user");

const initialState = {
  user: userStorage ? JSON.parse(userStorage) : null,
  status: "start",
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case AUTH_ACTION_TYPES.LOGIN_START:
      return { ...state, status: "pending" };
    case AUTH_ACTION_TYPES.LOGIN_FAILURE:
      return { ...state, status: "failed", error: action.payload };
    case AUTH_ACTION_TYPES.LOGIN_SUCCESS:
      return { ...state, user: action.payload, status: "idle", error: "" };
    case AUTH_ACTION_TYPES.LOGOUT:
      return { ...state, user: null };
    case AUTH_ACTION_TYPES.USER_INFO:
      const newState = state.user
        ? { ...state, user: { ...state.user, username: action.payload } }
        : state;
      localStorage.setItem("user", JSON.stringify(newState.user));
      return newState;
    default:
      throw new Error("Something went wrong, please try again latter!");
  }
}

function AuthProvider({ children }) {
  const [{ user, status, error }, dispatch] = useReducer(reducer, initialState);

  async function login(loginData) {
    dispatch({ type: AUTH_ACTION_TYPES.LOGIN_START });
    try {
      const user = await userLogin(loginData);

      dispatch({ type: AUTH_ACTION_TYPES.LOGIN_SUCCESS, payload: user });
      localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      dispatch({
        type: AUTH_ACTION_TYPES.LOGIN_FAILURE,
        payload: error,
      });
    }
  }

  function logout() {
    dispatch({ type: AUTH_ACTION_TYPES.LOGOUT });
    localStorage.removeItem("user");
  }

  function changeMyUsernameFn(value) {
    dispatch({ type: AUTH_ACTION_TYPES.USER_INFO, payload: value });
  }

  return (
    <AuthContext.Provider
      value={{ user, status, error, login, logout, changeMyUsernameFn }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("Something went wrong, please try again latter!");
  }

  return context;
}

export { AuthProvider, useAuth };

import { createContext, useContext, useReducer } from "react";
import { userLogin } from "../features/User/api";

const AuthContext = createContext();

const AUTH_ACTION_TYPES = {
  LOGIN_START: "LOGIN_START",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAILURE: "LOGIN_FAILURE",
  LOGOUT: "LOGOUT",
};

const initialState = {
  user: null,
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
      return initialState;
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
      console.log(typeof user);
      dispatch({ type: AUTH_ACTION_TYPES.LOGIN_SUCCESS, payload: user });
      localStorage.setItem("user", user);
    } catch (error) {
      dispatch({
        type: AUTH_ACTION_TYPES.LOGIN_FAILURE,
        payload: error.response.data,
      });
    }
  }

  function logout() {
    dispatch({ type: AUTH_ACTION_TYPES.LOGOUT });
    localStorage.setItem("user", user);
  }

  return (
    <AuthContext.Provider value={{ user, status, error, login, logout }}>
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

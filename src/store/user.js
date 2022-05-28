import { createSlice } from "@reduxjs/toolkit";
import { setUserLocal, removeUserLocal } from "core/localStore";
import { pushToast } from "components/Toast";
import http from "core/services/httpService";
import { USER_ROLE } from "core/constants";
// import { useHistory } from "react-router";
// Slice

const initialUser = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const slice = createSlice({
  name: "user",
  initialState: {
    user: initialUser,
    loading: false
  },
  reducers: {
    loginSuccess: (state, action) => {
      const { payload } = action;

      state.user = payload?.user;
      setUserLocal(payload?.token, payload?.user);

      if (payload?.rememberMe?.isRemember) {
        localStorage.setItem("rememberMe", JSON.stringify(payload?.rememberMe));
      } else {
        localStorage.removeItem("rememberMe");
      }

      if (payload?.user?.role === USER_ROLE.ADMIN) {
        window.location.href = "/manage-merchants";
      }
    },
    logoutSuccess: (state) => {
      state.user = null;
      removeUserLocal();
      window.location.href = "/login";
    },
    setLoading: (state, action) => {
      const { payload } = action;
      state.loading = payload.loading;
    },
    setHasProfile: (state, action) => {
      state.user.isProfileCreated = action.payload;
    }
  }
});

export default slice.reducer;

// Actions

export const { loginSuccess, logoutSuccess, setLoading, setHasProfile } =
  slice.actions;

export const login = (values) => async (dispatch) => {
  try {
    dispatch(setLoading({ loading: true }));
    // const paramEmail = values.email;
    // const arrEmail = paramEmail.split("@");
    // const emailLogin = arrEmail[0].split(".").join("") + "@" + arrEmail[1];
    const data = await http.post("/api/auth/login", {
      email: values.email,
      password: values.password
    });

    let user = {
      ...data.data
    };

    const token = data.token || false;

    const rememberMe = {
      isRemember: values.isRemember,
      email: values.email,
      password: values.password
    };

    dispatch(setLoading({ loading: false }));

    if (!token) {
      pushToast("error", data?.message);
    } else if (user?.role === USER_ROLE.ADMIN) {
      dispatch(loginSuccess({ user, token, rememberMe }));
    }
  } catch (e) {
    dispatch(setLoading({ loading: false }));
    pushToast("error", e.message);

    if (e.message === "Please confirm token!") {
      window.location.href = "/verify-email";
    }

    return console.error(e.message);
  }
};

export const logout = () => async (dispatch) => {
  try {
    // await api.post('/api/auth/logout/')
    return dispatch(logoutSuccess());
  } catch (e) {
    return console.error(e.message);
  }
};

export const requestResetPassword = (values) => async (dispatch) => {
  try {
    dispatch(setLoading({ loading: true }));

    const data = await http.post("/api/auth/forgot", {
      email: values.email
    });

    const success = data.success;

    dispatch(setLoading({ loading: false }));

    if (success) {
      pushToast("success", "Check your email");

      // window.location.href = "/";
    }
  } catch (e) {
    dispatch(setLoading({ loading: false }));
    pushToast("error", e.message);

    return;
  }
};

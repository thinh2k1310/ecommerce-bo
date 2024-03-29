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
        window.location.href = "/summary";
      } else {
        window.location.href = "/reset-password";
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
    const data = await http.post("api/auth/login", {
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
    } else if (
      user?.role === USER_ROLE.ADMIN ||
      user?.role === "ROLE_MODERATOR"
    ) {
      dispatch(loginSuccess({ user, token, rememberMe }));
    } else if (user?.role !== USER_ROLE.ADMIN) {
      pushToast("error", "No access at here");
    }
  } catch (e) {
    dispatch(setLoading({ loading: false }));
    pushToast("error", e.message);

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

    const data = await http.post("/api/auth/password/forgot", {
      email: values.email
    });

    const success = data.success;

    dispatch(setLoading({ loading: false }));

    if (success) {
      localStorage.setItem("requestedResetEmail", values.email);
      window.location.href = "/forgot-password-enter-otp";
    } else {
      pushToast("error", data?.message);
    }
  } catch (e) {
    dispatch(setLoading({ loading: false }));
    pushToast("error", e.message);

    return;
  }
};

export const confirmResetPasswordOtp = (values) => async (dispatch) => {
  try {
    dispatch(setLoading({ loading: true }));
    const data = await http.put("/api/auth/validate", {
      email: values.email,
      OTP: values.otp,
      isUser: true
    });

    const success = data.success;

    dispatch(setLoading({ loading: false }));

    if (success) {
      window.location.href = "/forgot-password-enter-new-password";
    } else {
      pushToast("error", data?.message);
    }
  } catch (e) {
    dispatch(setLoading({ loading: false }));
    pushToast("error", e.message);

    return;
  }
};

export const resetPassword = (values) => async (dispatch) => {
  try {
    dispatch(setLoading({ loading: true }));
    const data = await http.put(`/api/auth/password/reset`, {
      password: values.password,
      email: values.email
    });

    const success = data.success;

    dispatch(setLoading({ loading: false }));

    if (success) {
      localStorage.removeItem("requestedResetEmail");
      pushToast("success", data?.message, {
        onClose: () => {
          window.location.href = "/login";
        },
        hideProgressBar: false
      });
    } else {
      pushToast("error", data?.message);
    }
  } catch (e) {
    dispatch(setLoading({ loading: false }));
    pushToast("error", e?.error);

    return;
  }
};

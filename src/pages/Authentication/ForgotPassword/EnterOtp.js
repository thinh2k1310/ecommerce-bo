// /*eslint-disable*/
import React from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import AuthLayout from "layout/AuthLayout/AuthLayout";
import "./EnterOtp.scss";
import { useDispatch } from "react-redux";
import { confirmResetPasswordOtp } from "store/user";

function EnterOtp() {
  const dispatch = useDispatch();
  const history = useHistory();
  const requestedResetEmail = localStorage.getItem("requestedResetEmail");
  const formik = useFormik({
    initialValues: {
      otp: "",
      email: requestedResetEmail
    },
    validationSchema: Yup.object({
      otp: Yup.string().required("Required!")
    }),
    onSubmit: (values) => {
      dispatch(confirmResetPasswordOtp(values));
    }
  });
  const { values, errors } = formik;
  const backToLogin = () => {
    history.push("/");
  };

  if (!requestedResetEmail) {
    history.push("/");
    return null;
  }

  return (
    <AuthLayout>
      <div className="enter-otp-wrapper">
        <div onClick={backToLogin} className="enter-otp-back-btn"></div>
        <div className="enter-otp-main">
          <div className="enter-otp-title">Enter your OTP</div>
          <form className="enter-otp-form-main" onSubmit={formik.handleSubmit}>
            <div className="enter-otp-form-group">
              <div className="enter-otp-form-hint">
                You should be receiving your One Time Password (OTP) on your
                entered email. To continue, please enter your OTP and click on
                on &quot;Proceed&quot;.
              </div>
              <input
                type="text"
                className="enter-otp-form-input"
                name="otp"
                value={values.otp}
                onChange={formik.handleChange}
              />
              {errors.otp && <p className="errors">{errors.email}</p>}
            </div>
            <button type="submit" className="enter-otp-btn-submit">
              Proceed
            </button>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
}

export default EnterOtp;

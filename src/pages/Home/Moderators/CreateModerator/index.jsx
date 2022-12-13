/*eslint-disable*/
import Loading from "components/Loading/Loading";
import { pushToast } from "components/Toast";
import http from "core/services/httpService";
import useFetchCateNoSub from "hook/useFetchCateNoSub";
import MainLayout from "layout/MainLayout/MainLayout";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./CreateMerchant.scss";
import Select from "react-select";

export default function CreateMerchant() {
  const history = useHistory();
  const [dataSubmit, setDataSubmit] = useState({
    firstName: "",
    lastName: "",
    email: ""
  });
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = () => {
    if (dataSubmit.firstName === "" || dataSubmit.lastName === "" || dataSubmit.email === "") {
        pushToast("error", "Please fill all fields");
        return;
    }

    setIsLoading(true);
    http
      .post("/api/moderators/", { ...dataSubmit })
      .then((response) => {
        pushToast("success", response.message);
        setIsLoading(false);
        history.push("/moderators");
      })
      .catch((error) => {
        pushToast("error", error.message);
        setIsLoading(false);
      });
  };
  if (isLoading) {
    return <Loading />;
  }

  return (
    <MainLayout>
      <div className="edit-merchant">
        <div className="edit-merchant-top">
          <h3>Add new Moderator</h3>
          <button
            className="btn btn-primary save"
            onClick={() => handleSubmit()}
          >
            Save
          </button>
        </div>
        <div className="edit-merchant-body">
          <div className="edit-merchant-body-item">
            <h6 style={{ marginLeft: "5px" }}>First Name</h6>
            <input
              placeholder={"Enter first name"}
              value={dataSubmit.name}
              onChange={(e) =>
                setDataSubmit({ ...dataSubmit, firstName: e.target.value })
              }
            ></input>
          </div>
          <div className="edit-merchant-body-item">
            <h6 style={{ marginLeft: "5px" }}>Last Name</h6>
            <input
              placeholder={"Enter last name"}
              value={dataSubmit.lastName}
              onChange={(e) =>
                setDataSubmit({ ...dataSubmit, lastName: e.target.value })
              }
            ></input>
          </div>
          <div className="edit-merchant-body-item">
            <h6 style={{ marginLeft: "5px" }}>Email</h6>
            <input
              placeholder={"Enter Email"}
              value={dataSubmit.email}
              onChange={(e) =>
                setDataSubmit({ ...dataSubmit, email: e.target.value })
              }
            ></input>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

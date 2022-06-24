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
  const [data] = useFetchCateNoSub();
  const [options, setOptions] = useState([
    { value: "chocolate", label: "Chocolate" }
  ]);
  const history = useHistory();
  const [dataSubmit, setDataSubmit] = useState({
    name: "",
    business: "",
    phoneNumber: "",
    email: "",
    categories: [{ _id: "" }]
  });
  useEffect(() => {
    setOptions(
      data?.map((cate) => {
        return { value: cate._id, label: cate.name };
      })
    );
  }, [data]);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleCate = (values) => {
    setDataSubmit({
      ...dataSubmit,
      categories: values.map((value) => value.value)
    });
  };

  const handleSubmit = () => {
    if (
      dataSubmit.business === "" ||
      dataSubmit.categories === "" ||
      dataSubmit.email === "" ||
      dataSubmit.name === ""
    ) {
      return;
    }

    setIsLoading(true);
    http
      .post("/api/merchant/add", { ...dataSubmit })
      .then((response) => {
        pushToast("success", response.message);
        setIsLoading(false);
        history.push("/manage-merchants");
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
          <h3>Create Merchant</h3>
          <button
            className="btn btn-primary save"
            onClick={() => handleSubmit()}
          >
            Save
          </button>
        </div>
        <div className="edit-merchant-body">
          <div className="edit-merchant-body-item">
            <h6 style={{ marginLeft: "5px" }}>Name</h6>
            <input
              placeholder={"Enter name merchant"}
              value={dataSubmit.name}
              onChange={(e) =>
                setDataSubmit({ ...dataSubmit, name: e.target.value })
              }
            ></input>
            <span style={{ color: "red" }}>
              {dataSubmit.name === "" && "name is requied"}
            </span>
          </div>
          <div className="edit-merchant-body-item">
            <h6 style={{ marginLeft: "5px" }}>Business</h6>
            <input
              placeholder={"Enter business merchant"}
              value={dataSubmit.business}
              onChange={(e) =>
                setDataSubmit({ ...dataSubmit, business: e.target.value })
              }
            ></input>
            <span style={{ color: "red" }}>
              {dataSubmit.name === "" && "business is requied"}
            </span>
          </div>
          <div className="edit-merchant-body-item">
            <h6 style={{ marginLeft: "5px" }}>Phone Number</h6>
            <input
              placeholder={"Enter Phone Number"}
              value={dataSubmit.phoneNumber}
              onChange={(e) =>
                setDataSubmit({ ...dataSubmit, phoneNumber: e.target.value })
              }
            ></input>
            <span style={{ color: "red" }}>
              {dataSubmit.phoneNumber === "" && "Phone Number is requied"}
            </span>
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
            <span style={{ color: "red" }}>
              {dataSubmit.email === "" && "Email is requied"}
            </span>
          </div>
        </div>
        <div className="edit-merchant-body">
          <h6 style={{ marginLeft: "5px" }}>Category</h6>
          <Select isMulti options={options} onChange={handleCate} />
        </div>
      </div>
    </MainLayout>
  );
}

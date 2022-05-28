import Loading from "components/Loading/Loading";
import { pushToast } from "components/Toast";
import http from "core/services/httpService";
import useFetchCateNoSub from "hook/useFetchCateNoSub";
import MainLayout from "layout/MainLayout/MainLayout";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./CreateMerchant.scss";

export default function CreateMerchant() {
  const [data] = useFetchCateNoSub();
  const history = useHistory();
  const [dataSubmit, setDataSubmit] = useState({
    name: "",
    business: "",
    phoneNumber: "",
    email: "",
    categories: [{ _id: "" }]
  });
  const [cates, setCates] = useState([
    { title: "Category 1", placeholder: "Category 1" }
  ]);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleCate = () => {
    console.log(dataSubmit?.categories[dataSubmit?.categories.length - 1]);
    const temp = [...cates];
    if (dataSubmit?.categories[dataSubmit?.categories.length - 1]._id === "") {
      return;
    }
    temp.push({
      title: `Category ${cates.length + 1}`,
      placeholder: `Category ${cates.length + 1}`
    });
    setCates(temp);
    setDataSubmit({
      ...dataSubmit,
      categories: [...dataSubmit.categories, {}]
    });
  };

  const handleListCate = (e, index) => {
    const temp = [...dataSubmit.categories];
    console.log(temp);
    temp[index]._id = e.target.value;
    setDataSubmit({ ...dataSubmit, categories: temp });
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
          {cates.map((fea, i) => (
            <div key={i} className="select-ctn">
              <span style={{ marginLeft: "5px", marginBottom: "3px" }}>
                {fea.title}
              </span>
              <select
                value={dataSubmit.categories[i]?._id}
                className="custom-select"
                onChange={(e) => handleListCate(e, i)}
              >
                {data?.map((cate, index) => (
                  <option value={cate._id} key={index}>
                    {cate.name}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
        <button
          className="btn btn-primary add-cate"
          onClick={() => handleCate()}
        >
          Add Category
        </button>
      </div>
    </MainLayout>
  );
}

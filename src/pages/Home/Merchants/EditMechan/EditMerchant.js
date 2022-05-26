/* eslint-disable*/
import MainLayout from "layout/MainLayout/MainLayout";
import React from "react";
import "./EditMerchant.scss";

const feature = [
  { title: "Feature1", placeholder: "Placeholder1" },
  { title: "Feature2", placeholder: "Placeholder2" },
  { title: "Feature3", placeholder: "Placeholder3" },
  { title: "Feature4", placeholder: "Placeholder4" },
  { title: "Feature5", placeholder: "Placeholder5" },
  { title: "Feature6", placeholder: "Placeholder6" }
];

export default function EditMerchant() {
  return (
    <MainLayout>
      <div className="edit-merchant">
        <div className="edit-merchant-top">
          <h3>Edit Merchant</h3>
          <button className="btn btn-primary save">Save</button>
        </div>
        <div className="edit-merchant-body">
          {feature.map((fea) => (
            <FeatureInput title={fea.title} placeholder={fea.placeholder} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
}

const FeatureInput = (props) => {
  return (
    <div className="edit-merchant-body-item">
      <h6>{props.title}</h6>
      <input placeholder={props.placeholder}></input>
    </div>
  );
};

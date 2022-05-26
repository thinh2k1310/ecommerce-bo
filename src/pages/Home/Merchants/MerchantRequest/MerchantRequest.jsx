// /* eslint-disable*/
import MainLayout from "layout/MainLayout/MainLayout";
import { React } from "react";
import { Table } from "reactstrap";
import "./MerchantRequest.scss";

const merchantRequests = [
  {
    _id: "628f829df99e13a219591a59",
    name: "Thinh",
    email: "thinh2k@gmail.com",
    categories: ["625bc06bf42fb72c316359b9", "625bcf4c62af52179722688e"],
    business: "test",
    isActive: false,
    status: "Waiting Approval",
    created: "2022-05-26T13:37:33.617Z",
    slug: "thinh",
    __v: 0
  },
  {
    _id: "628f829df99e13a219591a59",
    name: "Thinh",
    email: "thinh2k@gmail.com",
    categories: ["625bc06bf42fb72c316359b9", "625bcf4c62af52179722688e"],
    business: "test",
    isActive: false,
    status: "Waiting Approval",
    created: "2022-05-26T13:37:33.617Z",
    slug: "thinh",
    __v: 0
  },
  {
    _id: "628f829df99e13a219591a59",
    name: "Thinh",
    email: "thinh2k@gmail.com",
    categories: ["625bc06bf42fb72c316359b9", "625bcf4c62af52179722688e"],
    business: "test",
    isActive: false,
    status: "Waiting Approval",
    created: "2022-05-26T13:37:33.617Z",
    slug: "thinh",
    __v: 0
  },
  {
    _id: "628f829df99e13a219591a59",
    name: "Thinh",
    email: "thinh2k@gmail.com",
    categories: ["625bc06bf42fb72c316359b9", "625bcf4c62af52179722688e"],
    business: "test",
    isActive: false,
    status: "Waiting Approval",
    created: "2022-05-26T13:37:33.617Z",
    slug: "thinh",
    __v: 0
  },
  {
    _id: "628f829df99e13a219591a59",
    name: "Thinh",
    email: "thinh2k@gmail.com",
    categories: ["625bc06bf42fb72c316359b9", "625bcf4c62af52179722688e"],
    business: "test",
    isActive: false,
    status: "Waiting Approval",
    created: "2022-05-26T13:37:33.617Z",
    slug: "thinh",
    __v: 0
  },
  {
    _id: "628f829df99e13a219591a59",
    name: "Thinh",
    email: "thinh2k@gmail.com",
    categories: ["625bc06bf42fb72c316359b9", "625bcf4c62af52179722688e"],
    business: "test",
    isActive: false,
    status: "Waiting Approval",
    created: "2022-05-26T13:37:33.617Z",
    slug: "thinh",
    __v: 0
  }
];

const style = (active) => {
  return active
    ? { color: "blue", fontWeight: "bold", textAlign: "center" }
    : { color: "red", fontWeight: "bold", textAlign: "center" };
};

function MerchantRequest() {
  let noMerchant = 0;

  const tableMerchantRequest = merchantRequests.map(
    (MerchantRequest, index) => {
      return (
        <tr key={index}>
          <th scope="row" style={{ textAlign: "center" }}>
            {++noMerchant}
          </th>
          <td>{MerchantRequest._id}</td>
          <td>{MerchantRequest.name}</td>
          <td>{MerchantRequest.email}</td>
          <td style={style(MerchantRequest.isActive)}>
            {MerchantRequest.isActive ? "Active" : "Block"}
          </td>
          <td style={{ textAlign: "center" }}>{MerchantRequest.status}</td>
          <td>
            <button
              className="btn btn-success"
              onClick={() => history.push("/manage-merchants-edit")}
            >
              Approve
            </button>
            &nbsp;&nbsp;&nbsp;
            <button className="btn btn-danger">Reject</button>
          </td>
        </tr>
      );
    }
  );

  return (
    <MainLayout>
      <div className="overview-category">
        <h2>Merchant Request</h2>
        <div className="main">
          <Table bordered>
            <thead>
              <tr style={{ backgroundColor: "#0B79C1", color: "#fff" }}>
                <th>No</th>
                <th>ID</th>
                <th>Merchant Name</th>
                <th>Email</th>
                <th>isActive</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{tableMerchantRequest}</tbody>
          </Table>
        </div>
      </div>
    </MainLayout>
  );
}

export default MerchantRequest;

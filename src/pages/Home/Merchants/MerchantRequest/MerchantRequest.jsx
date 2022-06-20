// /* eslint-disable*/
import useFetchMerchantRequests from "hook/useFetchMerchantRequest";
import useSetStateMerchantRequest from "hook/useSetStateMerchantRequest";
import MainLayout from "layout/MainLayout/MainLayout";
import { React, useEffect } from "react";
import { Table } from "reactstrap";
import "./MerchantRequest.scss";

// const style = (active) => {
//   return active
//     ? { color: "blue", fontWeight: "bold", textAlign: "center" }
//     : { color: "red", fontWeight: "bold", textAlign: "center" };
// };

function MerchantRequest() {
  const [data, getMerchantRequests] = useFetchMerchantRequests();
  const [setStateMerchantRequest, , reload] = useSetStateMerchantRequest();

  useEffect(() => {
    getMerchantRequests();
  }, [reload]);

  const tableMerchantRequest = data.map((merchantRequest, index) => {
    return (
      <tr key={index}>
        <th scope="row" style={{ textAlign: "center" }}>
          {index + 1}
        </th>
        <td>{merchantRequest._id}</td>
        <td>{merchantRequest.name}</td>
        <td>{merchantRequest.email}</td>
        {/* <td style={style(merchantRequest.isActive)}>
          {merchantRequest.isActive ? "Active" : "Block"}
        </td> */}
        <td style={{ textAlign: "center" }}>{merchantRequest.status}</td>
        <td>
          <button
            className="btn btn-success"
            onClick={() => setStateMerchantRequest(true, merchantRequest._id)}
          >
            Approve
          </button>
          &nbsp;&nbsp;&nbsp;
          <button
            className="btn btn-danger"
            onClick={() => setStateMerchantRequest(false, MerchantRequest._id)}
          >
            Reject
          </button>
        </td>
      </tr>
    );
  });

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
                {/* <th>isActive</th> */}
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

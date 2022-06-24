import MainLayout from "layout/MainLayout/MainLayout";
import { React, useEffect } from "react";
import { Table } from "reactstrap";
import "./Merchants.scss";
import useFetchMerchants from "hook/useFetchMerchants";
import useSetStatusMerchant from "hook/useSetStatusMerchant";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const style = (active) => {
  return active
    ? { color: "blue", fontWeight: "bold", textAlign: "center" }
    : { color: "red", fontWeight: "bold", textAlign: "center" };
};

function Merchant() {
  const [data, getMerchants] = useFetchMerchants();
  const [setStatusMerchants, , reload] = useSetStatusMerchant();
  const history = useHistory();

  useEffect(() => {
    getMerchants();
  }, [reload]);

  const tableMerchant = data?.map((merchant, index) => {
    return (
      <tr key={index}>
        <th scope="row" style={{ textAlign: "center" }}>
          {index + 1}
        </th>
        <td>{merchant.name}</td>
        <td>{merchant.email}</td>
        <td>{merchant.phoneNumber}</td>
        <td style={style(merchant.isActive)}>
          {merchant.isActive ? "Active" : "DeActivate"}
        </td>
        <td style={{ textAlign: "center", color: "blue", fontWeight: "bold" }}>
          {merchant.categories}
        </td>
        <td>
          <button
            className="btn btn-primary"
            disabled={merchant.isActive}
            onClick={() => setStatusMerchants(merchant.isActive, merchant._id)}
          >
            Active
          </button>
          &nbsp;&nbsp;&nbsp;
          <button
            className="btn btn-warning"
            disabled={!merchant.isActive}
            onClick={() => setStatusMerchants(merchant.isActive, merchant._id)}
          >
            DeActivate
          </button>
        </td>
      </tr>
    );
  });

  return (
    <MainLayout>
      <div className="overview-category">
        <div className="merchant-header">
          <h2>Manage Merchant</h2>
          <div>
            <Button
              className="btn-success"
              onClick={() => history.push("/manage-merchants-create")}
            >
              Add Merchant
            </Button>
          </div>
        </div>

        <div className="main">
          <Table bordered>
            <thead>
              <tr style={{ backgroundColor: "#0B79C1", color: "#fff" }}>
                <th>ID</th>
                <th>Merchant Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Is Active</th>
                <th>Categories</th>
                <th style={{ width: "250px" }}>Action</th>
              </tr>
            </thead>
            <tbody>{tableMerchant}</tbody>
          </Table>
        </div>
      </div>
    </MainLayout>
  );
}

export default Merchant;

import MainLayout from "layout/MainLayout/MainLayout";
import { React } from "react";
import { Table } from "reactstrap";
import "./Merchants.scss";
import { useHistory } from "react-router-dom";

const merchants = [
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
    _id: "626e237ef4224ee4107039b9",
    name: "Routine",
    email: "thinh2k1310@gmail.com",
    phoneNumber: "123456",
    categories: [
      "625bc06bf42fb72c316359b9",
      "625bcf4c62af52179722688e",
      "625bf227369b31102db9c5dd"
    ],
    business: "Chuyen ban thoi trang.",
    isActive: true,
    status: "Approved",
    created: "2022-05-01T06:06:54.983Z",
    slug: "routine",
    __v: 0
  },
  {
    _id: "626e233af4224ee4107039af",
    name: "Xon xen shop",
    email: "xonxen@gmail.com",
    phoneNumber: "123456",
    categories: ["625bcf4c62af52179722688e"],
    business: "Chuyen ban thoi trang nu.",
    isActive: true,
    status: "Approved",
    created: "2022-05-01T06:05:46.393Z",
    slug: "xon-xen-shop",
    __v: 0
  },
  {
    _id: "626e2324f4224ee4107039a5",
    name: "SSSutter",
    email: "sssutter@gmail.com",
    phoneNumber: "123456",
    categories: ["625bc06bf42fb72c316359b9"],
    business: "Chuyen ban thoi trang nam.",
    isActive: true,
    status: "Approved",
    created: "2022-05-01T06:05:24.569Z",
    slug: "sssutter",
    __v: 0
  },
  {
    _id: "626e20dd6f575e7d0296ce44",
    name: "Test",
    email: "test@gmail.com",
    phoneNumber: "123456",
    categories: ["625bf227369b31102db9c5dd"],
    business: "Chuyen ban thoi trang.",
    isActive: true,
    status: "Approved",
    created: "2022-05-01T05:55:41.975Z",
    slug: "test",
    __v: 0
  }
];

const style = (active) => {
  return active
    ? { color: "blue", fontWeight: "bold", textAlign: "center" }
    : { color: "red", fontWeight: "bold", textAlign: "center" };
};

function Merchant() {
  const history = useHistory();
  let noMerchant = 0;

  const tableMerchant = merchants.map((merchant, index) => {
    return (
      <tr key={index}>
        <th scope="row" style={{ textAlign: "center" }}>
          {++noMerchant}
        </th>
        <td>{merchant._id}</td>
        <td>{merchant.name}</td>
        <td>{merchant.email}</td>
        <td>{merchant.phoneNumber}</td>
        <td style={style(merchant.isActive)}>
          {merchant.isActive ? "Active" : "Block"}
        </td>
        <td style={{ textAlign: "center" }}>{merchant.status}</td>
        <td>
          <button
            className="btn btn-primary"
            onClick={() => history.push("/manage-merchants-edit")}
          >
            Active
          </button>
          &nbsp;&nbsp;&nbsp;
          <button className="btn btn-warning">DeActivate</button>
        </td>
      </tr>
    );
  });

  return (
    <MainLayout>
      <div className="overview-category">
        <h2>Manager Merchant</h2>
        <div className="main">
          <Table bordered>
            <thead>
              <tr style={{ backgroundColor: "#0B79C1", color: "#fff" }}>
                <th>No</th>
                <th>ID</th>
                <th>Merchant Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>isActive</th>
                <th>Status</th>
                <th>Action</th>
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

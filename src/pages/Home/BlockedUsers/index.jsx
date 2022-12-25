import MainLayout from "layout/MainLayout/MainLayout";
import { React, useEffect } from "react";
import { Table } from "reactstrap";
import "./Merchants.scss";
import useFetchBlockedUsers from "hook/useFetchBlockedUsers";
import useUnblockUser from "hook/useUnblockUser";

function BlockedUsers() {
  const [data, fetchBlockedUsers] = useFetchBlockedUsers();
  const [unblockUser, reload] = useUnblockUser();

  useEffect(() => {
    fetchBlockedUsers();
  }, [reload]);

  const tableModerators = data?.map((mod, index) => {
    return (
      <tr key={index}>
        <th scope="row" style={{ textAlign: "center" }}>
          {index + 1}
        </th>
        <td>
          {mod.firstName} {mod.lastName}
        </td>
        <td>{mod.email}</td>
        <td>
          <button
            className="btn btn-success"
            disabled={mod.active}
            onClick={() => unblockUser(mod._id)}
          >
            Active
          </button>
        </td>
      </tr>
    );
  });

  return (
    <MainLayout>
      <div className="overview-category">
        <div className="merchant-header">
          <h2>Manage Blocked Users</h2>
        </div>

        <div className="main">
          <Table bordered>
            <thead>
              <tr style={{ backgroundColor: "#0B79C1", color: "#fff" }}>
                <th>ID</th>
                <th>Full Name</th>
                <th>Email</th>
                <th style={{ width: "100px" }}>Action</th>
              </tr>
            </thead>
            <tbody>{tableModerators}</tbody>
          </Table>
        </div>
      </div>
    </MainLayout>
  );
}

export default BlockedUsers;

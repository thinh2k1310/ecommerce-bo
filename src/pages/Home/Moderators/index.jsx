import MainLayout from "layout/MainLayout/MainLayout";
import { React, useEffect } from "react";
import { Table } from "reactstrap";
import "./Merchants.scss";
import useFetchModerators from "hook/useFetchModerators";
import useUpdateModerator from "hook/useUpdateModerator";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const style = (active) => {
  return active
    ? { color: "blue", fontWeight: "bold", textAlign: "center" }
    : { color: "red", fontWeight: "bold", textAlign: "center" };
};

function Admins() {
  const [data, getModerators] = useFetchModerators();
  const [updateModerator, reload] = useUpdateModerator();
  const history = useHistory();

  useEffect(() => {
    getModerators();
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
        <td style={style(mod.active)}>
          {mod.active ? "Active" : "DeActivate"}
        </td>
        <td>
          <button
            className="btn btn-primary"
            disabled={mod.active}
            onClick={() => updateModerator({ op: "active" }, mod._id)}
          >
            Active
          </button>
          &nbsp;&nbsp;&nbsp;
          <button
            className="btn btn-warning"
            disabled={!mod.active}
            onClick={() => updateModerator({ op: "deactive" }, mod._id)}
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
          <h2>Manage Moderator</h2>
          <div>
            <Button
              className="btn-success"
              onClick={() => history.push("/moderators/new")}
            >
              Add Moderator
            </Button>
          </div>
        </div>

        <div className="main">
          <Table bordered>
            <thead>
              <tr style={{ backgroundColor: "#0B79C1", color: "#fff" }}>
                <th>ID</th>
                <th>Moderator Name</th>
                <th>Email</th>
                <th>Is Active</th>
                <th style={{ width: "250px" }}>Action</th>
              </tr>
            </thead>
            <tbody>{tableModerators}</tbody>
          </Table>
        </div>
      </div>
    </MainLayout>
  );
}

export default Admins;

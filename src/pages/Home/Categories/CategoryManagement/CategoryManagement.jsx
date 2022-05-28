import MainLayout from "layout/MainLayout/MainLayout";
import { React } from "react";
import { useHistory } from "react-router-dom";
import { Table } from "reactstrap";
import "./CategoryManagement.scss";

function CategoryManagement() {
  const history = useHistory();

  const newCategory = () => {
    history.push("/manage-categories-new");
  };

  return (
    <MainLayout>
      <div className="overview-category">
        <h2>Manager Categories</h2>
        <span className="btn-add" onClick={newCategory}>
          <button className="btn btn-info ">New</button>
        </span>
        <div className="main">
          <Table bordered>
            <thead>
              <tr style={{ backgroundColor: "#0B79C1", color: "#fff" }}>
                <th>No</th>
                <th>Category Name</th>
                <th>Description</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td style={{ color: "blue", fontWeight: "bold" }}>Use</td>
                <td>
                  <button className="btn btn-primary ">edit</button>
                  &nbsp;&nbsp;&nbsp;
                  <button className="btn btn-danger">delete</button>
                </td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td style={{ color: "FireBrick", fontWeight: "bold" }}>
                  Not Use
                </td>
                <td>
                  <button className="btn btn-primary ">edit</button>
                  &nbsp;&nbsp;&nbsp;
                  <button className="btn btn-danger">delete</button>
                </td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Larry</td>
                <td>the Bird</td>
                <td style={{ color: "blue", fontWeight: "bold" }}>Use</td>
                <td>
                  <button className="btn btn-primary ">edit</button>
                  &nbsp;&nbsp;&nbsp;
                  <button className="btn btn-danger">delete</button>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </MainLayout>
  );
}

export default CategoryManagement;

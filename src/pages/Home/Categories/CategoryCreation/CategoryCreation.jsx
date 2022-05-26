import MainLayout from "layout/MainLayout/MainLayout";
import { React } from "react";
import "./CategoryCreation.scss";

function CategoryCreation() {
  return (
    <MainLayout>
      <h2 className="category-title bold mb-5 mt-5">Create Categories</h2>
      <form className="form-container">
        <div className="form-group login-form-group">
          <label className="name-field">Categories name:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Category Name"
            name="category"
          />
        </div>
        <div className="form-group login-form-group">
          <label className="name-field">Description</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Description"
            name="description"
          />
        </div>
        <div className="form-btn-submit">
          <button className="btn btn-info btn-sm">Create</button>
        </div>
      </form>
    </MainLayout>
  );
}

export default CategoryCreation;

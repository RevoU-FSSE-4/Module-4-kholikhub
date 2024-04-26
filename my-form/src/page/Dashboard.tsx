import "./Home.css";
import { useContext, useState } from "react";
import { ProfileContext } from "../Context/ProfileContext";

function Dashboard() {
    const { name} = useContext(ProfileContext);
  return (
    <div>
      <div className="m-4 flex justify-center text-2xl font-semibold">
       <h1>Category</h1>
      </div>
      <h1 className="flex justify-center font-bold">Profile: {name}</h1>
        <ul>
          <li>
            <h2>List of Category</h2>
          </li>
          <li>
            <h2>Save Category</h2>
          </li>
          <li>
            <h2>Update Category</h2>
          </li>
          <li>
            <h2>Delete Category</h2>
          </li>
        </ul>
    </div>
  );
};

export default Dashboard;
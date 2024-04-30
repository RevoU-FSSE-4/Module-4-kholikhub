import { useState } from "react";
import FetchData from "../Utils/Fetch";
import {useNavigate} from "react-router-dom";

interface AddComponent {
  name: string;
  description: string;
  active: boolean;
}

const AddComponent = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [active, setActive] = useState("")

  const navigate = useNavigate();


  const handleSubmit = async (event: any) => {
    event.preventDefault();
    console.log("trigger submit");
    const newAdd: AddComponent = {
      name: name,
      description: description,
      active: true,
    };

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newAdd),
    };

    const response = await FetchData(
      "https://library-crud-sample.vercel.app/api/category/create",
      options
    );
    if (response) {
      alert("success add Category!");
      navigate("/Dashboard");
    }
  };

  return (
    <div className=" flex justify-center ">
      <h1 className="m-2 ">Add Category</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="mx-3 px-2 border-2"
          placeholder="name"
          onChange={(e: any) => {
            setName(e.target.value);
          }}
        />
        <input
          type="text"
          className="mx-3 px-2 border-2"
          placeholder="description"
          onChange={(e: any) => {
            setDescription(e.target.value);
          }}
        />

        <button 
        className=" border-2 p-2"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddComponent;

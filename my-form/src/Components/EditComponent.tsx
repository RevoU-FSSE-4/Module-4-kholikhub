import { useEffect, useState } from "react";
import FetchData from "../Utils/Fetch";
import { useNavigate, useParams } from "react-router-dom";
import AddComponent from "./AddComponent";

const EditComponent = () => {

  const idParams = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response: AddComponent = await FetchData(
        `https://library-crud-sample.vercel.app/api/category/update${idParams.id}`
      );
      setName(response.name);
      setDescription(response.description);
    };
    fetchData();
  }, []);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    console.log("trigger submit");
    const updateComponent: AddComponent = {
      name: name,
      description: description,
      active: true,
    };

    const options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateComponent),
    };

    const response = await FetchData(
      `https://library-crud-sample.vercel.app/api/category/update${idParams.id}`,
      options
    );
    if (response) {
      alert("success edit Category!");
      navigate("/Dashboard");
    }
  };

  return (
    <>
      <h1>Edit Category</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="name"
          onChange={(e: any) => {
            setName(e.target.value);
          }}
          value={name}
        />
        <input
          type="text"
          placeholder="user id"
          onChange={(e: any) => {
            setDescription(e.target.value);
          }}
          value={description}
        />

        <button>Save</button>
      </form>
    </>
  );
};

export default EditComponent;

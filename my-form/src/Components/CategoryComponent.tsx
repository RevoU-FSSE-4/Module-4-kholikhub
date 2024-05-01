import { useCallback, useEffect, useState , useContext} from "react";
import Category from "../types/Category";
import {useNavigate} from "react-router-dom";
import { ProfileContext } from "../Context/ProfileContext";
import EditComponent from "./EditComponent";
import FetchData from "../Utils/Fetch";

export default function CategoryComponent() {

    const profile = useContext(ProfileContext);
    const [data, setData] = useState<Category[]>();
    const [count, setCount] = useState(0);

    const navigate = useNavigate();

    const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
    
      const fetchData = useCallback(async () => {
        const response: Category[] = await FetchData(
          "https://library-crud-sample.vercel.app/api/category",
          options
        );
        setData(response);
      }, []);
    
      useEffect(() => {
        fetchData();
      }, []);
    
      const gotoEdit = (id: string) => {
        navigate("./EditComponent/" + id);
        console.log("cek goto edit" + id)
      };
      console.log("cek goto edit", gotoEdit)

    return (
        <>
            <div className=" flex justify-center text-xl font-semibold m-4">
                <h1>Category List</h1>
            </div>
            <div className="flex justify-center text-xl font-semibold">
                <div className="border-2">
                    <ul>
                        {data &&
                        data.map((item) => (
                            <li key={item.id}>
                            <b>Name:</b> {item.category_name} <br />
                            <b>Description:</b> {item.category_description} <br />
                            <b>Status:</b> {item.is_active ? "Active" : "Not Active"}
                            <a
                                onClick={() => navigate('/EditComponent')}
                                className="flex justify-center text-4xl font-bold text-green-500"
                                >
                               Edit
                            </a>
                            <button
                                onClick={() => {
                                gotoEdit(item.id)
                                console.log(item.id);
                                }}
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => {
                                setCount(count + 1);
                                }}
                            >
                                Delete
                            </button>
                            </li>
                        ))}
                    </ul>
                </div>                
            </div>
        </>
    )
    // async function deleteCategory(id: any)
}
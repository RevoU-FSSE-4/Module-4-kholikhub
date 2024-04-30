import { useEffect, useState , useContext} from "react";
import Category from "../types/Category";
import {useNavigate} from "react-router-dom";
import { ProfileContext } from "../Context/ProfileContext";
import EditComponent from "./EditComponent";

interface data {
    id: number;
    name: string;
    description: string;
    active: boolean;
  }
export default function CategoryComponent() {
    const [categoryResponses, setCategoryResponse] = useState<Category[]>([]);
    const profile = useContext(ProfileContext);
    const [data, setData] = useState<data[]>();

    const navigate = useNavigate();

    useEffect(() => {
        async function getProfile() {}
            getProfile();
            getCategory();
        },[]);

    const gotoEdit = (id: number) => {
        navigate("/EditComponent/" + id);
      };

    async function getCategory() {
        const token = localStorage.getItem("token");
        const option = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer" + token,
            },
        };

        try {
            const response = await fetch(
                "https://library-crud-sample.vercel.app/api/category",
                option
            );
            const result = await response.json();
            const data = (result as Category[]) || [];
            setCategoryResponse(data);
        } catch (error) {
            console.error("error", error);
        }
    }

    return (
        <>
            <div className=" flex justify-center text-xl font-semibold m-4">
                <h1>Category List</h1>
                <button className="ml-4">Edit</button>
            </div>
            <div className="flex justify-center text-xl font-semibold">
                <div className="border-2">
                    <tr>
                        <td className="px-5">ID</td>
                        <td className="px-5">NAME</td>
                        <td className="px-5">DESCRIPTION</td>
                        <td className="px-5">
                            <button className="border-2">EDIT</button>
                        </td>
                        <td className="px-5">
                            <button className="border-2">DELETE</button>
                        </td>
                    </tr>
                    <tr>
                        {data &&
                        data.map((item) => (
                        <td key={item.id}>
                            {item.name} - {item.active ? "Completed" : "Not Completed"}{" "}
                            <button
                            onClick={() => {
                                gotoEdit(item.id);
                            }}
                            >
                            Edit
                            </button>
                        </td>
                        ))}
                    </tr>
                </div>                
            </div>
        </>
    )
    // async function deleteCategory(id: any)
}
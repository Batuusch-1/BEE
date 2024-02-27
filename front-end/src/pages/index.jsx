import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
export default function Home() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(null);
  const [data, setData] = useState([]);
  const id = { id: uuidv4() };
  const getData = async () => {
    const response = await fetch("http://localhost:8080/", {
      method: "GET",
      mode: "cors",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    });
    const newData = await response.json();
    setData(newData);
    console.log(data);
  };
  const addData = async (event) => {
    event.preventDefault();
    const response = await fetch(`http://localhost:8080/`, {
      method: `POST`,
      mode: "cors",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, age, id }),
    });
    setAge(age + 1);
  };
  const deleteData = async ({ id }) => {
    const sendData = await fetch(`http://localhost:8080/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });
    setAge(age + 2);
  };
  useEffect(() => {
    getData();
  }, [age]);

  return (
    <main className="w-[100%] h-[100%] flex flex-wrap mt-4 gap-4">
      <div className="border border-blue-500 p-5 flex gap-2">
        <form onSubmit={addData} className="flex gap-2" action="">
          <input
            onChange={(event) => setName(event.target.value)}
            className="border border-blue-200 px-1"
            type="text"
            placeholder="Name"
          />
          <input
            onChange={(event) => setAge(event.target.value)}
            className="border border-blue-200 px-1"
            type="text"
            placeholder="Age"
          />
        </form>
        <button onClick={addData} className="btn btn-primary">
          Submit
        </button>
      </div>
      {data?.map((el) => {
        return (
          <table key={el.id} className="border  border-blue-400 rounded-md">
            <tr className="border border-black *:px-2">
              <th className=" text-center border border-black">Name</th>
              <th className=" text-center border border-black">Age</th>
              <th
                onClick={() => {
                  deleteData(el.id);
                }}
                className=" text-center border border-black bg-blue-200 cursor-pointer hover:bg-blue-300"
              >
                Delete
              </th>
            </tr>
            <tr className="border border-black *:px-2">
              <td className=" text-center border border-black">{el.name}</td>
              <td className=" text-center border border-black">{el.age}</td>
              <td className=" text-center border border-black bg-blue-200 cursor-pointer hover:bg-blue-300">
                Edit
              </td>
            </tr>
          </table>
        );
      })}
    </main>
  );
}

import { useEffect, useState } from "react";
export default function Home() {
  const [name, setName] = useState("Neree oruulana uu ?");
  const [age, setAge] = useState("nasaa oruulana uu ?");
  const [data, setData] = useState([]);
  const [dataFeel, setDataFeel] = useState(0);
  const fetcData = async () => {
    const response = await fetch("http://localhost:8080/", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, age }),
    }).then((response) => response.json());
    setDataFeel(dataFeel + 1);
  };
  const getData = async () => {
    const res = await fetch("http://localhost:8080/");
    const data1 = await res.json();
    setData(data1);
  };
  const deleteFunc = async (index) => {
    const sendData = await fetch(`http://localhost:8080/${index}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });
    setDataFeel(dataFeel + 1);
  };
  const editFunc = async (index) => {
    const editData = await fetch(`http://localhost:8080/${index}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(editData),
    });
    setDataFeel(dataFeel + 1);
  };

  useEffect(() => {
    getData();
  }, [dataFeel]);

  const addData = () => {
    fetcData();
  };
  return (
    <main className="flex  w-full h-full flex-col items-center mt-10 gap-20">
      <div
        action=""
        className="w-[300px] h-[200px] bg-slate-200 flex flex-col gap-5 items-center border border-black rounded-md"
      >
        <input
          className="border rounded-md border-black w-[200px] mt-5 px-2 py-1"
          onChange={(event) => setName(event.target.value)}
          placeholder="Name"
          type="text"
        />
        <input
          className="border rounded-md border-black w-[200px] mt-1 px-2 py-1"
          onChange={(event) => setAge(event.target.value)}
          type="text"
          placeholder="Age"
        />
        <button onClick={addData} className=" bg-blue-400 py-1 px-3 rounded-md">
          Submit
        </button>
      </div>
      <div>
        {data.map((el, index) => {
          return (
            <div className="w-[200px] flex flex-col   ">
              {" "}
              <div
                key={index}
                className="*:py-1  *:border-black *:border *:rounded-md *:text-center flex gap-5 w-full *:px-3 py-1"
              >
                <div>{el.name}</div>
                <div>{el.age}</div>
                <button
                  onClick={() => {
                    deleteFunc(index);
                  }}
                  className="bg-blue-200 hover:bg-blue-300"
                >
                  Delete
                </button>
                <button  className="bg-blue-200 hover:bg-blue-300">Edit</button>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
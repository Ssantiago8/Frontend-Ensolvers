import Header from "./components/Header";
import { useEffect, useState } from "react";
import List from "./components/List";
import Listarchive from "./components/Listarchive";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [archived, setArchived] = useState([]);

  const getData = async () => {
    try {
      const response = await fetch("https://noteapp-dpqr.onrender.com/notes", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      setNotes(json);
    } catch (error) {
      console.log(error);
    }
  };

  const getArchived = async () => {
    try {
      const response = await fetch(
        "https://noteapp-dpqr.onrender.com/notes/archived",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const json = await response.json();
      setArchived(json);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
    getArchived();
  }, []);

  const notasfront = notes;
  const notasarchived = archived;
  return (
    <div className="app">
      <Header nameList={"📑Notes"} getData={getData} />
      {notasfront?.map((note) => (
        <List key={note.id} notes={note} getData={getData} />
      ))}
      <Header nameList={"📑Archived Notes"} getArchived={getArchived} />
      {notasarchived?.map((note) => (
        <Listarchive key={note.id} notes={note} getArchived={getArchived} />
      ))}
    </div>
  );
};

export default App;

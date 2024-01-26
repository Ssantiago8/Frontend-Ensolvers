import { useState } from "react";

const Modal = ({ mode, setShowModal, notes }) => {
  const editMode = mode === "edit" ? true : false;
  const [data, setData] = useState({
    text: editMode ? notes.text : "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const postnotes = async () => {
    try {
      const response = await fetch("http://localhost:8000/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: data.text }),
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const editnotes = async () => {
    try {
      const response = await fetch(`http://localhost:8000/notes/${notes.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: data.text || "" }),
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="overlay">
      <div className="modal">
        <div className="title-form">
          <h3>Let's {editMode ? "edit" : "create"} a new note</h3>
          <button onClick={() => setShowModal(false)}>X</button>
        </div>
        <form>
          <input name="text" value={data.text} onChange={handleChange} />
          <input
            className={mode}
            type="submit"
            onClick={editMode ? editnotes : postnotes}
          />
        </form>
      </div>
    </div>
  );
};

export default Modal;

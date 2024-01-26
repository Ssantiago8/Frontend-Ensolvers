import { useState } from "react";
import Modal from "./Modal";

const List = ({ notes, getData }) => {
  const [showModal, setShowModal] = useState(false);
  const deleteNote = async () => {
    try {
      const response = await fetch(`http://localhost:8000/notes/${notes.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        getData();
        setShowModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const archiveNote = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/notes/${notes.id}/archive`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ is_archived: true }),
        }
      );
      if (response.status === 200) {
        getData();
        setShowModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="list-item">
      <div className="info-container">
        <p className="text">{notes.text}</p>
      </div>
      <div className="btn-container">
        <button className="button-item edit" onClick={() => setShowModal(true)}>
          EDIT
        </button>
        <button className="button-item archive" onClick={archiveNote}>
          ARCHIVE
        </button>
        <button className="button-item delete" onClick={deleteNote}>
          DELETE
        </button>
      </div>
      {showModal && (
        <Modal mode={"edit"} setShowModal={setShowModal} notes={notes} />
      )}
    </div>
  );
};

export default List;

import { useState } from "react";
import Modal from "./Modal";

const Listarchive = ({ notes, getArchived }) => {
  const [showModal, setShowModal] = useState(false);

  const unarchiveNote = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8000/notes/${notes.id}/unarchive`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ is_archived: false }),
        }
      );
      if (response.status === 200) {
        getArchived();
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
        <button className="button-item unarchive" onClick={unarchiveNote}>
          UNARCHIVE
        </button>
      </div>
      {showModal && (
        <Modal mode={"edit"} setShowModal={setShowModal} notes={notes} />
      )}
    </div>
  );
};

export default Listarchive;

import Modal from "./Modal";
import { useState } from "react";

const Header = ({ nameList }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="list-header">
      <h1>{nameList}</h1>
      <div className="btn-container">
        <button className="create" onClick={() => setShowModal(true)}>
          ADD NOTE
        </button>
      </div>
      {showModal && <Modal mode={"create"} setShowModal={setShowModal} />}
    </div>
  );
};

export default Header;

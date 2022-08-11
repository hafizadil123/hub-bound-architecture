import React from "react";
import Modal from "react-bootstrap/Modal";

const Dialog = (props) => {
  const { isVisibel, Handler } = props;
  return (
    <>
      <Modal show={isVisibel} onHide={Handler} keyboard={false}>
        <Modal.Body>
          <div className="card-wrapper">
            <div className="mt-5">
              <p className="text-center mt-5 text-dark">
                Are you sure you want to delete this business?
              </p>
              <p className="text-center brown">PARK AVE & 34th</p>
              <div className="form-group">
                <div className="text-center mt-5c mb-5">
                  <button
                    type="button"
                    className="btn render color-66 clr w-50"
                  >
                    Delete Business
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Dialog;

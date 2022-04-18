import React from "react";
import "../../assets/styles/login.css"
// import "../../assets/styles/modal.css";

const Modal = (props) => {

  const onClose = e => {
    props.onClose && props.onClose(e);
  }

    if (!props.show) {
      return null;
    }
    return (
      <div >
        <div className="content">{props.children}</div>
        <div className="modal1">
          <div className="login__container">
              <button className="login__btn" onClick={onClose}>
                Close login
              </button>
          </div>
        </div>        
      </div>
    );
}

export default Modal
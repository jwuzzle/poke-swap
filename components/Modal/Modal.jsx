import React from 'react'
import closeIcon from "../../src/assets/icons/close.svg"

const Modal = (props) => {


  return (
    (props.isOpen) && (
    <div className="modal">
        <div className="overlay">
            <div className="modal-content">
                <div className="closeButton">
                    <img src={closeIcon} alt="close the pop up" onClick={props.toggleModal}/>
                </div>
                <div>
                    <h2 className="modal-content__title">{props.title}</h2>
                    <p className="modal-content__body">{props.body}</p>
                </div>
                <div className="buttons">
                    <button onClick={props.toggleModal} className="buttons__cancel">Cancel</button>
                    <button onClick={props.handleAction} className="buttons__delete">{props.action}</button>
                </div>
            </div>
        </div>
    </div>
  ))
}

export default Modal
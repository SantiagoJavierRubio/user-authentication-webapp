import React from "react";
import Uploader from './Uploader/Uploader';
import './UploadModal.css';

const UploadModal = (props) => {

    const { closeModal, user, toggleEdit } = props;

    return(
        <div className="modal-box" onClick={closeModal}>
                <Uploader closeModal={closeModal} user={user} toggleEdit={toggleEdit} />
        </div>
    )
}

export default UploadModal;
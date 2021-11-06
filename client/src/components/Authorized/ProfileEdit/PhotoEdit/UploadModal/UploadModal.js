import React from "react";
import Uploader from './Uploader/Uploader';
import './UploadModal.css';

const UploadModal = (props) => {

    const { closeModal, user } = props;

    return(
        <div className="modal-box" onClick={closeModal}>
                <Uploader closeModal={closeModal} user={user}/>
        </div>
    )
}

export default UploadModal;
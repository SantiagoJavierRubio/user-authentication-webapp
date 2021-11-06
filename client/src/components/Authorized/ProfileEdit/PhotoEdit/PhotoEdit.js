import { useState, useEffect } from "react";
import UploadModal from './UploadModal/UploadModal';
import './PhotoEdit.css';

const PhotoEdit = ({ user }) => {

    const [userImg, setImg] = useState(user.img);
    const [showModal, setShowModal] = useState(false);

    const handleImgError = () => {
        setImg(null);
    }

    useEffect(()=> {
        setImg(user?.img);
    }, [user]);

    const handleImgClick = (e) => {
        e.preventDefault();
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false);
    }

    return (
        <>
        {showModal ? <UploadModal closeModal={closeModal} user={user} /> : null}
        <div className="photo-edit-box">
            <img src={userImg} alt="Profile picture" onError={handleImgError} />
            <button className="photo-overlay" onClick={handleImgClick}>
                <span className="material-icons">photo_camera</span>
            </button>
        </div>
        </>
    )
}

export default PhotoEdit;
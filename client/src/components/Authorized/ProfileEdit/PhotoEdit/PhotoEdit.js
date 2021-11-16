import { useState, useEffect, useContext } from "react";
import { Context } from '../../../../App';
import UploadModal from './UploadModal/UploadModal';
import './PhotoEdit.css';

const PhotoEdit = () => {

    const { userData } = useContext(Context);
    const [userImg, setImg] = useState(userData.img);
    const [showModal, setShowModal] = useState(false);

    const handleImgError = () => {
        setImg(null);
    }

    useEffect(()=> {
        setImg(userData?.img);
    }, [userData]);

    const handleImgClick = (e) => {
        e.preventDefault();
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false);
    }

    return (
        <>
        <UploadModal closeModal={closeModal} visible={showModal}/>
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
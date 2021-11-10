import { useState } from 'react';
import axios from 'axios';
import { BallTriangle } from '@agney/react-loading';
import { ReactComponent as ImageLogo } from './image.svg';
import './Uploader.css';

const Uploader = (props) => {

    const [isOver, setOver] = useState(false);
    const { closeModal, user, toggleEdit } = props;

    const [providedImg, setProvidedImg] = useState(null);
    const [fileUploaded, setFileUploaded] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const VALID_EXTENSIONS = ['.gif', '.png', '.jpg', '.jpeg'];

    const uploadFile = async (file) => {
        const formData = new FormData();
        formData.append('image', file);
        setLoading(true);
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URI}/images/upload`,
                formData,
                { 
                    headers: { 'Content-Type': 'multipart/form-data', 'usr': user.userID }
                }
            )
            setFileUploaded(true);
            setProvidedImg(res.data.secure_url);
            setLoading(false);
        } catch(err) {
            console.log(err);
            setLoading(false);
        }
    }

    const handleDrop = (e) => {
        e.preventDefault();
        setOver(false);
        const file = e.dataTransfer?.files?.[0];
        let fileExtension = file?.name?.substring(file?.name?.lastIndexOf('.'))
        if(VALID_EXTENSIONS.includes(fileExtension)){
            uploadFile(e.dataTransfer.files[0]);
        } else {
            alert('File extension not supported');
        }
    }

    const handleDragOver = (e) => {
        e.preventDefault();
        if(!isOver) setOver(true);
    }

    const handleDragExit = (e) => {
        e.preventDefault();
        if(isOver) setOver(false);
    }

    const handleFile = (e) => {
        e.preventDefault();
        uploadFile(e.target.files[0]);
    }

    const handleLink = (e) => {
        e.preventDefault();
        let img = new Image();
        img.src = e.target.value;
        if(img.complete){
            setProvidedImg(e.target.value);
        }
    }

    const saveProfilePicture = async (e) => {
        e.preventDefault();
        try{
            const res = await axios.post(`${process.env.REACT_APP_API_URI}/user/profile_pic_edit`, {
                usr: user.userID,
                url: providedImg
            });
            setProvidedImg(null);
            setFileUploaded(false);
            toggleEdit();
            closeModal();
        } catch (err) {
            console.log(err);
        }
    }

    const handleCancel = async () => {
        if(fileUploaded){
            console.log('Delete image from cloudinary')
        }
        setProvidedImg(null);
        setFileUploaded(false);
    }

    return(
        <div className='uploaderMain' onClick={e => e.stopPropagation()}>
            <button className="closeModalBtn" onClick={closeModal}>
                <span className="material-icons">close</span>
            </button>
            {providedImg ? 
            <>
                <p className="confirmQuestionText">Is this photo OK?</p>
                <img src={providedImg} alt="" onError={e=>setProvidedImg(null)}/>
                <div className="confirmOptions">
                    <button onClick={saveProfilePicture} >Confirm</button>
                    <button onClick={handleCancel}>Cancel</button>
                </div>    
            </>
            :
            <>
                {isLoading? 
                    <div className="loading">
                        <BallTriangle  className="loading-anim"/> 
                        <p>Loading picture</p>
                    </div>
                :
                <>
                    <h2 className='uploaderHeader'>Upload your photo</h2>
                    <div id="drop_zone" className={`dropBox ${isOver? 'dropBoxOver' : null}`} onDrop={e=>handleDrop(e)} onDragOver={handleDragOver} onDragLeave={handleDragExit}>
                        <ImageLogo  className='SVG' />
                        <p className='optionText'>Drag & drop your image here</p>
                    </div>
                    <p className="optionText">or</p>
                    <label component="button" htmlFor="file_input" className='inputButton'>Choose a file</label>
                    <input type="file" id="file_input" accept='image/*' onChange={handleFile} className='realInput' />
                    <input type="text" id="link_input" placeholder="Or you can provide a link here..." className="linkInput" onChange={handleLink} />
                </>
                }
            </>
            }
        </div>
    )
}

export default Uploader;
import Uploader from './Uploader/Uploader';
import './UploadModal.css';

const UploadModal = (props) => {

    const { closeModal, visible } = props;

    return(
        <div className={`modal-box ${visible ? 'modal-show' : 'modal-hide'}`}onClick={closeModal}>
            <Uploader closeModal={closeModal} />
        </div>
    )
}

export default UploadModal;
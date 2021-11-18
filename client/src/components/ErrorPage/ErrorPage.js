import Icon from './errname1';
import { useEffect } from 'react';
import './ErrorPage.css';

const ErrorPage = ({ message }) => {

    useEffect(() => {
        setTimeout(window.location.reload(false), 1000);
    }, []);

    return(
        <div className="error-view">
            <div id="error-logo">
                <Icon />
            </div>
            <h4>Oops! Something went wrong!</h4>
            <p>{message}</p>
        </div>
    )
}

export default ErrorPage;
import Icon from './errname1';
import './ErrorPage.css';

const ErrorPage = ({ message }) => {
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
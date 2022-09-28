import img from './error.gif';
import './errorMessage.scss';
const ErrorMessage = () => {
	return <img src={img} alt="error img" className="errorImg" />;
};
//src={process.env.PUBLIC_URL + '/error.gif'} To take file from public folder.
export default ErrorMessage;

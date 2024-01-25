import {axiosInstance} from "../../axios.js";
import {useApp, useAppDispatch} from "../../AppContext.jsx";

export default Login;

function Login() {
    const initData = useApp();
    const dispatch = useAppDispatch();

    const handleLogin = (event) => {
        event.preventDefault();
        axiosInstance.post('api/token/', new FormData(event.target))
            .then(response => {
                localStorage.setItem('access_token', response.data.access);
                localStorage.setItem('refresh_token', response.data.refresh);
                axiosInstance.defaults.headers['Authorization'] =
                    'Bearer ' + localStorage.getItem('access_token');
                dispatch({ type: 'Login',  data: true});
            })
            .catch(error => console.error(error))
    }

    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        axiosInstance.defaults.headers['Authorization'] = null;
        dispatch({ type: 'Login', data: false });
    }

    return (
        <div className="login">
            <div className="login-icon"></div>
            <div className="arrow up"></div>
            <form className="login-form" onSubmit={initData.login ? logout : handleLogin}>
                <input type="text" className={`login-form_input ${initData.login ? 'none' : ''}`} name='username' placeholder='Username'/>
                <input type="password" className={`login-form_input ${initData.login ? 'none' : ''}`} name='password' placeholder='Password'/>
                <button type="submit" className="login-form_btn">{initData.login ? 'Log out' : 'Log in'}</button>
            </form>
        </div>
    )
}
import Header from "./components/Header.jsx";
import Content from "./components/Content.jsx";
import Footer from "./components/Footer.jsx";
import {useEffect} from "react";
import {axiosInstance} from "./axios.js";
import {useApp, useAppDispatch} from "./AppContext.jsx";
import {initAppData} from "./components/content/Utils.js";

export default App

function App() {
    const initData = useApp();
    const dispatch = useAppDispatch();
    useEffect(initLogin, [])
    useEffect(() => initAppData(dispatch), [initData.login])

    return (
        <>
            <Header/>
            <Content/>
            <Footer/>
        </>
    )
    function initLogin(){
        axiosInstance.post('api/token/verify/', {'token': localStorage.getItem('access_token')}).then(response => {
            dispatch({ type: 'Login',  data: true});
        })
    }
}

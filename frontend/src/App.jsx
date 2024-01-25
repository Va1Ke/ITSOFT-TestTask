import Header from "./components/Header.jsx";
import Content from "./components/Content.jsx";
import Footer from "./components/Footer.jsx";
import {useEffect} from "react";
import {axiosInstance} from "./axios.js";
import {useApp, useAppDispatch} from "./AppContext.jsx";

export default App

function App() {
    const initData = useApp();
    const dispatch = useAppDispatch();
    useEffect(initLogin, [])
    useEffect(initAppData, [initData.login])

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
    function initAppData(){
        axiosInstance.get("api/transaction/").then(response => dispatch({type: "addTransactionData", data: response.data['results']}));
        axiosInstance.get("api/order/").then(response => dispatch({type: "addOrderData", data: response.data['results']}));
        axiosInstance.get("api/stock/").then(response => dispatch({type: "addStockData", data: response.data['results']}));
    }
}

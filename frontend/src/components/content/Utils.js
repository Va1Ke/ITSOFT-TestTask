import {axiosInstance} from "../../axios.js";

export {openOrders, getOrderClass, initAppData};

function openOrders(dispatcher, data){
    dispatcher({ type: 'orderOpen',  data: !data});
}
function getOrderClass(order_type){
    return order_type === "SELL" ? 'sell' : 'buy'
}
function initAppData(dispatch){
    axiosInstance.get("api/transaction/").then(response => dispatch({type: "addTransactionData", data: response.data['results']}));
    axiosInstance.get("api/order/").then(response => dispatch({type: "addOrderData", data: response.data['results']}));
    axiosInstance.get("api/stock/").then(response => dispatch({type: "addStockData", data: response.data['results']}));
}
import {useApp, useAppDispatch} from "../../AppContext.jsx";
import {getOrderClass, openOrders} from "./Utils.js";

export {OrderList};

function OrderList() {
    const initData = useApp();
    const dispatch = useAppDispatch();
    const renderedData = ['stock', 'stock_price', 'quantity']

    const ordersData = (orderData) => {
        return initData.orderData.map((sub_item)=>(
            <div key={sub_item.id} className={`order-list_order ${getOrderClass(sub_item.order_type)}`}>
                {Object.entries(sub_item).map(([key, value]) => {
                    if (renderedData.includes(key)) {
                        return(<div key={`${key}-${value}`}>{value}</div>)
                    }
                })}
            </div>
        ))
    }
    return(
        <>
            <div className={`order-list ${initData.orderOpen ? "mobile-open" : ""}`}>
                <div className="order-list_close" onClick={() => openOrders(dispatch, initData.orderOpen)}>Close</div>
                <div className="order-list_order">
                    <div>Stock</div>
                    <div>Price</div>
                    <div>Quantity</div>
                </div>
                {initData.orderDataInit && ordersData(initData.orderData)}
            </div>
            <div className={`overlay ${initData.orderOpen ? 'active-overlay': ''}`}></div>
        </>
    )
}
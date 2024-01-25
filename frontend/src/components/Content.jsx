import {useApp, useAppDispatch} from "../AppContext.jsx";
import {OrderList} from "./content/OrderList.jsx";
import {openOrders} from "./content/Utils.js";
import {OrderForm} from "./content/OrderForm.jsx";
import {TransactionList} from "./content/TransactionList.jsx";

export default Content;

function Content() {
    const initData = useApp();
    const dispatch = useAppDispatch();

    return (
        <div className={`general-content ${initData.login ? "" : "need-login"}`}>
            <OrderList/>
            <div className='general-content_mobile-navigation'>
                <div onClick={() => openOrders(dispatch, initData.orderOpen)}>Orders</div>
            </div>
            <OrderForm/>
            <TransactionList/>
        </div>
    );
}



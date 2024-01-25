import {useApp} from "../../AppContext.jsx";
import {getOrderClass} from "./Utils.js";

export {TransactionList};

function TransactionList(){
    const initData = useApp();
    const renderedData = ['user', 'stock', 'stock_price', 'quantity']

    const tableTitles = (mainArray, additionalArray) => {
        return [...additionalArray, ...mainArray].map((value, index) => (
            <div key={index}>{value}</div>
        ));
    };

    const orderData = (order) => {
        return Object.entries(order).map(([key, value]) => {
            if (renderedData.includes(key)) {
                return (
                    <div key={key}>{value}</div>
                );
            }
        })
    };

    const tableData = (transactionData) => {
        return transactionData.map((sub_item)=>(
            <div key={sub_item.id} className="transaction-list_block">
                <div className="transaction-list_block_id">{sub_item.id}</div>
                <div className={`transaction-list_block_buy grid-transaction ${getOrderClass(sub_item.buy_order.order_type)}`}>
                    {orderData(sub_item.buy_order)}
                </div>
                <div className={`transaction-list_block_sell grid-transaction ${getOrderClass(sub_item.sell_order.order_type)}`}>
                    {orderData(sub_item.sell_order)}
                </div>
            </div>
        ))
    };

    return(
        <div className={`transaction-list`}>
            <div className="transaction-list_title">Transactions</div>
            <div className="transaction-list_block_description">
                {tableTitles(renderedData, ['id'])}
            </div>
            {initData.transactionDataInit && tableData(initData.transactionData)}
        </div>
    )
}
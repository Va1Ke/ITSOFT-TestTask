export {openOrders, getOrderClass};

function openOrders(dispatcher, data){
    dispatcher({ type: 'orderOpen',  data: !data});
}
function getOrderClass(order_type){
    return order_type === "SELL" ? 'sell' : 'buy'
}
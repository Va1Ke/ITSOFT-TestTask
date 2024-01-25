export {appContextReducer};

function appContextReducer(data, action) {
    switch (action.type) {
        case 'addAppData':
            const initData = {
                init: true,
                appData: action.data
            }
            return {...data, ...initData}
        case 'Login':
            const loginData = {
                login: action.data
            }
            return {...data, ...loginData}
        case 'addStockData':
            const stockData = {
                stockDataInit: true,
                stockData: action.data
            }
            return {...data, ...stockData}
        case 'addOrderData':
            const orderData = {
                orderDataInit: true,
                orderData: action.data
            }
            return {...data, ...orderData}
        case 'addTransactionData':
            const transactionData = {
                transactionDataInit: true,
                transactionData: action.data
            }
            return {...data, ...transactionData}
        case 'orderOpen':
            const orderOpen = {
                orderOpen: action.data
            }
            return {...data, ...orderOpen}
        default:
            return data;
        }
}

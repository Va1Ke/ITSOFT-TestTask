import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {useApp, useAppDispatch} from "../../AppContext.jsx";
import {useEffect, useState} from "react";
import {axiosInstance} from "../../axios.js";
import {initAppData} from "./Utils.js";

export {OrderForm};

function OrderForm() {
    const initData = useApp();
    const dispatch = useAppDispatch();
    const [orderData, setOrderData] = useState({'stock': ''});

    useEffect(() =>{
        if (orderData['stock'].length > 0){
            axiosInstance.post('api/order/', orderData).then(response =>{
                console.log('lol')
                initAppData(dispatch)
            })
        }
    }, [orderData['order_type']])

    const updateOrderData = (key, value) => {
        setOrderData(prevStock => ({
            ...prevStock,
            [key]: value
        }));
    };

    const handleChange = (event) => {
        updateOrderData('stock', event.target.value);
    };
    return(
        <div className={`order-form`}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">SELECT STOCK</InputLabel>
                <Select labelId="demo-simple-select-label"
                        id="demo-simple-select" value={orderData['stock']} label="Stock" onChange={handleChange}>
                    {initData.stockDataInit && initData.stockData.map((sub_item)=>(
                        <MenuItem key={sub_item.id} value={sub_item.token}>{sub_item.token}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <input className="order-form_price" type="number" placeholder="Price" onChange={(event) => updateOrderData('stock_price', event.target.value)}/>
            <input className="order-form_quantity" type="number" placeholder="Quantity" onChange={(event) => updateOrderData('quantity', parseInt(event.target.value, 10))}/>
            <div className="order-form_buy" onClick={() => makeOrder('BUY')}>BUY</div>
            <div className="order-form_sell" onClick={() => makeOrder('SELL')}>SELL</div>
        </div>
    )
    function makeOrder(type){
        updateOrderData('order_type', type);
    }
}
import React, {useEffect, useState} from "react";
import axios from "../../axios-order";
import Order from "../../components/Order/Order";
import WithErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const Orders = (props) => {

    const [state,setState] = useState({
        orders: [],
        loading: true
    });
    useEffect(() => {
        axios.get('/orders.json')
            .then(res => {
                let fetchedOrders = [];
                for (let key in res.data){
                    fetchedOrders.push({...res.data[key],
                    id: key});
                }
                setState({orders: fetchedOrders,loading: false})
            }).catch(err => {
                setState({...state,loading: false})
        })

    },[])
    return (
        <div>
            {state.orders.map(order => (
                <Order key={order.id}
                ingredients={order.ingredients}
                price={order.price}/>
            ))}
        </div>
    );
}

export default WithErrorHandler(Orders,axios);
import React, {useEffect, useState} from "react";
import axios from "../../axios-order";
import Order from "../../components/Order/Order";
import WithErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import {connect} from "react-redux";
import * as actions from '../../store/actions/index'
import Spinner from "../../components/UI/Spinner/Spinner";
const Orders = (props) => {


    useEffect(() => {
    props.onFetchOrders();

    },[])
    let orders = <Spinner/>
    if(!props.loading){
        orders =  props.orders.map(order => (
                <Order key={order.id}
                       ingredients={order.ingredients}
                       price={order.price}/>
            ))
    }
    return (
        <div>
            {orders}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onFetchOrders: () => dispatch(actions.fetchOrders())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(WithErrorHandler(Orders,axios));
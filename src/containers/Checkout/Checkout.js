import React, {useEffect, useState} from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import {Routes, Route, useLocation, useNavigate, useMatch, Outlet} from "react-router-dom";
import ContactData from "./ConctactData/ContactData";
const Checkout = (props) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [state,setState] = useState({
        ingredients: null,
        price: 0
    });

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        let ingredients = {};
        let price = 0;
        for (const [key, value] of query.entries()) {
            if(key === 'price'){
                price = value;
            }else {
                ingredients[key] = value;
            }
        }
        setState({
            price: price,
            ingredients: ingredients
        });
    }, []);

    const checkoutCancelledHandler = () => {
        navigate(-1);
    }
    const checkoutContinueHandler = () => {
        navigate('/checkout/contact-data', { state: { ingredients: state.ingredients,price: state.price }, replace: true });
    }


    return(
        <div>
            <CheckoutSummary checkoutCancelled={checkoutCancelledHandler}
                             checkoutContinued={checkoutContinueHandler}
                             ingredients={state.ingredients} />
            <Outlet/>
        </div>
    );
}

export default React.memo(Checkout);
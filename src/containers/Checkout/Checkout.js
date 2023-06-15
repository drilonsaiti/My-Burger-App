import React, {useEffect, useState} from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import {Routes, Route, useLocation, useNavigate, useMatch, Outlet} from "react-router-dom";
import ContactData from "./ConctactData/ContactData";
import {connect} from "react-redux";
import * as actions from '../../store/actions/index'
const Checkout = (props) => {
    const navigate = useNavigate();
    const location = useLocation();


    useEffect(() => {
        props.onInitPurchase();
        if(props.purchased) {
            navigate('/orders')
        }
    },[props.purchased])



    const checkoutCancelledHandler = () => {
        navigate(-1, { replace: true });
    }
    const checkoutContinueHandler = () => {
        navigate('/checkout/contact-data',{replace:true});
    }



    return(
        <div>

            <CheckoutSummary checkoutCancelled={checkoutCancelledHandler}
                             checkoutContinued={checkoutContinueHandler}
                             ingredients={props.ings} />
            <Outlet/>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onInitPurchase: () => dispatch(actions.purchaseInit())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(React.memo(Checkout));
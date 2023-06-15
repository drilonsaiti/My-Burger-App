import React, { Fragment, useState, useEffect, useCallback } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-order";
import Spinner from "../../components/UI/Spinner/Spinner";
import WithErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { useNavigate } from "react-router-dom";
import {connect} from "react-redux";
import * as actionTypes from '../../store/actions/index';



const BurgerBuilder = (props) => {

    const [purchasable, setPurchasable] = useState(false);
    const [purchasing, setPurchasing] = useState(false);
    const navigate = useNavigate();



    const purchaseHandler = () => {
        setPurchasing(true);
    };

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    };

    const updatePurchaseState = ( ingredients ) =>{

        const sum = Object.keys( ingredients )
            .map( igKey => {
                return ingredients[igKey];
            } )
            .reduce( ( sum, el ) => {
                return sum + el;
            }, 0 );
        return sum > 0;
    }

    const purchaseContinueHandler = () => {
        const queryParams = [];
        for (let i in props.ings) {
            queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(props.ings[i]));
        }
        queryParams.push('price='+props.price);
        const queryString = queryParams.join("&");
        navigate("/checkout?" + queryString);
    };
    useEffect(() => {
        props.onInitIngredients();
    },[]);

    useEffect(() => {
        if (props.ings) {
            setPurchasable(updatePurchaseState(props.ings));
        }
    }, [props.ings]);

    console.log(props.error);
    let orderSummary = null;
    let burger = !props.error ? <Spinner /> : <p>Failed to load ingredients.</p>;

    if (!props.error) {
        burger = (
            <Fragment>
                <Burger ingredients={props.ings} />
                <BuildControls
                    ingredientAdded={props.onIngredientAdded}
                    ingredientRemoved={props.onIngredientRemoved}
                    disabled={props.ings}
                    price={props.price}
                    purchasable={updatePurchaseState(props.ings)}
                    ordered={purchaseHandler}
                />
            </Fragment>
        );

        orderSummary = (
            <OrderSummary
                totalPrice={props.price}
                purchaseCanceled={purchaseCancelHandler}
                purchaseContinued={purchaseContinueHandler}
                ingredients={props.ings}
            />
        );
    }

    return (
        <Fragment>
            <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </Fragment>
    );
};


const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actionTypes.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actionTypes.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actionTypes.initIngredients())

    }
}
export default connect(mapStateToProps,mapDispatchToProps)(WithErrorHandler(BurgerBuilder, axios));

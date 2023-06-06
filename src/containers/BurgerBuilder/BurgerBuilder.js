import React, { Fragment, useState, useEffect, useCallback } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-order";
import Spinner from "../../components/UI/Spinner/Spinner";
import WithErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { useNavigate } from "react-router-dom";

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
};

const updatePurchaseState = (ingredients) => {
    const sum = Object.values(ingredients).reduce((acc, curr) => acc + curr, 0);
    return sum > 0;
};

const BurgerBuilder = () => {
    const [ingredients, setIngredients] = useState(null);
    const [totalPrice, setTotalPrice] = useState(4);
    const [purchasable, setPurchasable] = useState(false);
    const [purchasing, setPurchasing] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const addIngredientHandler = (type) => {
        const updatedIngredients = {
            ...ingredients,
            [type]: ingredients[type] + 1,
        };
        const newPrice = totalPrice + INGREDIENT_PRICES[type];
        setIngredients(updatedIngredients);
        setTotalPrice(newPrice);
        setPurchasable(updatePurchaseState(updatedIngredients));
    };

    const removeIngredientHandler = (type) => {
        if (ingredients[type] <= 0) return;
        const updatedIngredients = {
            ...ingredients,
            [type]: ingredients[type] - 1,
        };
        const newPrice = totalPrice - INGREDIENT_PRICES[type];
        setIngredients(updatedIngredients);
        setTotalPrice(newPrice);
        setPurchasable(updatePurchaseState(updatedIngredients));
    };

    const purchaseHandler = () => {
        setPurchasing(true);
    };

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    };

    const purchaseContinueHandler = () => {
        const queryParams = [];
        for (let i in ingredients) {
            queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(ingredients[i]));
        }
        queryParams.push('price='+totalPrice);
        const queryString = queryParams.join("&");
        navigate("/checkout?" + queryString);
    };

    useEffect(() => {
        setLoading(true);
        axios
            .get("/ingredients.json")
            .then((response) => {
                setIngredients(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log("Error: ", error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (ingredients) {
            setPurchasable(updatePurchaseState(ingredients));
        }
    }, [ingredients]);

    let orderSummary = null;
    let burger = loading ? <Spinner /> : <p>Failed to load ingredients.</p>;

    if (ingredients) {
        burger = (
            <Fragment>
                <Burger ingredients={ingredients} />
                <BuildControls
                    ingredientAdded={addIngredientHandler}
                    ingredientRemoved={removeIngredientHandler}
                    disabled={ingredients}
                    price={totalPrice}
                    purchasable={purchasable}
                    ordered={purchaseHandler}
                />
            </Fragment>
        );

        orderSummary = (
            <OrderSummary
                totalPrice={totalPrice}
                purchaseCanceled={purchaseCancelHandler}
                purchaseContinued={purchaseContinueHandler}
                ingredients={ingredients}
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

export default WithErrorHandler(BurgerBuilder, axios);

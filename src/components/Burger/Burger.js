import React from "react";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import './Burger.css'
import {useNavigate} from "react-router-dom";

const Burger = (props) => {
    let transformedIngredients = [];

    if (props.ingredients && Object.keys(props.ingredients).length > 0) {

        transformedIngredients = Object.keys(props.ingredients)
            .map((igKey) => {

                return [...Array(props.ingredients[igKey])].map((_, i) => (
                    <BurgerIngredient key={igKey + i} type={igKey} />
                ));
            })
            .reduce((arr, el) => arr.concat(el), []);
    } else {
        transformedIngredients = <p>Please start adding ingredients!</p>;
    }


    return (
        <div className="Burger">
        <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};

export default React.memo(Burger);
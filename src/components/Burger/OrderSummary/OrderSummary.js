import React, {Fragment} from "react";
import Button from "../../UI/Button/Button";
const OrderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return <li key={igKey}><span style={{textTransform: 'capitalize'}}>{igKey}</span>:
                {props.ingredients[igKey]}</li>
        });
    return(
        <Fragment>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {props.totalPrice.toFixed(2)}</strong></p>
            <p>Continue to Checkout ?</p>
            <Button clicked={props.purchaseCanceled} btnType="Danger" >CANCEL</Button>
            <Button clicked={props.purchaseCountinued} btnType="Success">CONTINUE</Button>
        </Fragment>
    )
};

export default React.memo(OrderSummary);
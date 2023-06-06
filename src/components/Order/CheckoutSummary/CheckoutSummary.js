import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import './CheckoutSummary.css'
const CheckoutSummary = (props) => {

    const filtered = props.ingredients
        ? Object.entries(props.ingredients).reduce((acc, [key, value]) => {
            if (parseInt(value) > 0) {
                acc[key] = value;
            }
            return acc;
        }, {})
        : {};
    return (
        <div className="CheckoutSummary">
            <h1>We hope it tastes well!</h1>
            <div style={{width: '100%',margin: 'auto'}}>
                <Burger ingredients={filtered}/>
            </div>
            <Button btnType="Danger" clicked={props.checkoutCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.checkoutContinued}>CONTINUE</Button>

        </div>
    )
}

export default React.memo(CheckoutSummary);
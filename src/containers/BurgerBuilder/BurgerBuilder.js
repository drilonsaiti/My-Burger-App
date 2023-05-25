import React, {Fragment, PureComponent} from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-order";
import Spinner from "../../components/UI/Spinner/Spinner";
import WithErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}
class BurgerBuilder extends PureComponent{

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false
    }

    componentDidMount() {
        axios.get("/ingredients.json")
            .then(response => {
                console.log("Response " + response.data)
                this.setState({ingredients:response.data});
            }).catch(err => console.log("Error "  + err))
    }

    updatePurchaseState(ingredients){
        const sum = Object.keys(ingredients)
            .map(igKEy => {
                return ingredients[igKEy]
            }).reduce((acc,curr) => acc + curr,0);
        this.setState({
        purchasable: sum > 0})
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updateIngredients = {
            ...this.state.ingredients
        }
        updateIngredients[type] = updatedCount;
        const newPrice = INGREDIENT_PRICES[type] + this.state.totalPrice;
        this.setState({totalPrice: newPrice,ingredients: updateIngredients})
        this.updatePurchaseState(updateIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];

        if(oldCount <= 0) return;
        const updatedCount = oldCount - 1;
        const updateIngredients = {
            ...this.state.ingredients
        }
        updateIngredients[type] = updatedCount;
        const newPrice =this.state.totalPrice - INGREDIENT_PRICES[type]  ;
        this.setState({totalPrice: newPrice,ingredients: updateIngredients})
        this.updatePurchaseState(updateIngredients);

    }

    purchaseHandler = () => {
        this.setState({purchasing:true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing:false})
    }

    purchaseContinueHandler = () => {
        this.setState({loading:true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Drilon Saiti',
                address:{
                    street: 'Teststreet 6',
                    zipCode: '1366',
                    country: 'Macedonia'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post("/order.json",order).then(response => this.setState({loading:false,purchasing: false}))
            .catch(error => this.setState({loading:false,purchasing: false}));
    }
    render() {
        const disabledInfo = {...this.state.ingredients}
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;
        let burger = <Spinner/>;

        if (this.state.ingredients) {
            burger = (
                <Fragment>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls ingredientAdded={this.addIngredientHandler}
                                   ingredientRemoved={this.removeIngredientHandler}
                                   disabled={disabledInfo} price={this.state.totalPrice}
                                   purchasable={this.state.purchasable}
                                   ordered={this.purchaseHandler}/>
                </Fragment>
            );
            orderSummary =  <OrderSummary totalPrice={this.state.totalPrice} purchaseCanceled={this.purchaseCancelHandler}
                                          purchaseCountinued={this.purchaseContinueHandler} ingredients={this.state.ingredients}/>;

        }
        return(
            <Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}

            </Fragment>
        );
    };
}

export default React.memo(WithErrorHandler(BurgerBuilder,axios));
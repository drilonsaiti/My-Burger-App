import React, {useState} from "react";
import Button from "../../../components/UI/Button/Button";
import "./ContactData.css"
import {useLocation, useNavigate} from "react-router-dom";
import axios from "../../../axios-order";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import WithErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import {connect} from "react-redux";
import * as actionTypes from '../../../store/actions/index'
const ContactData = (props) => {
    const [state, setState] = useState(({
        orderForm: {

            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5,
                    isNumeric: true
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },

            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [{value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}]
                },
                value: 'fastest',
                validation: {},
                valid: true,
            }
        },
        formIsValid: false,
        
    }));

    const navigate = useNavigate();

    const orderHandler = (e) => {
        e.preventDefault();

        const formData = {};
        for (let formElementId in state.orderForm) {
            formData[formElementId] = state.orderForm[formElementId].value;
        }
        const order = {
            ingredients: props.ings,
            price: props.price,
            orderData: formData

        }
        props.onOrderBurger(order);
    }

    const checkValidity = (value, rules) => {
        let isValid = true;
        if (!rules){
            return true;
        }
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }
        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }
        return isValid;
    }

    const inputChangedHandler = (event, inputId) => {
        const newValue = event.target.value;
        const newValid = checkValidity(newValue, state.orderForm[inputId].validation);
        console.log(newValid,inputId);
        setState(prevState => {
            const updatedOrderForm = {
                ...prevState.orderForm,
                [inputId]: {
                    ...prevState.orderForm[inputId],
                    value: newValue,
                    valid: newValid,
                    touched: true
                }
            };

            let formIsValid = true;
            for (let inputIdentifier in updatedOrderForm) {
                formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
            }

            return {
                ...prevState,
                orderForm: updatedOrderForm,
                formIsValid: formIsValid
            };
        });
    }

    const formsArray = [];
    for (let key in state.orderForm) {
        formsArray.push({
            id: key,
            config: state.orderForm[key]
        });
    }
    let forms = (<form>
        {formsArray.map(form => (
            <Input key={form.id} elementType={form.config.elementType} elementConfig={form.config.elementConfig}
                   invalid={!form.config.valid}
                   shouldValidate={form.config.validation}
                   touched={form.config.touched}
                   value={form.config.value} changed={(e) => inputChangedHandler(e, form.id)}/>
        ))}
        <Button btnType="Success" disabled={!state.formIsValid} clicked={orderHandler}>ORDER</Button>
    </form>);

    if (props.loading) {
        forms = <Spinner/>
    }
    return (
        <div className="ContactData">
            <h4>Enter you Contact Data</h4>
            {forms}

        </div>
    );
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData) => dispatch(actionTypes.purchaseBurger(orderData))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(WithErrorHandler(ContactData,axios))
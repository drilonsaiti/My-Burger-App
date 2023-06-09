import React, {useState} from "react";
import Button from "../../../components/UI/Button/Button";
import "./ContactData.css"
import {useLocation, useNavigate} from "react-router-dom";
import axios from "../../../axios-order";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

const ContactData = () => {
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
                    required: true
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
        loading: false
    }));
    const location = useLocation();
    const {ingredients, price} = location.state || {};
    const navigate = useNavigate();

    const orderHandler = (e) => {
        e.preventDefault();
        setState(prevState => {
            prevState.loading = true;
            return {...prevState};
        });
        const formData = {};
        for (let formElementId in state.orderForm) {
            formData[formElementId] = state.orderForm[formElementId].value;
        }
        const order = {
            ingredients: ingredients,
            price: price,
            orderData: formData

        }
        axios.post('/orders.json', order)
            .then(response => {
                setState({...state, loading: false});
                navigate('/')
            })
            .catch(error => {
                setState({...state, loading: false});
            });
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
        return isValid;
    }

    const inputChangedHandler = (event, inputId) => {
        const newValue = event.target.value;
        const newValid = checkValidity(newValue, state.orderForm[inputId].validation);

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

    if (state.loading) {
        forms = <Spinner/>
    }
    return (
        <div className="ContactData">
            <h4>Enter you Contact Data</h4>
            {forms}

        </div>
    );
}

export default ContactData
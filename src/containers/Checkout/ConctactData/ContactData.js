import React, {useState} from "react";
import Button from "../../../components/UI/Button/Button";
import "./ContactData.css"
import {useLocation, useNavigate} from "react-router-dom";
import axios from "../../../axios-order";
import Spinner from "../../../components/UI/Spinner/Spinner";
const ContactData = () => {
    const [state,setState] = useState(({
        name:'',
        email: '',
        address: {
            street:'',
            postalCode: '',
        },
        loading: false
    }));
    const location = useLocation();
    const { ingredients,price } = location.state || {};
    const navigate = useNavigate();

    const orderHandler = (e) => {
        e.preventDefault();
        const order = {
            ingredients: ingredients,
            price: price,
            customer: {
                name: 'Drilon Saiti',
                address: {
                    street: 'Teststreet 1',
                    zipCode: '1600',
                    country: 'Macedonia'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post( '/orders.json', order )
            .then( response => {
                setState( { ...state,loading: false } );
                navigate('/')
            } )
            .catch( error => {
                setState( { ...state,loading: false } );
            } );
    }


    let forms = (<form>
        <input className={"Input"} type="text" name="name" placeholder="Your name"/>
        <input className={"Input"} type="email" name="email" placeholder="Your email"/>
        <input className={"Input"} type="text" name="street" placeholder="Street"/>
        <input className={"Input"} type="text" name="postalCode" placeholder="Postal Code"/>
        <Button btnType="Success" clicked={orderHandler}> ORDER </Button>
    </form>);

    if(state.loading){
        forms = <Spinner/>
    }
    return(
      <div className="ContactData">
          <h4>Enter you Contact Data</h4>
          {forms}

      </div>
    );
}

export default ContactData
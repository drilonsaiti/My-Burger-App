// App.js
import React from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ContactData from "./containers/Checkout/ConctactData/ContactData";
import Orders from "./containers/Orders/Orders";

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>

                    <Route path="/checkout" element={<Checkout />}>
                        <Route path={"/checkout"+"/contact-data"}
                               element={<ContactData/>}/>
                    </Route>
                    <Route path="/orders" element={<Orders/>}/>
                    <Route path="/" element={<BurgerBuilder />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

export default App;

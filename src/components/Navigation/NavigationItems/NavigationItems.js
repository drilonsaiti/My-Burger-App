import React from "react";
import './NavigationItems.css'
import NavigationItem from "./NavigationItem/NavigationItem";
const NavigationItems = () => (
    <ul className="NavigationItems">
        <NavigationItem link='/' >Burger Builder</NavigationItem>
        <NavigationItem link='/orders'>Orders</NavigationItem>

    </ul>
);

export default React.memo(NavigationItems);
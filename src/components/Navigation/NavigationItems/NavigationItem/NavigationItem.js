import React from "react";
import './NavigationItem.css'
import { Link, useMatch } from "react-router-dom";

const NavigationItem = (props) => {
    const match = useMatch(props.link);
    const activeClass = match ? 'active' : '';

    return (
        <li className="NavigationItem">
            <Link to={props.link} className={activeClass}>
                {props.children}
            </Link>
        </li>
    );
};

export default React.memo(NavigationItem);

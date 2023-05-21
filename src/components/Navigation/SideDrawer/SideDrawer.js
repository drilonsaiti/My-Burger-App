import React, {Fragment} from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import  './SideDrawer.css'
import Modal from "../../UI/Modal/Modal";
import Backdrop from "../../UI/Backdrop/Backdrop";
const SideDrawer = (props) => {
    let attachedClasses = ['SideDrawer','Close'];
    if (props.open){
        attachedClasses = ['SideDrawer','Open']
    }
    return(
        <Fragment>
            <Backdrop show={props.open} clicked={props.closed}/>
        <div className={attachedClasses.join(' ')}>
            <div style={{height: '11%',marginBottom: '32px'}}>
                <Logo />

            </div>
            <nav>
                <NavigationItems></NavigationItems>

            </nav>
        </div>
        </Fragment>
    );
};

export default React.memo(SideDrawer);
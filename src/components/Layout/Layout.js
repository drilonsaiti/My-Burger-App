import React, {Fragment, useState} from "react";
import Toolbar from "../Navigation/Toolbar/Toolbar/Toolbar";
import  './Layout.css'
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

const Layout = (props) => {

    const [showSideDrawer,updateSideDrawer] = useState({
        showSideDr: true
    })
    const sideDrawerCloseHandler = () => {
        updateSideDrawer({showSideDr: false})
    }

    const sideDrawerToggleHandler = () => {
        updateSideDrawer(prevState =>
        { return {showSideDr: !prevState.showSideDr}})
    }

    return(
    <Fragment>

        <Toolbar drawerTogleClicked={sideDrawerToggleHandler}/>
        <SideDrawer open={showSideDrawer.showSideDr} closed={sideDrawerCloseHandler}/>
        <main className="Content">
            {props.children}
        </main>
    </Fragment>
    )

}

export default Layout
import React from "react";
import './Toolbar.css'
import Logo from "../../../Logo/Logo";
import NavigationItem from "../../NavigationItems/NavigationItem/NavigationItem";
import NavigationItems from "../../NavigationItems/NavigationItems";
import DrawerToggle from "../../SideDrawer/DrawerToggle/DrawerToggle";
const Toolbar = (props) => (
    <header className="Toolbar">
        <DrawerToggle clicked={props.drawerTogleClicked}/>
        <div style={{height: '80%'}}>
        <Logo />
        </div>
        <nav className="DesktopOnly">

            <NavigationItems/>
        </nav>
    </header>
);

export default React.memo(Toolbar);
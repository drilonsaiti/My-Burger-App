import React, {Fragment} from "react";
const Layout = (props) => (
    <Fragment>
        <div>Tolbar,SideDrawe,Backdrop</div>
        <main className="Content">
            {props.children}
        </main>
    </Fragment>

)

export default Layout
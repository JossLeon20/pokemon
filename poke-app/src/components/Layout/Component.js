import React from "react";
import "../../css/general.css";

import { Header } from "..";

const Layout = (props) => {
const { children } = props;

    return(
        <div>
            <Header />
            {
                children
            }
        </div>
    )
    
}

export default Layout;
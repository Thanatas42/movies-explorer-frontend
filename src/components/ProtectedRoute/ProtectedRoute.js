import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...props }) => {
    //props.loggedIn ? <Component {...props} /> : <Redirect to="./" />
    return (
        <Route>
            {() =><Component {...props} />
                
            }
        </Route>
    );
};

export default ProtectedRoute; 
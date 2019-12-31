import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { isAuthenticated } from "../helper/auth";


function PrivateRoute({ children, ...rest }) {
    if (!isAuthenticated()) console.log('권한이 없습니다...')
    return (
        <Route
            {...rest}
            render={({ location }) =>
                isAuthenticated() ? (
                    children
                ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: location }
                            }}
                        />
                    )
            }
        />
    );
}

export default PrivateRoute
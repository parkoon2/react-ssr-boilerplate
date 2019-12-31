// import Home from "./client/pages/home/home";
// import About from "./client/pages/about/about";
// import NotFound from "./client/pages/not-found/not-found";
import React from 'react'
import LoginPage from '../client/src/pages/Login';
import Private from '../client/src/pages/Private';

const Routes = [
    {
        url: "/",
        exact: true,
        component: LoginPage
    },
    {
        url: "/login",
        exact: true,
        component: LoginPage
    },
    {
        url: "/private",
        exact: false,
        component: Private
    },
    // {
    //     url: "*",
    //     exact: true,
    //     component: 404
    // }
];

export const MenuLinks = [
    {
        url: "/",
        menuText: "Home"
    },
    {
        url: "/about",
        menuText: "About"
    }
];

export default Routes;
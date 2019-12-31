import React from "react"
import { Route, Switch, Link, withRouter, Redirect } from 'react-router-dom'

// Components
import Header from './components/Header'
import PrivateRoute from "./router/PrivateRoute";
import Routes from '../../server/routes'
// HOC
import withSplitting from './hoc/withSplitting'

// Pages
// import Login from './pages/Login'
// import Private from "./pages/Private";

const Login = withSplitting(() => import('./pages/Login'))
const Private = withSplitting(() => import('./pages/Private'))

function App() {
  return <div className="app">

    <Header />

    <Switch>
      {Routes.map((c, index) => (
        <Route key={index} path={c.url} exact component={c.component} />
      ))}
    </Switch>

    {/* <Switch>
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <PrivateRoute path="/private">
        <Private />
      </PrivateRoute>
    </Switch> */}
  </div>;
}

export default App;

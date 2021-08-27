import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import Logout from "../auth/Logout";
import NuevoPartido from "../partidos/NuevoPartido";
import ActualizarPartido from "../partidos/ActualizarPartido";

export default function HomePage(props) {
    return (
      <Suspense fallback={<h1>Loading...</h1>}>
        <Switch>
            {
                <Redirect exact from="/" to="/dashboard" />
            }
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/logout">
                <Logout autenticado={props.autenticado}/>
            </Route>
            <Route path="/nuevo-partido" component={NuevoPartido} />
            <Route path="/actualizar-partido/:id" component={ActualizarPartido} />
        </Switch>
    </Suspense>
    );
}
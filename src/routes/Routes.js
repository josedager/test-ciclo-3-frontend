import React, {useState} from "react";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import Login from '../ui/auth/Login';
import Registrar from "../ui/auth/Registrar";
import HomePage from "../ui/components/HomePage";
import Layout from "../ui/layout/Layout";

export const Routes = withRouter(({ history }) => {
    let usuario = localStorage.getItem("usuario");
    const [autenticado, setAutenticado] = useState(usuario);
    
    return(
        <Switch>
            {!autenticado ? (
                <>
                    {history.location.pathname.indexOf("/registrar") === 0 ? 
                        (
                            <Route path="/registrar" component={Registrar} />
                        ) :
                        (
                            <>
                                <Login autenticado={setAutenticado} />
                                <Redirect to="/login" />
                            </>
                        )
                    }
                </>
            ): (
                <Layout>
                    <HomePage autenticado={setAutenticado} />
                </Layout>
            )}
            
        </Switch>
    );
    
});
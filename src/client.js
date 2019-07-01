import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";

import { ThemeProvider } from "@material-ui/styles";
import theme from "./theme";

import Layout from "./components/Layout";
import createStore from "./store";

const store = createStore( window.REDUX_DATA );

function Main() {
    React.useEffect( () => {
        const jssStyles = document.querySelector( "#jss-server-side" );
        if ( jssStyles ) {
            jssStyles.parentNode.removeChild( jssStyles );
        }
    }, [] );

    return (

        <ReduxProvider store={ store }>
            <Router>
                <ThemeProvider theme={ theme }>
                    <Layout />
                </ThemeProvider>
            </Router>
        </ReduxProvider>
    );
}

const app = document.getElementById( "app" );
ReactDOM.hydrate( <Main />, app );

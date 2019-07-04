import express from "express";
import path from "path";

import React from "react";
import { ServerStyleSheets, ThemeProvider } from "@material-ui/styles";
import { renderToString } from "react-dom/server";
import { StaticRouter, matchPath } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import Helmet from "react-helmet";
import routes from "./routes";
import Layout from "./components/Layout";
import createStore, { initializeSession } from "./store";
import theme from "./theme";

const app = express();

app.use(express.static(path.resolve(__dirname, "../dist")));

app.get("/*", (req, res) => {
  const context = {};
  const store = createStore();

  store.dispatch(initializeSession());

  const dataRequirements = routes
    .filter(route => matchPath(req.url, route)) // filter matching paths
    .map(route => route.component) // map to components
    .filter(comp => comp.serverFetch) // check if components have data requirement
    .map(comp => store.dispatch(comp.serverFetch())); // dispatch data requirement

  Promise.all(dataRequirements).then(() => {
    const jsx = (
      <ReduxProvider store={store}>
        <StaticRouter context={context} location={req.url}>
          sheets.collect(
          <ThemeProvider theme={theme}>
            <Layout />
          </ThemeProvider>
          , ),
        </StaticRouter>
      </ReduxProvider>
    );
    const sheets = new ServerStyleSheets();
    // Grab the CSS from our sheets.
    const css = sheets.toString();

    const reactDom = renderToString(jsx);
    const reduxState = store.getState();
    const helmetData = Helmet.renderStatic();

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(htmlTemplate(reactDom, reduxState, helmetData, css));
  });
});

app.listen(2048);

function htmlTemplate(reactDom, reduxState, helmetData, css) {
  return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta
                name="viewport"
                content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
            />
            <meta charset="utf-8">
            ${helmetData.title.toString()}
            ${helmetData.meta.toString()}
            <title>React SSR</title>
            <style id="jss-server-side">${css}</style>
        </head>
        
        <body>
            <div id="app">${reactDom}</div>
            <script>
                window.REDUX_DATA = ${JSON.stringify(reduxState)}
            </script>
            <script src="./app.bundle.js"></script>
        </body>
        </html>
    `;
}

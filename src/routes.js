import Home from "./components/Home";
import About from "./components/About";
import Season from "./components/Season";
import Secret from "./components/Secret";

export default [
    {
        path: "/",
        component: Home,
        exact: true,
    },
    {
        path: "/about",
        component: About,
        exact: true,
    },
    {
        path: "/season",
        component: Season,
        exact: true,
    },
    {
        path: "/secret",
        component: Secret,
        exact: true,
    },
];

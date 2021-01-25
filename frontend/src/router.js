import React, { lazy, Suspense } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { PUBLIC_ROUTE } from "./router.constants";
import PrivateRoute from "./components/routes/privateRoute";


const publicRoutes = [
  {
    path: PUBLIC_ROUTE.LANDING,
    exact: true,
    component: lazy(() => import("./Pages/main/main")),
  },
  {
    path: PUBLIC_ROUTE.BLOGPOST,
    exact: true,
    component: lazy(() => import("./Pages/blogPage/blogPage")),
  },
  {
    path: PUBLIC_ROUTE.LOGIN,
    exact: true,
    component: lazy(() => import("./Pages/login/login")),
  },
];

const privateRoutes = [
  {
    path: PUBLIC_ROUTE.CMS,
    exact: true,
    component: lazy(() => import("./Pages/cms/cms")),
  },
];

export default function Routes() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Router>
        <Switch>
          {publicRoutes.map((route, index) => (
            <Route key={index} path={route.path} exact={route.exact}>
              <route.component />
            </Route>
          ))}
          
          {privateRoutes.map((route, index) => (
            // <Route key={index} path={route.path} exact={route.exact}>
            //   <route.component />
            // </Route>
          
            <PrivateRoute component = {route.component} key={index} path={route.path} exact={route.exact} ></PrivateRoute>
          ))}
        </Switch>
      </Router>
    </Suspense>
  );
}

// {
//   path: PUBLIC_ROUTE.ABOUT,
//   exact: true,
//   component: lazy(() => import('./Pages/about')),
// },
// {
//   path: PUBLIC_ROUTE.CONTACTUS,
//   exact: true,
//   component: lazy(() => import('./Pages/contact')),
// },

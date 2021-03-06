import React, { lazy, Suspense } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { PUBLIC_ROUTE } from "./router.constants";
import PrivateRoute from "./components/routes/privateRoute";
import BasicLoader from "./components/loaders/basicLoader";

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
  {
    path: PUBLIC_ROUTE.LOCAL,
    exact: true,
    component: lazy(() => import("./Pages/localView/localView")),
  },
  {
    path: PUBLIC_ROUTE.UNDERCONSTRUCTION,
    exact: true,
    component: lazy(() => import("./Pages/underConstruction")),
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
    <Suspense fallback={""}>
      <Router>
        <Switch>
          {publicRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={route.component}
            />
          ))}

          {privateRoutes.map((route, index) => (
            <PrivateRoute
              component={route.component}
              key={index}
              path={route.path}
              exact={route.exact}
            />
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

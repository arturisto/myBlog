import React, { lazy, Suspense } from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';
import { PUBLIC_ROUTE } from './router.constants';



const publicRoutes = [
    {
      path: PUBLIC_ROUTE.LANDING,
      exact: true,
      component: lazy(() => import('./Pages/main/main')),
    },
    {
      path: PUBLIC_ROUTE.BLOGPOST,
      exact: true,
      component: lazy(() => import('./Pages/blogPage/blogPage')),
    }
]

export default function Routes() {

    return(
        <Suspense fallback ={<div>Loading...</div>}>
            <Router>    
                    <Switch>
                        {publicRoutes.map((route, index) => (
                        <Route key={index} path={route.path} exact={route.exact}>
                            <route.component/>
                        </Route>
                        ))}
                    </Switch>
            </Router>
        </Suspense>     
    )
}
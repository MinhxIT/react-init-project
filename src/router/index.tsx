import React, { ComponentType, Suspense } from 'react';
import { BrowserRouter, MemoryRouter, Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';

const Login = React.lazy(() => import('../pages/Login'));
const Register = React.lazy(() => import('../pages/Register'));
const Home = React.lazy(() => import('../pages/Home'));

export const routes: Array<{
    path: string;
    component?: React.LazyExoticComponent<(props: RouteComponentProps) => JSX.Element>;
    exact?: boolean;
    auth?: boolean;
    nonAuth?: boolean;
    redirect?: string;
}> = [
        { path: '/login', exact: true, component: Login, nonAuth: true, redirect: '/home' },
        { path: '/register', exact: true, component: Register, nonAuth: true, redirect: '/home' },
        { path: '/home', exact: true, component: Home, auth: true, redirect: '/login' },
    ];

const loading = (
    <div className="pt-3 text-center">
        <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
)

const Router = () => {
    const ParentRouter: ComponentType = BrowserRouter;

    const authenticated = true;

    return <ParentRouter>
        <Switch>
            {routes.map((route, idx) => {
                return (
                    <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        render={props => (
                            route.component && (
                                ((authenticated && route.auth) || (!authenticated && route.nonAuth)) ?
                                    (
                                        <Suspense fallback={loading} key={idx}>

                                            <route.component {...props} />
                                        </Suspense>

                                    ) : (
                                        <Redirect to={route.redirect ? route.redirect : (authenticated ? process.env.REACT_APP_REDIRECT_AUTH! : process.env.REACT_APP_REDIRECT_UNAUTH!)} />
                                    )
                            )
                        )} />
                )
            })}
        </Switch>
    </ParentRouter>
}

export default Router
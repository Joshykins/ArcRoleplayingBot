import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Loader } from '../components/loader/loader';
import Navigation from '../components/navigation/Navigation';
import Home from '../pages/home/home';

const NotFound = React.lazy(()=>import('../components/404/404'));

export const AppRouter = () => {
  return (
    <>
      <React.Suspense fallback={<div>Loading...</div>}>
        <BrowserRouter> 
          {/*Switch component renders first match on route, if not, it renders not found page.*/}
          <Navigation></Navigation>
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route component={NotFound} exact/>
          </Switch>
          <Loader/>
        </BrowserRouter>
      </React.Suspense>
    </>
  );
};

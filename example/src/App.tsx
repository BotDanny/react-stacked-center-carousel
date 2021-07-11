import React from 'react';
import SideNav, { examples, introductions } from './sideNav'
import { Switch, Route } from 'react-router-dom'
const App = () => {

  return (
    <div className='root-content'>
      <SideNav />
      <main>
        <Switch>
          {examples.map(({ route, component }) => {
            const Page = component as any;
            return (
              <Route path={route} exact key={route}>
                <Page />
              </Route>
            );
          })}
          {introductions.map(({ route, component }) => {
            const Page = component as any;
            return (
              <Route path={route} exact  key={route}>
                <Page />
              </Route>
            );
          })}
        </Switch>
      </main>
    </div>
  );
};

export default App;

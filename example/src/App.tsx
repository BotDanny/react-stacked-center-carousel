import React from 'react';
import SideNav, { examples, introductions, api, propExamples } from './sideNav';
import { Switch, Route } from 'react-router-dom';
const App = () => {
  const pages = [examples, introductions, api, propExamples].flat();
  console.log(pages)
  return (
    <div className='root-content'>
      <SideNav />
      <main>
        <Switch>
          {pages.map(({ route, component }) => {
            const Page = component as any;
            return (
              <Route path={route} exact key={route}>
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

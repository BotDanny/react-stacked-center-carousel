import React from 'react';
import SideNav, { examples, introductions, api, propExamples } from './sideNav';
import { Switch, Route } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
const App = () => {
  const pages = [examples, introductions, api, propExamples].flat();
  const [openNav, setNav] = React.useState(false);
  return (
    <div className='root-content'>
      <SideNav openNav={openNav}/>
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
      <Fab
        color='primary'
        aria-label='add'
        onClick={() => setNav(!openNav)}
        className="toggle-button"
        size='small'
      >
        <MenuOpenIcon />
      </Fab>
    </div>
  );
};

export default App;

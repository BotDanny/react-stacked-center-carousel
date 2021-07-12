import React from 'react';
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography
} from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';
import Demo from './pages/Demo';
import PropsPage from './pages/CarouselPropPage';
import ResponsiveContainerPropPage from './pages/ResponsiveContainer';
import CommonQuestionPage from './pages/CommonQuestionPage';
import ResponsiveExamplePage from './pages/ResponsiveExamplePage';
import fadeDistanceExamplePage from './pages/FadeDistanceExample';
import CustomScaleExamplePage from './pages/CustomScaleExample';
import PaginationExamplePage from './pages/PaginationExample';
import TwitchExample from './pages/Twitch';

export default function SideNav() {
  const { pathname } = useLocation();
  return (
    <div>
      <Drawer variant='permanent' anchor='left'>
        <Typography
          variant='h6'
          className='site-title'
          component='a'
          href='https://github.com/BotDanny/react-stacked-center-carousel'
          target='_blank'
          style={{ fontSize: 18 }}
        >
          stacked-center-carousel
        </Typography>
        <Divider />
        <List>
          {[introductions, api, examples, propExamples].map((pages, index) => {
            return (
              <div key={index}>
                <ListItem>
                  <ListItemText
                    primary={titles[index]}
                    className='first-level'
                  />
                </ListItem>
                {pages.map(({ label, route }) => (
                  <ListItem
                    button
                    key={label}
                    className='second-level'
                    component={Link}
                    to={route}
                    selected={pathname === route}
                  >
                    <ListItemText primary={label} />
                  </ListItem>
                ))}
              </div>
            );
          })}
        </List>
      </Drawer>
    </div>
  );
}

const titles = ['Introduction', 'API', 'Examples', 'Prop example'];

export const introductions = [
  {
    label: 'Demo',
    route: '/',
    component: Demo
  },
  {
    label: 'Common question',
    route: '/question',
    component: CommonQuestionPage
  }
];

export const api = [
  { label: 'StackedCarousel', route: '/StackedCarousel', component: PropsPage },
  {
    label: 'ResponsiveContainer',
    route: '/responsivecontainer',
    component: ResponsiveContainerPropPage
  }
];

export const examples = [
  {
    label: 'Twitch.tv',
    route: '/twitch',
    component: TwitchExample
  },
  {
    label: 'Responsive',
    route: '/responsive',
    component: ResponsiveExamplePage
  },
  {
    label: 'Pagination',
    route: '/pagination',
    component: PaginationExamplePage
  }
];

export const propExamples = [
  {
    label: 'fadeDistance',
    route: '/fadeDistance',
    component: fadeDistanceExamplePage
  },
  {
    label: 'customScales',
    route: '/customScales',
    component: CustomScaleExamplePage
  }
];

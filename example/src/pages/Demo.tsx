import React from 'react';
import {
  Divider,
  Box,
  Typography
} from '@material-ui/core';
import ResponsiveCarousel from './carouselGenerator';
import Highlight from 'react-highlight';

const Demo = () => {
  return (
    <div>
      <ResponsiveCarousel useGrabCursor={true}/>
      <p className='sectionTitle'>Installation</p>
      <Divider />
      <Box p={0} pt={1} pb={0}>
        <Typography variant='body1'>
          See the github link{' '}
          <Typography
            variant='body1'
            className='site-title'
            component='a'
            href='https://github.com/BotDanny/react-stacked-center-carousel'
            target='_blank'
          >
            react-stacked-center-carousel
          </Typography>
        </Typography>
      </Box>
      <p className='sectionTitle'>Limitations</p>
      <Divider />
      <Box p={0} pt={1} pb={0}>
        <Typography variant='body1'>
          react-stacked-center-carousel does not provid default pagination and button. That's it!
        </Typography>
      </Box>
      <p className='sectionTitle'>Why use react-stacked-center-carousel?</p>
      <Divider />
      <Box p={0} pt={1} pb={1}>
        <ul>
          {benefits.map((content, index) => {
            return (
              <li key={index}>
                <Typography variant='body1' style={{ fontWeight: 600 }}>
                  <span>{content}</span>
                </Typography>
              </li>
            );
          })}
        </ul>
      </Box>
      <p className='sectionTitle'>Demo Code</p>
      <Divider />
      <Box p={0} pt={1} pb={1}>
        <Highlight className='javascript'>{code}</Highlight>
      </Box>
    </div>
  );
};

const caveats = [
  'If you set the transition time to be high and swipe react-stacked-center-carousel at an high frequency, then the transition might appear a little wired (This is due to the nature of how react-stacked-center-carousel is implemented). This can be mitigated by setting a wait period before the next swipe can be triggered, using the useCoolDown prop.',
  'react-stacked-center-carousel does not provide default button and pagination component. However, it does provide a prop called onActiveSlideChange for you to implement your own pagination component.',
  'react-stacked-center-carousel only allows you to swipe 1 slide at a time.'
];

const benefits = [
  'The only non-react-native npm package that offers a responsive, draggable, center mode stacked carousel that scales its slides.',
  'Extremely performant: only the visible slides are rendered, no component unmounting and 1 re-render on 1 of your slide component per swipe (with appropriate memoization).',
  'react-stacked-center-carousel is responsive! It also allows you to display a variable amount of slide based on container width.',
  'Smooth transition with fade in and fade out animation.',
  'Touch screen support.',
  'Infinite(looped) swiping.'
];

const Card = React.memo(
  function (props: any) {
    const { data, dataIndex } = props;
    const { cover } = data[dataIndex];
    return (
      <div
        style={{
          width: '100%',
          height: 300,
          cursor: 'pointer'
        }}
        className='card'
      >
        <img
          style={{
            height: '100%',
            width: '100%',
            objectFit: 'cover',
            borderRadius: 10
          }}
          draggable={false}
          src={cover}
        />
      </div>
    );
  },
  function () {
    return false;
  }
);

export default Demo;

const code = `import { StackedCarousel, ResponsiveContainer, slideProp } from 'react-stacked-center-carousel';
import Fab from '@material-ui/core/Fab';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const data = [{cover: 'https://coverfiles.alphacoders.com/664/66426.jpg', title: 'Interstaller'} ...];

function ResponsiveCarousel() {
    // If you want to use a ref to call the method of StackedCarousel, you cannot set the ref directly on the carousel component
    // This is because ResponsiveContainer will not render the carousel before its parent's width is determined
    // containerWidth is determined after your parent component mounts. Thus if you set the ref directly it will not work since the carousel is not rendered
    // Thus you need to pass your ref object to the ResponsiveContainer as the carouselRef prop and in your render function you will receive this ref object
    const ref = React.useRef<ResponsiveContainer>();
    return (
      <div style={{ width: '100%', position: 'relative' }}>
            // ResponsiveContainer will have the same width as its parent element
            <ResponsiveContainer carouselRef={ref} render={(containerWidth, carouselRef) => {
                        let currentVisibleSlide = 5;
                        if (containerWidth <= 1280) currentVisibleSlide = 3;
                        if (containerWidth <= 720) currentVisibleSlide = 1;
                        return (
                            <StackedCarousel
                                    ref={carouselRef}
                                    data={data}
                                    carouselWidth={containerWidth}
                                    slideWidth={500}
                                    slideComponent={Card}
                                    maxVisibleSlide={5}
                                    currentVisibleSlide={currentVisibleSlide}
                                    fadeDistance={100}
                                    useGrabCursor={true}
                                    useCoolDown={250}
                            />
            )}}/>
            <Fab ... onClick={() => ref.current.goBack()}>
                <ArrowBackIcon />
            </Fab>
            <Fab ... onClick={() => ref.current.goNext()}>
                <ArrowForwardIcon />
            </Fab>
      </div>
    );
}

// Very important to memoize your component!!!
const Card = React.memo(
    function (props: slideProp) {
        const { data, dataIndex } = props;
        const { cover } = data[dataIndex];
        return (
            <div style={{width: '100%', height: 300, userSelect: "none"}}>
                <img
                    style={{height: '100%', width: '100%', objectFit: 'cover', borderRadius: 10}}
                    draggable={false}
                    src={cover}
                />
            </div>
        );
    },
    function (prev: slideProp, next: slideProp) {
      return prev.dataIndex === next.dataIndex;
    }
);`;

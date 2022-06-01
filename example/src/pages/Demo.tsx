import React from 'react';
import { Divider, Box, Typography } from '@material-ui/core';
import ResponsiveCarousel, { CodeHighlight } from './carouselGenerator';

const Demo = () => {
  return (
    <div>
      <ResponsiveCarousel useGrabCursor={true} />
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
          react-stacked-center-carousel does not provid default pagination and
          button. That's it!
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
      <p className='sectionTitle'>Demo Code (Copy and paste into a new file and you can start exploring!)</p>
      <Divider />
      <CodeHighlight code={code} />
    </div>
  );
};

const benefits = [
  'This is the only non-react-native npm package that offers a responsive, swipeable, center mode stacked carousel that scales its slides.',
  'Extremely performant: only the visible slides are rendered, very minimum re-render with appropriate memoization.',
  'react-stacked-center-carousel is responsive! It also allows you to display a variable amount of slide based on container width.',
  'Smooth transition with fade in and fade out animation.',
  'Touch screen support.',
  'Infinite(looped) swiping.'
];

export default Demo;

const code = `import React from "react";
import {
  StackedCarousel,
  ResponsiveContainer,
} from "react-stacked-center-carousel";
import Fab from "@material-ui/core/Fab";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

export const data = [
  {
    cover: "https://images6.alphacoders.com/679/thumb-1920-679459.jpg",
    title: "Interstaller",
  },
  {
    cover: "https://images2.alphacoders.com/851/thumb-1920-85182.jpg",
    title: "Inception",
  },
  {
    cover: "https://images6.alphacoders.com/875/thumb-1920-875570.jpg",
    title: "Blade Runner 2049",
  },
  {
    cover: "https://images6.alphacoders.com/114/thumb-1920-1141749.jpg",
    title: "Icon man 3",
  },
  {
    cover: "https://images3.alphacoders.com/948/thumb-1920-948864.jpg",
    title: "Venom",
  },
  {
    cover: "https://images2.alphacoders.com/631/thumb-1920-631095.jpg",
    title: "Steins Gate",
  },
  {
    cover: "https://images4.alphacoders.com/665/thumb-1920-665242.png",
    title: "One Punch Man",
  },
  {
    cover: "https://images2.alphacoders.com/738/thumb-1920-738176.png",
    title: "A Silent Voice",
  },
  {
    cover: "https://images8.alphacoders.com/100/thumb-1920-1005531.jpg",
    title: "Demon Slayer",
  },
  {
    cover: "https://images2.alphacoders.com/582/thumb-1920-582804.png",
    title: "Attack On Titan",
  },
];


export default function ResponsiveCarousel(props) {
  const ref = React.useRef();
  return (
    <div style={{ width: "100%", position: "relative" }}>
      <ResponsiveContainer
        carouselRef={ref}
        render={(parentWidth, carouselRef) => {
          // If you want to use a ref to call the method of StackedCarousel, you cannot set the ref directly on the carousel component
          // This is because ResponsiveContainer will not render the carousel before its parent's width is determined
          // parentWidth is determined after your parent component mounts. Thus if you set the ref directly it will not work since the carousel is not rendered
          // Thus you need to pass your ref object to the ResponsiveContainer as the carouselRef prop and in your render function you will receive this ref object
          let currentVisibleSlide = 5;
          if (parentWidth <= 1440) currentVisibleSlide = 3;
          if (parentWidth <= 1080) currentVisibleSlide = 1;
          return (
            <StackedCarousel
              ref={carouselRef}
              slideComponent={Card}
              slideWidth={parentWidth < 800 ? parentWidth - 40 : 750}
              carouselWidth={parentWidth}
              data={data}
              currentVisibleSlide={currentVisibleSlide}
              maxVisibleSlide={5}
              useGrabCursor
            />
          );
        }}
      />
      <>
        <Fab
          style={{ position: "absolute", top: "40%", left: 10, zIndex: 10 }}
          size="small"
          color="primary"
          onClick={() => {
            ref.current?.goBack();
          }}
        >
          <ArrowBackIcon />
        </Fab>
        <Fab
          style={{ position: "absolute", top: "40%", right: 10, zIndex: 10 }}
          size="small"
          color="primary"
          onClick={() => {
            ref.current?.goNext(6);
          }}
        >
          <ArrowForwardIcon />
        </Fab>
      </>
    </div>
  );
}

// Very import to memoize your Slide component otherwise there might be performance issue
// At minimum your should do a simple React.memo(SlideComponent)
// If you want the absolute best performance then pass in a custom comparator function like below 
export const Card = React.memo(function (props) {
  const { data, dataIndex } = props;
  const { cover } = data[dataIndex];
  return (
    <div
      style={{
        width: "100%",
        height: 300,
        userSelect: "none",
      }}
      className="my-slide-component"
    >
      <img
        style={{
          height: "100%",
          width: "100%",
          objectFit: "cover",
          borderRadius: 0,
        }}
        draggable={false}
        src={cover}
      />
    </div>
  );
}, function (prev: StackedCarouselSlideProps, next: StackedCarouselSlideProps) {
  return prev.dataIndex === next.dataIndex;
});
`;

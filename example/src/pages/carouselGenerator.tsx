import React from 'react';
import {
  StackedCarousel,
  ResponsiveContainer,
  StackedCarouselSlideProps
} from 'react-stacked-center-carousel';
import { Box, Typography } from '@material-ui/core';
import Highlight from 'react-highlight';
import Fab from '@material-ui/core/Fab';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

export const data = [
  {
    cover: 'https://coverfiles.alphacoders.com/664/66426.jpg',
    title: 'Interstaller'
  },
  {
    cover: '	https://images2.alphacoders.com/851/thumb-1920-85182.jpg',
    title: 'Inception'
  },
  {
    cover: 'https://images6.alphacoders.com/875/thumb-1920-875570.jpg',
    title: 'Blade Runner 2049'
  },
  {
    cover: 'https://images6.alphacoders.com/114/thumb-1920-1141749.jpg',
    title: 'Icon man 3'
  },
  {
    cover: 'https://images3.alphacoders.com/948/thumb-1920-948864.jpg',
    title: 'Venom'
  },
  {
    cover: 'https://images2.alphacoders.com/631/thumb-1920-631095.jpg',
    title: 'Steins Gate'
  },
  {
    cover: 'https://images4.alphacoders.com/665/thumb-1920-665242.png',
    title: 'One Punch Man'
  },
  {
    cover: 'https://images2.alphacoders.com/738/thumb-1920-738176.png',
    title: 'A Silent Voice'
  },
  {
    cover: 'https://images8.alphacoders.com/100/thumb-1920-1005531.jpg',
    title: 'Demon Slayer'
  },
  {
    cover: 'https://images2.alphacoders.com/582/thumb-1920-582804.png',
    title: 'Attack On Titan'
  }
];

interface props {
  fadeDistance?: number;
  transitionTime?: number;
  useGrabCursor?: boolean;
  useButton?: boolean;
  customScales?: number[];
  onActiveSlideChange?: (activeSlide: number) => void;
}

export default function ResponsiveCarousel(props: props) {
  const {
    fadeDistance,
    transitionTime = 450,
    useGrabCursor = true,
    useButton = true,
    customScales,
    onActiveSlideChange
  } = props;
  const ref = React.useRef<StackedCarousel>();
  return (
    <div style={{ width: '100%', position: 'relative' }}>
      <ResponsiveContainer
        carouselRef={ref}
        render={(width, carouselRef) => {
          let currentVisibleSlide = 5;
          if (width <= 1440) currentVisibleSlide = 3;
          if (width <= 1080) currentVisibleSlide = 1;
          return (
            <StackedCarousel
              ref={carouselRef}
              slideComponent={Card}
              slideWidth={750}
              carouselWidth={width}
              data={data}
              currentVisibleSlide={currentVisibleSlide}
              maxVisibleSlide={5}
              transitionTime={transitionTime}
              useGrabCursor={useGrabCursor}
              {...(customScales ? { customScales } : {})}
              {...(fadeDistance !== undefined ? { fadeDistance } : {})}
              {...(onActiveSlideChange ? { onActiveSlideChange } : {})}
            />
          );
        }}
      />
      {useButton && (
        <>
          <Fab
            style={{ position: 'absolute', top: '40%', left: 10, zIndex: 10 }}
            size='small'
            color='primary'
            onClick={() => {
              ref.current?.goBack();
            }}
          >
            <ArrowBackIcon />
          </Fab>
          <Fab
            style={{ position: 'absolute', top: '40%', right: 10, zIndex: 10 }}
            size='small'
            color='primary'
            onClick={() => {
              ref.current?.goNext();
            }}
          >
            <ArrowForwardIcon />
          </Fab>
        </>
      )}
    </div>
  );
}

export const Card = React.memo(
  function (props: StackedCarouselSlideProps) {
    const { data, dataIndex } = props;
    const { cover } = data[dataIndex];
    return (
      <div
        style={{
          width: '100%',
          height: 300,
          userSelect: 'none'
        }}
        className='my-slide-component'
      >
        <img
          style={{
            height: '100%',
            width: '100%',
            objectFit: 'cover',
            borderRadius: 0
          }}
          draggable={false}
          src={cover}
        />
      </div>
    );
  },
  function (prev: StackedCarouselSlideProps, next: StackedCarouselSlideProps) {
    return (
      prev.slideIndex === next.slideIndex &&
      prev.dataIndex === next.dataIndex &&
      prev.data === next.data
    );
  }
);

export const CodeHighlight = React.memo(function (props: { code: string }) {
  return (
    <Box p={0} pt={1} pb={1}>
      <Highlight className='typescript'>{props.code}</Highlight>
    </Box>
  );
});

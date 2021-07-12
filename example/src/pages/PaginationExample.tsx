import React from 'react';
import { Divider, Box, Typography } from '@material-ui/core';
import { data } from './carouselGenerator';
import ResponsiveCarousel from './carouselGenerator';
import Highlight from 'react-highlight';

const PaginationExamplePage = () => {
  const [centerSlideDataIndex, setCenterSlideDataIndex] = React.useState(0);
  const onCenterSlideDataIndexChange = React.useCallback((newIndex: number) => {
    setCenterSlideDataIndex(newIndex);
  }, []);

  return (
    <div>
      <p className='sectionTitle' style={{ marginTop: 0 }}>
        A simple pagination
      </p>
      <Divider />
      <Box p={0} mt={1} mb={4}>
        <Typography variant='body1'>
          react-stacked-center-carousel does not provide default pagination
          component. This is because most of the time developers use their own
          pagination component anyway.
        </Typography>
        <Typography variant='body1'>
          Instead, react-stacked-center-carousel provides an api called
          onActiveSlideChange to let developers make their own pagination.
        </Typography>
      </Box>
      <div style={{ width: '100%', position: 'relative' }}>
        <ResponsiveCarousel
          useGrabCursor={true}
          onActiveSlideChange={onCenterSlideDataIndexChange}
        />
      </div>
      <Pagination centerSlideDataIndex={centerSlideDataIndex} />
      <p className='sectionTitle' style={{ marginTop: 30 }}>
        Code
      </p>
      <Divider />
      <CodeBox />
    </div>
  );
};

export default PaginationExamplePage;

function Pagination(props: { centerSlideDataIndex: number }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: 20
      }}
    >
      {data.map((_, index) => {
        const isCenterSlide = props.centerSlideDataIndex === index;
        return (
          <div
            key={index}
            style={{
              height: 15,
              width: 15,
              borderRadius: '100%',
              background: isCenterSlide ? 'black' : 'none',
              border: '1px solid black'
            }}
          />
        );
      })}
    </div>
  );
}

const CodeBox = React.memo(function () {
  return (
    <Box p={0} pt={1} pb={1}>
      <Highlight className='javascript'>{code}</Highlight>
    </Box>
  );
});

const code = `const data = [{cover: 'https://coverfiles.alphacoders.com/664/66426.jpg', title: 'Interstaller'} ...];

function Pagination(props: { centerSlideDataIndex: number }) {
    return (
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
                {data.map((_, index) => {
                    const isCenterSlide = props.centerSlideDataIndex === index;
                    return <div style={{ height: 15, width: 15, borderRadius: '100%', background: isCenterSlide ? 'black' : 'none', border: '1px solid black' }}/>
                })}
            </div>
    );
}

function ResponsiveCarousel() {
    const [centerSlideDataIndex, setCenterSlideDataIndex] = React.useState(0);
    const onCenterSlideDataIndexChange = (newIndex: number) => {
        setCenterSlideDataIndex(newIndex);
    };
    // ResponsiveContainer will make the carousel to have the width of its parent
    return (
      <div style={{ width: '100%', position: 'relative' }}>
            <ResponsiveContainer render={(parentWidth) => {
                        let currentVisibleSlide = 5;
                        if (parentWidth <= 1280) currentVisibleSlide = 3;
                        if (parentWidth <= 720) currentVisibleSlide = 1;
                        return (
                            <StackedCarousel
                                    data={data}
                                    carouselWidth={parentWidth}
                                    slideWidth={500}
                                    slideComponent={Card}
                                    maxVisibleSlide={5}
                                    currentVisibleSlide={currentVisibleSlide}
                                    onActiveSlideChange={onCenterSlideDataIndexChange}
                            />
            )}}/>
            <Pagination centerSlideDataIndex={centerSlideDataIndex} />
      </div>
    );
}`;

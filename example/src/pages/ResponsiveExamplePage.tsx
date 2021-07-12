import React from 'react';
import { Divider, Box, Typography } from '@material-ui/core';
import ResponsiveCarousel from './carouselGenerator';
import Highlight from 'react-highlight';

const ResponsiveExamplePage = () => {
  return (
    <div>
      <p className='sectionTitle' style={{ marginTop: 0 }}>
        Setting breakpoints
      </p>
      <Divider />
      <Box p={0} pt={1} pb={0} mb={2}>
        <Typography variant='body1'>
          If you want to your carousel to be responsive, then you need to use
          the ResponsiveContainer component. If you also want to display
          different amount of slides at different width, then you need to use
          the parentWidth argument provided in the render function to
          determine the amount of slide to display and pass that value as
          currentVisibleSlide prop to the carousel component.
        </Typography>
        <Typography variant='body1'>
          The example below is a responsive carousel that changes the amount of
          slide displayed (1-5) based on viewport width.
        </Typography>
      </Box>
      <ResponsiveCarousel useGrabCursor={false} useButton={false}/>
      <p className='sectionTitle'>Code</p>
      <Divider />
      <Box p={0} pt={1} pb={1}>
        <Highlight className='javascript'>{code}</Highlight>
      </Box>
    </div>
  );
};

const code = `import { StackedCarousel, ResponsiveContainer, StackedCarouselSlideProps } from 'react-stacked-center-carousel';

const data = [{cover: 'https://coverfiles.alphacoders.com/664/66426.jpg', title: 'Interstaller'} ...];

function ResponsiveCarousel() {
    const ref = React.useRef<ResponsiveContainer>();
    return (
      <div style={{ width: '100%', position: 'relative' }}>
            // ResponsiveContainer will have the same width as its parent element
            <ResponsiveContainer carouselRef={ref} render={(parentWidth, carouselRef) => {
              let currentVisibleSlide = 5;
              if (parentWidth <= 1440) currentVisibleSlide = 3;
              else if (parentWidth <= 1080) currentVisibleSlide = 1;
              return (
                  <StackedCarousel
                          ref={carouselRef}
                          data={data}
                          carouselWidth={parentWidth}
                          slideWidth={750}
                          slideComponent={Slide}
                          maxVisibleSlide={5}
                          currentVisibleSlide={currentVisibleSlide}
                          useGrabCursor={true}
                  />
              )}}/>
      </div>
    );
}

// Very important to memoize your component!!!
const Card = React.memo(
    function (props: StackedCarouselSlideProps) {
        const { data, dataIndex } = props;
        const { cover } = data[dataIndex];
        return (
            <div style={{width: '100%', height: 300}}>
                <img
                    style={{height: '100%', width: '100%', objectFit: 'cover', borderRadius: 10}}
                    draggable={false}
                    src={cover}
                />
            </div>
        );
    },
    function (prev: StackedCarouselSlideProps, next: StackedCarouselSlideProps) {
      return prev.dataIndex === next.dataIndex;
    }
);`;

export default ResponsiveExamplePage;

import React from 'react';
import { Divider, Box, Typography } from '@material-ui/core';
import ResponsiveCarousel from './carouselGenerator';
import Highlight from 'react-highlight';

const PerformancePage = () => {
  return (
    <div>
      <p className='sectionTitle' style={{ marginTop: 0 }}>
        A note on performance:
      </p>
      <Divider />
      <Box p={0} pt={1} pb={0}>
        <Typography variant='body1'>
          react-stacked-center-carousel is virtualized, meaning that it only renders
          slides that the user can see. Thus, if you have 5 slides to display,
          then react-stacked-center-carousel will render 5 (visible slide) + 2
          (invisible slide) = 7 slides in total. The 2 extra slides rendered are
          used for fade in/out animation. This should significantly improve the
          rendering performance of your app.
        </Typography>
        <Typography variant='body1' style={{ fontWeight: 600 }}>
          However, I highly encourage you to memoize your slide component by
          either using React.memo or extending PureComponent. This is because
          when you drag the carousel (by holding down mouse or by touch), the
          position of each slide will be updated in real time based on your
          swipe displacement. This means that A LOT of re-renders will be
          triggered, usually 100+ for a small swipe. Thus, without memoization,
          you will likely to experience poor render performance.
        </Typography>
      </Box>
      <Box p={0} pt={1} pb={1}>
        <Highlight className='javascript'>{code}</Highlight>
      </Box>
      <p className='sectionTitle'>
        An advanced note on how react-stacked-center-carousel works:
      </p>
      <Divider />
      <Box p={0} pt={1} pb={0}>
        <Typography variant='body1'>
          react-stacked-center-carousel is virtualized, but more than that, it is
          virtualized in clever way. It uses a concept called DOM recycling. In
          essense, when a slide is swiped out of the viewable area,
          react-stacked-center-carousel will update the position of the DOM that
          contains that slide to the front of the carousel. Thus, no DOM is
          added or removed in the process, which also means no component is
          unmounted. If you want to learn more about this concept, please check
          out my other library <a href="https://github.com/BotDanny/react-recycled-list" target="_blanks">react-recycled-list</a>, it provides virtualized
          lists that are much more performant than traditional
          virtualizing/windowing library.
        </Typography>
      </Box>
    </div>
  );
};

export default PerformancePage;

const code = `// This is for Typescript 
import { slideProp } from 'react-stacked-center-carousel';

function areDataIndexEqual(prev: slideProp, next: slideProp) {
    return prev.dataIndex === next.dataIndex;
}

function areDataIndexOrSlideIndexEqual(prev: slideProp, next: slideProp) {
    return prev.dataIndex === next.dataIndex && prev.slideIndex === next.slideIndex;
}

// There are 4 props provided to your slide component: data, dataIndex, slideIndex, and swipStarted.
// If you only care about change in dataIndex, then you can use the function areDataIndexEqual which checks if the previous dataIndex is the same as the next dataIndex.
// In this case, only 1 rerender on 1 of your slide will be triggered when swiping (on goNext() or goBack()).
const MySlideComponent = React.memo(function() {
    return (
        ...
    )
}, areDataIndexEqual)

// If you care about change in dataIndex and slideIndex, then you can use the function areDataIndexOrSlideIndexEqual which checks both the dataIndex prop and the slideIndex prop.
// In this case, all slides will rerender once on every swipe.
const MySlideComponent = React.memo(function() {
    return (
        ...
    )
}, areDataIndexOrSlideIndexEqual)

// If you also care about all props, then you don't have to provide custom equality checking function to React.memo.
// In this case, all slides will rerender once on every swipe or drag.
const MySlideComponent = React.memo(function() {
    return (
        ...
    )
})
`;

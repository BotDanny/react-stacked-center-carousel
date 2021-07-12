import React from 'react';
import { Divider, Box, Typography } from '@material-ui/core';
import {CodeHighlight} from './carouselGenerator';

const PerformancePage = () => {
  return (
    <div>
      <p className='sectionTitle' style={{ marginTop: 0 }}>
        Performance did not meet expectation?
      </p>
      <Divider />
      <Box p={0} pt={1} pb={0}>
        <Typography variant='body1'>
          react-stacked-center-carousel is virtualized, meaning that it only
          renders slides that the user can see. Thus it should be quite
          performant.
        </Typography>
        <Typography variant='body1' style={{ fontWeight: 600 }}>
          However, I highly encourage you to memoize your slide component by
          either using React.memo or extending PureComponent. This is because
          when you are swiping the carousel (by mourse drag or by touch twipe),
          the position of each slide will be updated in real time based on your
          swipe displacement. This means that A LOT of re-renders will be
          triggered, usually 100+ for a small swipe. Thus, without memoization,
          you will likely to experience poor render performance.
        </Typography>
      </Box>
      <p className='sectionTitle'>Unexpected drag behavior?</p>
      <Divider />
      <Box p={0} pt={1} pb={0}>
        <Typography variant='body1'>
          when you want to swipe the carousel by drag, you should disable the
          drag on your slide component by setting {`draggable={false}`}.
          Otherwise the default browser drag behavor might be triggered.
        </Typography>
        <CodeHighlight code={code}/>
      </Box>
    </div>
  );
};

export default PerformancePage;


const code = `const MySlide = React.memo(function (props: StackedCarouselSlideProps) {
  // ...
  return (
    <div className='my-slide-component'>
      <img draggable={false}/>
    </div>
  );
});
`
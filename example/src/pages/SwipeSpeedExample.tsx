import React from 'react';
import { Divider, Box, Typography } from '@material-ui/core';
import ResponsiveCarousel from './carouselGenerator';

const CustomSwipeSpeedExamplePage = () => {
  return (
    <div>
      <p className='sectionTitle' style={{ marginTop: 0 }}>
        Default swipeSpeed of 0.5
      </p>
      <Divider style={{ marginBottom: 20 }}/>
      <ResponsiveCarousel useGrabCursor={false} useButton={false}/>
      <p className='sectionTitle'>Fast swipeSpeed of 0.9</p>
      <Divider style={{ marginBottom: 20 }}/>
      <ResponsiveCarousel useGrabCursor={false} useButton={false} swipeSpeed={0.9}/>
      <p className='sectionTitle'>Slow swipeSpeed of 0.1</p>
      <Divider style={{ marginBottom: 20 }}/>
      <ResponsiveCarousel useGrabCursor={false} useButton={false} swipeSpeed={0.1}/>
    </div>
  );
};

export default CustomSwipeSpeedExamplePage
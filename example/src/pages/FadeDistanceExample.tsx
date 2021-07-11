import React from 'react';
import { Divider, Box, Typography } from '@material-ui/core';
import ResponsiveCarousel from './carouselGenerator';
import Highlight from 'react-highlight';

const fadeDistanceExamplePage = () => {
  return (
    <div>
      <p className='sectionTitle' style={{ marginTop: 0 }}>
        Default fadeDistance: evenly spread 
      </p>
      <Divider style={{ marginBottom: 20 }}/>
      <ResponsiveCarousel useGrabCursor={false} useButton={false}/>
      <p className='sectionTitle'>fadeDistance = 0.5: 50% width of empty space</p>
      <Divider style={{ marginBottom: 20 }}/>
      <ResponsiveCarousel useGrabCursor={false} fadeDistance={0.5} useButton={false}/>
    </div>
  );
};

export default fadeDistanceExamplePage
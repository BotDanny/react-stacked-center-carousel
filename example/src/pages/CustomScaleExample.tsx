import React from 'react';
import { Divider, Box, Typography } from '@material-ui/core';
import ResponsiveCarousel from './carouselGenerator';
import Highlight from 'react-highlight';

const CustomScaleExamplePage = () => {
  return (
    <div>
      <p className='sectionTitle' style={{ marginTop: 0 }}>
        Default scale (0.85 ^ how many slide away from center): 
      </p>
      <Divider style={{ marginBottom: 20 }}/>
      <ResponsiveCarousel useGrabCursor={false} useButton={false}/>
      <p className='sectionTitle'>customScale = [1, 0.7, 0.5, 0.2]</p>
      <Divider style={{ marginBottom: 20 }}/>
      <ResponsiveCarousel useGrabCursor={false} useButton={false} customScales={[1, 0.7, 0.5, 0.2]}/>
    </div>
  );
};

export default CustomScaleExamplePage
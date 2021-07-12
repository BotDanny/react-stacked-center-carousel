import React from 'react';
import { Divider, Box, Typography } from '@material-ui/core';
import ResponsiveCarousel from './carouselGenerator';
import Highlight from 'react-highlight';

const ResponsiveContainerProps = () => {
  return (
    <div>
      <Highlight className='javascript'>
        {"import { ResponsiveContainer } from 'react-stacked-center-carousel';"}
      </Highlight>
      <p className='sectionTitle'>Props</p>
      <Divider style={{ marginBottom: 30 }} />
      <div className='prop-section-container'>
        <div className='prop-section-main'>
          <span className='props-title'>render*</span>
          <span className='props-type'>{`( parentWidth: number, carouselRef?: React.RefObject<StackedCarousel> ) => StackedCarousel`}</span>
        </div>
        <div className='prop-section-secondary'>
          <Typography className='props-explanation'>
            A render prop function that returns the StackedCarousel component. It
            will receive two arguments:
          </Typography>
          <Typography className='props-explanation'>
            The first argument is a number argument called parentWidth which
            represents the width of ResponsiveContainer's parent element.
          </Typography>
          <Typography className='props-explanation'>
            If ResponsiveContainer receives the prop carouselRef, then the
            render function will receive the second argument called carouselRef
            which is the same ref object passed into the carouselRef prop.
          </Typography>
        </div>
      </div>
      <div
        className='prop-section-container'
        style={{
          borderBottom: 'rgba(0, 0, 0, 0.205) solid 1px'
        }}
      >
        <div className='prop-section-main'>
          <span className='props-title'>carouselRef</span>
          <span className='props-type'>{`React.MutableRefObject<StackedCarousel | undefined>`}</span>
        </div>
        <div className='prop-section-secondary'>
          <Typography className='props-explanation'>
            A React ref object that will be passed into the render function as
            the second argument. Useful for assigning ref to the carousel
            component
          </Typography>
          <Typography className='props-explanation'>
            The reason you want to assign the ref through the render function
            instead of directly on the carousel is because ResponsiveContainer
            will not call the render function before it figures out its parent's
            width. Its parent's width can be determined only after its parent
            mount. Thus, on the first mount parentWidth is undefined, and the
            render function will not be called. If you set the ref directly on
            the carousel then it will not work since nothing is rendered yet.
          </Typography>
        </div>
      </div>
      <p className='sectionTitle'>Example</p>
      <Divider style={{ marginBottom: 30 }} />
      <Highlight className='javascript'>{example}</Highlight>
    </div>
  );
};

const example = `function ResponsiveCarousel() {
    // If you want to use a ref to call the method of StackedCarousel, you cannot set the ref directly on the carousel component
    // This is because ResponsiveContainer will not render the carousel before its parent's width is determined
    // parentWidth is determined after your parent component mounts. Thus if you set the ref directly it will not work since the carousel is not rendered
    // Thus you need to pass your ref object to the ResponsiveContainer as the carouselRef prop and in your render function you will receive this ref object
    const ref = React.useRef<ResponsiveContainer>();
    return (
      <div style={{ width: '100%', position: 'relative' }}>
            <ResponsiveContainer carouselRef={ref} render={(parentWidth, carouselRef) => {
                        let currentVisibleSlide = 5;
                        if (parentWidth <= 1280) currentVisibleSlide = 3;
                        if (parentWidth <= 720) currentVisibleSlide = 1;
                        return (
                            <StackedCarousel
                                  ref={carouselRef}
                                  slideComponent={Card}
                                  slideWidth={500}
                                  carouselWidth={parentWidth}
                                  data={data}
                                  maxVisibleSlide={5}
                                  currentVisibleSlide={currentVisibleSlide}
                            />
            )}}/>
      </div>
    );
}`;

export default ResponsiveContainerProps;

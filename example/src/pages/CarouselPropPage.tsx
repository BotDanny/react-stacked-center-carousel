import React from 'react';
import { Divider, Typography, Box } from '@material-ui/core';
import { CodeHighlight } from './carouselGenerator';
import DOMSnapShot from './DOM.png';
import Highlight from 'react-highlight';
import fadeDistanceDemo from './fadeDistance.png';

const PropsPage = () => {
  return (
    <div>
      <Highlight className='javascript'>
        {
          "import { StackedCarousel, StackedCarouselSlideProps } from 'react-stacked-center-carousel';"
        }
      </Highlight>
      <p className='sectionTitle'>DOM structure</p>
      <Box p={0} mb={2}>
        <Typography variant='body1'>
          react-stacked-center-carousel will render 2 invisible slides in
          addition to the visible slides, one at each end. This is for the fade
          in/out transition.
        </Typography>
        <Typography variant='body1'>
          Your slide component will be wrapper inside a div that has class name
          "react-stacked-center-carousel-slide-X" where X is the number of slide
          away from center. For example X=0 means it is the center slide. X=1
          means it is the first slide to the right of the center slide. This can
          be useful to add css.
        </Typography>
        <img src={DOMSnapShot} style={{ width: '100%' }} />
      </Box>
      <p className='sectionTitle'>Props (methods are at the bottom)</p>
      <Divider style={{ marginBottom: 30 }} />
      {props.map((prop, index) => {
        const {
          name,
          type,
          example,
          explanation,
          defaultValue,
          customExplanation
        } = prop;
        return (
          <div
            className='prop-section-container'
            key={name}
            style={{
              borderBottom:
                index === props.length - 1
                  ? 'rgba(0, 0, 0, 0.205) solid 1px'
                  : 'none'
            }}
          >
            <div className='prop-section-main'>
              <span className='props-title'>{name}</span>
              <span className='props-type'>{type}</span>
              {defaultValue && (
                <span className='props-default'>default: {defaultValue}</span>
              )}
            </div>
            <div className='prop-section-secondary'>
              <span className='props-explanation'>{explanation}</span>
              {customExplanation}
              {example && (
                <span className='props-example'>
                  <CodeHighlight code={example} />
                </span>
              )}
            </div>
          </div>
        );
      })}
      <p className='sectionTitle'>Methods</p>
      <Divider style={{ marginBottom: 30 }} />
      {methods.map((method, index) => {
        const { name, explanation } = method;
        return (
          <div
            className='prop-section-container'
            key={name}
            style={{
              borderBottom:
                index === methods.length - 1
                  ? 'rgba(0, 0, 0, 0.205) solid 1px'
                  : 'none'
            }}
          >
            <div className='prop-section-main'>
              <span className='props-title'>{name}</span>
            </div>
            <div className='prop-section-secondary'>
              <span className='props-explanation'>{explanation}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PropsPage;

const slideProps = [
  {
    name: 'data',
    explanation:
      'the same data prop that is passed into StackedCarousel component. Holds your data to render each slide. It should have at least the length of the number of slide to display'
  },
  {
    name: 'dataIndex',
    explanation:
      'Index of the data that the current slide is responsible for rendering. Data can be extrated by data[dataIndex]'
  },
  {
    name: 'slideIndex',
    explanation:
      'Index of the current slide. 0 represents the center slide, 1 represents the slide that is at the right side of the center slide, and 1 slide away. -1 represents the slide that is at the left side of the center slide, and 1 slide away. And so on. For example, if you have 5 slides to display, then slideIndex will be -2 -1 0 1 2 respectively.'
  },
  {
    name: 'isCenterSlide',
    explanation:
      'Indicate if the current slide is the center slide. You should use this over slideIndex === 0.'
  },
  {
    name: 'swipeTo: (steps: number) => void',
    explanation:
      'A function to move the carousel {steps} step. For example swipeTo(2) will shift the center 2 slides to the right and swipeTo(-3) will shift the center 3 slides to the left'
  }
];

const props = [
  {
    name: 'data*',
    type: 'any[]',
    example:
      'const data = [{ url: "xxx1", title: "image1" }, { url: "xxx2", title: "image2" }]',
    explanation: 'A list of data that will be passed into each slide as a prop.'
  },
  {
    name: 'carouselWidth*',
    type: 'number',
    example: `<ResponsiveContainer render={parentWidth => <StackedCarousel ... carouselWidth={parentWidth}/>`,
    explanation: `The width of the carousel. 
      If you are using the responsive container that react-stacked-center-carousel provides, then you can set it to the container width from the parentWidth parameter passed into the render function.`
  },
  {
    name: 'slideWidth*',
    type: 'number',
    example: '<StackedCarousel ... slideWidth={750}/>',
    explanation:
      'The width of each slide. Note that your slide component will be wrapped inside a div that has the width of slideWidth.'
  },
  {
    name: 'slideComponent*',
    type: 'React.ComponentType',
    example:
      'const { data, dataIndex, slideIndex, isCenterSlide, swipeTo } = props;',
    customExplanation: (
      <>
        <span className='props-explanation'>
          Your component to render each slide. Shoud be <b>memoized!</b> It will
          receive the following 5 props:
        </span>
        <ul>
          {slideProps.map((content, index) => {
            return (
              <li key={index}>
                <Typography
                  variant='body1'
                  style={{ fontWeight: 600, marginBottom: 0 }}
                >
                  {content.name}
                </Typography>
                <Typography variant='body1'>{content.explanation}</Typography>
              </li>
            );
          })}
        </ul>
      </>
    )
  },
  {
    name: 'maxVisibleSlide*',
    type: 'number',
    example: '<StackedCarousel ... maxVisibleSlide={5} />',
    explanation:
      'Maximum amount of visible slides to display, must be an odd number. If you want to have different number of slides to display based on the container width then you need to provide the currentVisibleSlide prop.'
  },
  {
    name: 'currentVisibleSlide',
    type: 'number',
    defaultValue: 'maxVisibleSlide',
    example:
      '<StackedCarousel ... maxVisibleSlide={5} currentVisibleSlide={3} />',
    explanation:
      'Current number of visible slides to display, defaults to maxVisibleSlide. Must be smaller or equal to maxVisibleSlide and must be an odd number. This is useful if you have break points (for example you want to display 7 slides if viewport width is between 1280px and 1920px, 5 slides for 1280px - 720px, and 3 slides for 720px - 0px).'
  },
  {
    name: 'className',
    type: 'string',
    explanation: 'class name applied to the carousel container that contains the slides.'
  },
  {
    name: 'disableSwipe',
    type: 'boolean',
    default: 'false',
    explanation: 'disable drag/swipe.'
  },
  {
    name: 'onActiveSlideChange',
    type: '(activeSlide: number) => void',
    example:
      '<StackedCarousel ... onActiveSlideChange={ newCenterDataIndex => setCenter(newCenterDataIndex) } />',
    explanation:
      'A call back function that will be called on first mount and when the center slide changes. It will receive on parameter which is the data index of the new center slide. This is useful for pagination.'
  },
  {
    name: 'customScales',
    type: 'number[]',
    defaultValue: '[1, 0.85, 0.7225, 0.614125, ...]',
    example: `<StackedCarousel ... customScales={[1, 0.85, 0.7, 0.55]} maxVisibleSlide={5} />
// Note the last element in customScales is the scale applied to the invisible slide used for fade in/out transition`,
    explanation:
      'An array of numbers indicating the scale applied to the slide. Index 0 of this array represents the scale applied to the center slide (must be 1), index 1 of this array represents the scale applied to the slide that are 1 slide away from the center (slideIndex 1 and -1), so on. It must have the length of (maxVisibleSlide + 1) / 2 where the last element is the scale applied to the invisible slide at the end used for the fade transition.'
  },
  {
    name: 'fadeDistance',
    type: 'number',
    defaultValue: 'evenly spread',
    example: '<StackedCarousel ... fadeDistance={0.5} />',
    explanation:
      'The percentage of the amount of available that can be used for transition.',
    customExplanation: <img style={{ width: 500 }} src={fadeDistanceDemo} />
  },
  {
    name: 'swipeThreshold',
    type: 'number',
    defaultValue: '50',
    explanation:
      'How many pixel need to be swiped in order to triger the snapping effect (move forward or backward 1 slide).'
  },
  {
    name: 'transitionTime',
    type: 'number',
    defaultValue: '450',
    explanation: 'Transition time (in ms) applied to all transition.'
  },
  {
    name: 'customTransition',
    type: 'string',
    defaultValue: 'all 450ms ease 0s',
    explanation: 'Custom css transition applied to all slide.'
  },
  {
    name: 'useGrabCursor',
    type: 'boolean',
    defaultValue: 'false',
    explanation:
      'Whether or not to use the grab and grabbing cursor when swiping.'
  },
  {
    name: 'height',
    type: 'number',
    explanation:
      'The height applied to the carousel. react-stacked-center-carousel will automatically determine the height of the carousel based on the height of the center slide. However, the height is set after the carousel mount so if that causes trouble you can set your own height.'
  }
];

const methods = [
  {
    name: 'goNext()',
    explanation: 'Move to the next slide. Equivalent to swipeTo(1).'
  },
  {
    name: 'goBack()',
    explanation: 'Move to the previous slide. Equivalent to swipeTo(-1).'
  },
  {
    name: 'swipeTo( steps: number )',
    explanation:
      'Move {steps} slide away from the center. For example swipeTo(-3) will shift the center 3 slides to the left.'
  }
];

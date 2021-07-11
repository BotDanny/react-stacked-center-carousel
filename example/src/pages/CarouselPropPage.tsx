import React from 'react';
import { StackedCarousel, ResponsiveContainer } from 'react-stacked-center-carousel';
import Fab from '@material-ui/core/Fab';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
  Box,
  Typography
} from '@material-ui/core';
import ResponsiveCarousel from './carouselGenerator';
import Highlight from 'react-highlight';

const PropsPage = () => {
  return (
    <div>
      <Highlight className='javascript'>
        {"import { StackedCarousel, slideProp } from 'react-stacked-center-carousel';"}
      </Highlight>
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
          <div className='prop-section-container' key={name} style={{
            borderBottom:
              index === props.length - 1
                ? 'rgba(0, 0, 0, 0.205) solid 1px'
                : 'none'
          }}>
            <div className='prop-section-main'>
              <span className='props-title'>{name}</span>
              <span className='props-type'>{type}</span>
              {defaultValue && (
                <span className='props-default'>default: {defaultValue}</span>
              )}
            </div>
            <div className='prop-section-secondary'>
              {customExplanation || (
                <span className='props-explanation'>{explanation}</span>
              )}
              {example && (
                <span className='props-example'>Example: {example}</span>
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
    name: 'swipeStarted',
    explanation:
      'A boolean indicating if the user is swiping (dragging) the carousel. This is useful if you want to use some custom cursor when the user is not swiping and use the grab cursor when user is swiping.'
  }
];

const props = [
  {
    name: 'data*',
    type: 'any[]',
    example:
      '[{ url: "xxx1", title: "image1" }, { url: "xxx2", title: "image2" }]',
    explanation: 'A list of data that will be passed into each slide as a prop.'
  },
  {
    name: 'carouselWidth*',
    type: 'number',
    example: '1000',
    explanation: `The width of the carousel. 
      If you are using the responsive container that react-stacked-center-carousel provides, then you can set it to the container width from the containerWidth parameter passed into the render function.`
  },
  {
    name: 'slideWidth*',
    type: 'number',
    example: '600',
    explanation: 'The width of each slide. Note that your slide component will be wrapped inside a div that has the width of slideWidth.'
  },
  {
    name: 'slideComponent*',
    type: 'React.ComponentType',
    customExplanation: (
      <>
        <span className='props-explanation'>
          Your component to render each slide. it will receive the following 4
          props:
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
    example: '5',
    explanation:
      'Maximum amount of slides to display, must be an odd number. If you want to have different number of slides to display based on the container width then you need to provide the currentVisibleSlide prop.'
  },
  {
    name: 'currentVisibleSlide',
    type: 'number',
    defaultValue: 'maxVisibleSlide',
    example: '3',
    explanation:
      'Current number of slides to display, defaults to maxVisibleSlide. Must be smaller than maxVisibleSlide and must be an odd number. This is useful if you have break points (for example you want to display 7 slides if viewport width is between 1280px and 1920px, 5 slides for 1280px - 720px, and 3 slides for 720px - 0px).'
  },
  {
    name: 'onActiveSlideChange',
    type: '(activeSlide: number) => void',
    explanation:
      'A call back function that will be called on first mount and when the center slide changes. It will receive on parameter which is the data index of the new center slide. This is useful for pagination.'
  },
  {
    name: 'customScales',
    type: 'number[]',
    defaultValue: '[1, 0.85, 0.7225, 0.614125, ...]',
    example: '[1, 0.8, 0.5] if 5 slides are displayed',
    explanation:
      'An array of numbers indicating the scale applied to the slide. Index 0 of this array represents the scale applied to the center slide (which is usually 1), index 1 of this array represents the scale applied to the slide that are 1 slide away from the center, so on. Example [1, 0.8, 0.5] if 5 slides are displayed. The default scale applied to each slide is 0.85 ^ how many slide away from center.'
  },
  {
    name: 'fadeDistance',
    type: 'number',
    defaultValue: '0',
    exmaple: '100',
    explanation:
      'The horizontal distance (in pixel) provided for the first and last slide to fade in or out.'
  },
  {
    name: 'swipeThreshold',
    type: 'number',
    defaultValue: '50',
    exmaple: '100',
    explanation:
      'How many pixel need to be swiped in order to triger the snapping effect (move forward or backward 1 slide).'
  },
  {
    name: 'transitionTime',
    type: 'number',
    defaultValue: '450',
    exmaple: '300',
    explanation: 'Transition time (in ms) applied to all transition.'
  },
  {
    name: 'customTransition',
    type: 'string',
    defaultValue: 'all 450ms ease 0s',
    exmaple: `\"all 450ms ease 0s, z-index 200ms\"`,
    explanation:
      'Custom transition applied to all slide, useful for modifying z-index transition time.'
  },
  {
    name: 'useGrabCursor',
    type: 'boolean',
    defaultValue: 'false',
    explanation:
      'Whether or not to use the grab and grabbing cursor when swiping. Note if you set a cursor on your slide component then it will override this cursor. If you want to keep the grabbing cursor when swiping while having a custom cursor when not swiping, consider using the swipeStarted prop provided to you slide component.'
  },
  {
    name: 'useCoolDown',
    type: 'boolean | number',
    defaultValue: 'false',
    exmaple: '200',
    explanation:
      'Minimum amount of time needed to wait between each swipe, only affects swipe by button. If set to true then the time period will be the 450 if transitionTime is not set or else the same as transitionTime. If a number is provided then the period will be set to that value.'
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
    explanation: 'Move to the next slide'
  },
  {
    name: 'goBack()',
    explanation: 'Move to the previous slide.'
  }
];

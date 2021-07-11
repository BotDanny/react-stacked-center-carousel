import React from 'react';
import { Divider, Box, Typography } from '@material-ui/core';
import { data } from './carouselGenerator';
import Highlight from 'react-highlight';
import './Twitch.css';
import {
  StackedCarousel,
  ResponsiveContainer,
  slideProp
} from 'react-stacked-center-carousel';
import cover from './twitchcover.jpg';
import noice from './noice.gif';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';

const TwitchExample = () => {
  const ref = React.useRef<StackedCarousel>();
  return (
    <div className='twitch'>
      <p className='sectionTitle' style={{ marginTop: 0 }}>
        Reproducing the carousel on Twitch
      </p>
      <Divider />
      <Box p={0} pt={1} pb={0} mb={2}>
        <Typography variant='body1'>
          Twitch has the best stacked carousel design I've seen, that's why I made this
          package with the goal to surpass Twitch's implementation.
        </Typography>
        <Typography variant='body1'>
          Without much modification, you can match react-center-caousel almost
          exactly with Twitch's design. The more tricky part is getting the css transition
          right.
        </Typography>
      </Box>
      <div style={{ width: '100%', position: 'relative' }}>
        <ResponsiveContainer
          carouselRef={ref}
          render={(width, carouselRef) => {
            return (
              <StackedCarousel
                ref={carouselRef}
                slideComponent={Slide}
                slideWidth={750}
                carouselWidth={width}
                data={data}
                maxVisibleSlide={5}
                disableSwipe
                customScales={[1, 0.85, 0.7, 0.55]}
                transitionTime={450}
              />
            );
          }}
        />
        <Fab
          className='twitch-button left'
          size='small'
          onClick={() => ref.current?.goBack()}
        >
          <KeyboardArrowLeftIcon style={{ fontSize: 30 }} />
        </Fab>
        <Fab
          className='twitch-button right'
          size='small'
          onClick={() => ref.current?.goNext()}
        >
          <KeyboardArrowRightIcon style={{ fontSize: 30 }} />
        </Fab>
      </div>
      <p className='sectionTitle'>Code</p>
      <Divider />
    </div>
  );
};

export default TwitchExample;

export const Slide = React.memo(function (props: slideProp) {
  const { data, dataIndex, isCenterSlide, swipeTo, slideIndex } = props;
  const [loadDelay, setLoadDelay] = React.useState<any>();
  const [removeDelay, setRemoveDelay] = React.useState<any>();
  const [loaded, setLoaded] = React.useState(false);
  React.useEffect(() => {
    if (isCenterSlide) {
      clearTimeout(removeDelay);
      setLoadDelay(setTimeout(() => setLoaded(true), 600));
    } else {
      clearTimeout(loadDelay);
      if (loaded) setRemoveDelay(setTimeout(() => setLoaded(false), 600));
    }
  }, [isCenterSlide]);

  return (
    <div className='twitch-card' draggable={false}>
      <div className={`cover fill ${isCenterSlide && loaded ? 'off' : 'on'}`}>
        <div
          className='card-overlay fill'
          onClick={() => {
            if (!isCenterSlide) swipeTo(slideIndex);
          }}
        />
        <img className='cover-image fill' src={cover} />
      </div>
      {loaded && (
        <div className='detail fill'>
          <img className='video' src={noice} />
          <div className='discription'>
            <CardHeader
              avatar={<Avatar className='avatar'>D</Avatar>}
              title='Bot Danny'
              subheader='September 14, 2016'
            />
            <Typography variant='body2' color='textSecondary' component='p'>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. He done a
              great job!
            </Typography>
          </div>
        </div>
      )}
    </div>
  );
});

const code = `import { StackedCarousel, ResponsiveContainer, slideProp } from 'react-stacked-center-carousel';

const data = [{cover: 'https://coverfiles.alphacoders.com/664/66426.jpg', title: 'Interstaller'} ...];

function ResponsiveCarousel() {
    const ref = React.useRef<ResponsiveContainer>();
    return (
      <div style={{ width: '100%', position: 'relative' }}>
            // ResponsiveContainer will have the same width as its parent element
            <ResponsiveContainer carouselRef={ref} render={(containerWidth, carouselRef) => {
                        let currentVisibleSlide = 5;
                        if (containerWidth <= 1280) currentVisibleSlide = 3;
                        if (containerWidth <= 720) currentVisibleSlide = 1;
                        return (
                            <StackedCarousel
                                    ref={carouselRef}
                                    data={data}
                                    carouselWidth={containerWidth}
                                    slideWidth={500}
                                    slideComponent={Card}
                                    maxVisibleSlide={5}
                                    currentVisibleSlide={currentVisibleSlide}
                            />
            )}}/>
      </div>
    );
}

// Very important to memoize your component!!!
const Card = React.memo(
    function (props: slideProp) {
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
    function (prev: slideProp, next: slideProp) {
      return prev.dataIndex === next.dataIndex;
    }
);`;

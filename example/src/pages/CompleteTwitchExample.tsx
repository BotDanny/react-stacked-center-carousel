import React from 'react';
import { Typography } from '@material-ui/core';
import {
  StackedCarousel,
  ResponsiveContainer,
  StackedCarouselSlideProps
} from 'react-stacked-center-carousel';
import cover from './twitchcover.jpg';
import noice from './noice.gif';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import './Twitch.css';

const data = new Array(10).fill({ coverImage: cover, video: noice });

const TwitchExample = () => {
  const ref = React.useRef<StackedCarousel>();
  return (
    <div className='twitch'>
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
    </div>
  );
};

export default TwitchExample;

export const Slide = React.memo(function (props: StackedCarouselSlideProps) {
  const { data, dataIndex, isCenterSlide, swipeTo, slideIndex } = props;
  const [loadDelay, setLoadDelay] = React.useState<any>();
  const [removeDelay, setRemoveDelay] = React.useState<any>();
  const [loaded, setLoaded] = React.useState(false);
  React.useEffect(() => {
    if (isCenterSlide) {
      clearTimeout(removeDelay);
      setLoadDelay(setTimeout(() => setLoaded(true), 1000));
    } else {
      clearTimeout(loadDelay);
      if (loaded) setRemoveDelay(setTimeout(() => setLoaded(false), 1000));
    }
  }, [isCenterSlide]);

  React.useEffect(() => () => {
    clearTimeout(removeDelay);
    clearTimeout(loadDelay);
  });

  const { coverImage, video } = data[dataIndex];

  return (
    <div className='twitch-card' draggable={false}>
      <div className={`cover fill ${isCenterSlide && loaded ? 'off' : 'on'}`}>
        <div
          className='card-overlay fill'
          onClick={() => {
            if (!isCenterSlide) swipeTo(slideIndex);
          }}
        />
        <img className='cover-image fill' src={coverImage} />
      </div>
      {loaded && (
        <div className='detail fill'>
          <img className='video' src={video} />
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

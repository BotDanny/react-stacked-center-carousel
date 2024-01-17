# react-stacked-center-carousel

> A responsive, performant, well animated, swipeable, center mode carousel that stacks its slide

[![NPM](https://img.shields.io/npm/v/react-stacked-center-carousel.svg)](https://www.npmjs.com/package/react-stacked-center-carousel) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## [Demo and Documentation](https://botdanny.github.io/react-stacked-center-carousel/#/)
![demo-1](https://user-images.githubusercontent.com/46267462/125190404-f604eb80-e20a-11eb-8bfe-4de76094e583.gif)
![demo-3](https://user-images.githubusercontent.com/46267462/125190561-ca363580-e20b-11eb-9ecf-9ac17bb11466.gif)
![demo-2](https://user-images.githubusercontent.com/46267462/125190407-f7ceaf00-e20a-11eb-80a5-0304da2365ca.gif)


## Install

```bash
npm install react-stacked-center-carousel
```

or

```bash
yarn add react-stacked-center-carousel
```

## Change log

- 1.0.14: The prop `swipeThreshold` has been deprecated. A new prop [`swipeSpeed`](https://botdanny.github.io/react-stacked-center-carousel/#/StackedCarousel) has been provided. 

## Maintenance

I will be actively maintaining this package. 

If you find any problem, you can open an issue, I will resolve it as soon as possible.

If you have any suggestion, please also open an issue, it will be greatly appreciated! 

## Subscribable Data
Issues arise when trying to use dynamic *maxVisibleSlides* property with dynamics items 
(see details)[https://github.com/BotDanny/react-stacked-center-carousel/issues/22]
To work around this use subscribable data object 
```
import React, { useEffect } from "react";
import { PromisedData, ResponsiveContainer, StackedCarousel } from "react-stacked-center-carousel/src";

// component for individual slides
const CarouselItem = React.memo(function (props: any) {
  const item = props.data[props.dataIndex];
  return (
    <span>{item}</span>
  );
});

// new data from Promise, RxJs Observable, fetch api, w/e
const fetchedItems = new Promise<any[]>((resolve, reject) => {
  setTimeout(() => resolve(['one', 'two', 'three']), 1000);
});

// PromisedData object with initial items; RxJs BehaviorSubject can also be used
const promisedItems = new PromisedData(['one', 'two']);

export default function CarouselExample () {
  const ref = React.useRef();

  useEffect(() => {
    fetchedItems.then(newItems => promisedItems.next(newItems))
  }, []);

  return (
    <ResponsiveContainer
        carouselRef={ref}
        render={(parentWidth, carouselRef) => {
          return (
            <StackedCarousel
              ref={carouselRef}
              slideComponent={CarouselItem}
              slideWidth={parentWidth < 800 ? parentWidth - 40 : 750}
              carouselWidth={parentWidth}
              promisedData={promisedItems}
              maxVisibleSlide={promisedItems.value.length >= 3 ? 3 : 1}
              useGrabCursor
            />
          );
        }}
    />
  );
}
```

## License

MIT © [BotDanny](https://github.com/BotDanny)

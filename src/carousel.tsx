import React from 'react';
import {
  props,
  state,
  slideInfoMap,
  staticSlideInfo,
  renderedSlide
} from './interfaces';

export default class StackedCarousel extends React.PureComponent<props, state> {
  static defaultScaleFactor: number = 0.85;
  static defaultTransitionTime: number = 450;
  private height: number;
  private listRef: React.RefObject<HTMLDivElement>;
  private slidePerSide: number;
  private clearSlideTimeout: any;
  private slideInfoMap: slideInfoMap;
  private sortedSlideInfo: staticSlideInfo[];
  private keyCount: number;
  private addedSlide: number;
  private centerPosition: number;
  private maxZIndex: number;
  private renderedSlidePerSide: number;

  private validateProps = () => {
    const { currentVisibleSlide, maxVisibleSlide, fadeDistance, customScales } =
      this.props;
    if (
      (currentVisibleSlide && currentVisibleSlide % 2 !== 1) ||
      maxVisibleSlide % 2 !== 1
    ) {
      throw Error(
        'currentVisibleSlide or maxVisibleSlide must be an odd number'
      );
    }
    if (currentVisibleSlide && currentVisibleSlide > maxVisibleSlide) {
      throw Error('currentVisibleSlide must be smaller than maxVisibleSlide');
    }
    if (fadeDistance !== undefined) {
      if (fadeDistance > 1 || fadeDistance < 0) {
        throw Error('fadeDistance is a percentage value in the range of 0 - 1');
      }
    }
    if (customScales && customScales.length !== (maxVisibleSlide + 3) / 2) {
      throw Error('customScales must have lengh (maxVisibleSlide + 3) / 2');
    }
  };

  private initializeProperties = (constructor: boolean = false) => {
    this.validateProps();
    const {
      carouselWidth,
      slideWidth,
      currentVisibleSlide: currentVisibleDisplaySlide,
      maxVisibleSlide
    } = this.props;

    const currentVisibleSlides = currentVisibleDisplaySlide || maxVisibleSlide;
    const visibleSlidePerSide = (currentVisibleSlides - 1) / 2;
    const slidePerSide = Math.max(visibleSlidePerSide + 1, 1);
    const totalRenderCount = maxVisibleSlide + 2;
    const renderedSlidePerSide = (maxVisibleSlide + 1) / 2;
    const { offsets, scaledOffsets, scales } =
      this.calculateScaleAndOffsets(slidePerSide);

    const newRenderedSlides: renderedSlide[] = constructor
      ? Array(totalRenderCount).fill(null)
      : this.state.renderedSlides.filter(({ slideIndex, dataIndex }) => {
          return dataIndex === -1 || Math.abs(slideIndex) <= this.slidePerSide;
        });
    const slideInfoMap = {};

    const newCenterSlideRelativeIndex = constructor
      ? (totalRenderCount - 1) / 2
      : newRenderedSlides.findIndex(({ slideIndex }) => {
          return slideIndex === 0;
        });
    const newCenterDataIndex = constructor
      ? 0
      : newRenderedSlides[newCenterSlideRelativeIndex].dataIndex;

    let filledWidth = 0;
    const centerPosition = carouselWidth / 2 - slideWidth / 2;
    for (let absIndex = 0; absIndex <= slidePerSide; absIndex++) {
      const offset = offsets[absIndex];
      const slideScale = scales[absIndex];
      const currentOffSet = filledWidth + offset;

      [-absIndex, absIndex].forEach((slideIndex) => {
        const relativeIndex = newCenterSlideRelativeIndex + slideIndex;
        const position = slideIndex >= 0 ? currentOffSet : -currentOffSet;
        const opacity = absIndex === slidePerSide ? 0 : 1;
        const dataIndex = this.modDataRange(newCenterDataIndex + slideIndex);

        newRenderedSlides[relativeIndex] = {
          dataIndex,
          scale: slideScale,
          position: position,
          slideIndex: slideIndex,
          opacity: opacity,
          zIndex: renderedSlidePerSide - Math.abs(slideIndex),
          key: constructor ? dataIndex : newRenderedSlides[relativeIndex].key
        };

        slideInfoMap[slideIndex] = {
          position: position,
          scale: slideScale,
          opacity: opacity
        };
      });
      if (absIndex !== 0) filledWidth += scaledOffsets[absIndex];
    }

    for (let i = -slidePerSide; i <= slidePerSide; i++) {
      slideInfoMap[i].maxTransformDistance = {};
      slideInfoMap[i].maxTransformScale = {};
      slideInfoMap[i].maxTransformOpacity = {
        left: i === -slidePerSide + 1 || i === slidePerSide ? 1 : 0,
        right: i === -slidePerSide || i === slidePerSide - 1 ? 1 : 0
      };
      slideInfoMap[i].slideIndex = i;

      if (i === -slidePerSide) {
        slideInfoMap[i].maxTransformDistance.left = 0;
        slideInfoMap[i].maxTransformScale.left = 0;
      } else {
        slideInfoMap[i].maxTransformDistance.left =
          slideInfoMap[i].position - slideInfoMap[i - 1].position;
        slideInfoMap[i].maxTransformScale.left = Math.abs(
          slideInfoMap[i].scale - slideInfoMap[i - 1].scale
        );
      }
      if (i === slidePerSide) {
        slideInfoMap[i].maxTransformDistance.right = 0;
        slideInfoMap[i].maxTransformScale.right = 0;
      } else {
        slideInfoMap[i].maxTransformDistance.right =
          slideInfoMap[i + 1].position - slideInfoMap[i].position;
        slideInfoMap[i].maxTransformScale.right = Math.abs(
          slideInfoMap[i + 1].scale - slideInfoMap[i].scale
        );
      }
    }

    // If the current slide to display is 5, but the previous slide to display is 7
    // which happens when user sets a break point for responsive reasons
    // we want to fill the 2 not displayed indices with some unique number
    if (maxVisibleSlide > currentVisibleSlides) {
      const maxRenderedSlidePerSide = (maxVisibleSlide + 1) / 2;
      const currentSlidePerSide = slidePerSide;
      for (let i = currentSlidePerSide + 1; i <= maxRenderedSlidePerSide; i++) {
        for (let direct = 1; direct >= 0; direct--) {
          const insertIndex =
            newCenterSlideRelativeIndex + (direct === 1 ? i : -i);
          const prevIndex = insertIndex + (direct === 1 ? -1 : 1);
          const slideIndex = direct === 1 ? i : -i;
          const scalePositionIndex = constructor ? prevIndex : insertIndex;
          newRenderedSlides[insertIndex] = {
            scale: newRenderedSlides[scalePositionIndex].scale,
            position: newRenderedSlides[scalePositionIndex].position,
            key: constructor ? -slideIndex : newRenderedSlides[insertIndex].key,
            dataIndex: -1,
            slideIndex,
            opacity: 0,
            zIndex: 0
          };
        }
      }
    }

    const sortedSlideInfo = Object.values(slideInfoMap as slideInfoMap);
    sortedSlideInfo.sort((slide1, slide2) => {
      return slide1.position - slide2.position;
    });

    return {
      renderedSlides: newRenderedSlides,
      centerSlideRelativeIndex: newCenterSlideRelativeIndex,
      slideInfoMap,
      slidePerSide,
      newRenderedSlides,
      sortedSlideInfo,
      centerPosition,
      renderedSlidePerSide
    };
  };

  private calculateScaleAndOffsets = (slidePerSide: number) => {
    const { carouselWidth, slideWidth, customScales, fadeDistance } =
      this.props;

    const availableSpace = carouselWidth / 2 - slideWidth / 2;
    const scales = [1];
    const scaledSlideWidths = [slideWidth];
    for (let slide = 1; slide <= slidePerSide; slide++) {
      const scale = customScales
        ? customScales[slide]
        : Math.pow(StackedCarousel.defaultScaleFactor, slide);
      scales.push(scale);
      scaledSlideWidths.push(slideWidth * scale);
    }

    let includedSlideWidths = scaledSlideWidths.slice(1);
    let fillingSpace = availableSpace;
    if (fadeDistance !== undefined) {
      includedSlideWidths = scaledSlideWidths.slice(1, slidePerSide);
      fillingSpace = availableSpace * (1 - fadeDistance);
    }

    const totalSlideWidth = includedSlideWidths.reduce((a, b) => a + b, 0);
    const offSetPercentage = totalSlideWidth
      ? fillingSpace / totalSlideWidth
      : 0;

    const scaledOffsets = [0];
    const offsets = [0];
    for (let slide = 1; slide <= slidePerSide; slide++) {
      const isCustomFade = fadeDistance !== undefined && slide === slidePerSide;
      const scale = scales[slide];
      scaledOffsets[slide] = isCustomFade
        ? (fadeDistance as number) * availableSpace
        : slideWidth * scale * offSetPercentage;
      offsets[slide] = scaledOffsets[slide] + slideWidth * ((1 - scale) / 2);
    }
    return { offsets, scaledOffsets, scales };
  };

  getZIndex = (slideIndex: number) => {
    return this.renderedSlidePerSide - Math.abs(slideIndex);
  };

  constructor(props: props) {
    super(props);
    const {
      renderedSlides,
      slideInfoMap,
      slidePerSide,
      sortedSlideInfo,
      centerPosition,
      renderedSlidePerSide
    } = this.initializeProperties(true);
    const { onActiveSlideChange } = this.props;

    this.slideInfoMap = slideInfoMap;
    this.sortedSlideInfo = sortedSlideInfo;
    this.slidePerSide = slidePerSide;
    this.height = this.props.height || 0;
    this.listRef = React.createRef();
    this.clearSlideTimeout = null;
    this.keyCount = props.data.length;
    this.addedSlide = 0;
    this.centerPosition = centerPosition;
    this.maxZIndex = 100;
    this.renderedSlidePerSide = renderedSlidePerSide;

    if (onActiveSlideChange) {
      onActiveSlideChange(0);
    }

    this.state = {
      initalSwipeX: 0,
      swipeStarted: false,
      renderedSlides: renderedSlides,
      prevRenderedSlides: [...renderedSlides],
      swipePositionInfo: [],
      swipRight: false,
      tempShift: false
    };
  }

  componentDidMount() {
    this.updateHeight();
  }

  componentWillUnmount() {
    clearTimeout(this.clearSlideTimeout)
  }

  componentDidUpdate(prevProps: props) {
    if (!shouldRecaclculate(this.props, prevProps)) return;
    const {
      slideInfoMap,
      slidePerSide,
      newRenderedSlides,
      sortedSlideInfo,
      centerPosition
    } = this.initializeProperties();

    this.slideInfoMap = slideInfoMap;
    this.sortedSlideInfo = sortedSlideInfo;
    this.slidePerSide = slidePerSide;
    // this.height = this.props.height || 0;
    this.centerPosition = centerPosition;

    this.setState(() => {
      return {
        initalSwipeX: 0,
        renderedSlides: newRenderedSlides,
        prevRenderedSlides: [...newRenderedSlides],
        swipRight: true
      };
    }, this.updateHeight);
  }

  private updateHeight = () => {
    const { height } = this.props;
    if (height) return;

    const { slideDOM } = this.getSlideDOMInfo(0);
    const parsedHeight = parseInt(
      window.getComputedStyle(slideDOM as Element).height
    );
    if (parsedHeight !== this.height) {
      this.height = parsedHeight;
      this.forceUpdate();
    }
  };

  private modDataRange = (n: number) => {
    const {
      data,
      currentVisibleSlide: currentVisibleDisplaySlide,
      maxVisibleSlide
    } = this.props;
    const currentVisibleSlide = currentVisibleDisplaySlide || maxVisibleSlide;
    const m = Math.max(data.length, currentVisibleSlide + 2);
    return ((n % m) + m) % m;
  };

  private debouncedClearInvisibleSlide = () => {
    const { transitionTime } = this.props;
    clearTimeout(this.clearSlideTimeout);
    this.clearSlideTimeout = setTimeout(
      this.clearUselessSlide,
      transitionTime !== undefined
        ? transitionTime
        : StackedCarousel.defaultTransitionTime
    );
  };

  private clearUselessSlide = () => {
    this.addedSlide = 0;
    const { renderedSlides } = this.state;
    const newRenderedSlides = renderedSlides.filter(
      ({ slideIndex, dataIndex }) => {
        const absoluteSlideIndex = Math.abs(slideIndex);
        if (absoluteSlideIndex <= this.slidePerSide || dataIndex === -1) {
          return true;
        }
        return false;
      }
    );
    this.setState({ renderedSlides: newRenderedSlides });
  };

  private safeGetSlideInfo = (slideIndex: number) => {
    let positionIndex = slideIndex;
    if (positionIndex > this.slidePerSide) {
      positionIndex = this.slidePerSide;
    } else if (positionIndex < -this.slidePerSide) {
      positionIndex = -this.slidePerSide;
    }
    return this.slideInfoMap[positionIndex];
  };

  private moveCarousel = (steps: number) => {
    const { renderedSlides } = this.state;
    const { onActiveSlideChange } = this.props;
    let newCenterDataIndex = 0;

    const newSlides = renderedSlides.map((oldSlide) => {
      const { slideIndex, dataIndex } = oldSlide;
      if (dataIndex === -1) return oldSlide;

      const newSlideIndex = slideIndex + -steps;
      if (newSlideIndex === 0) newCenterDataIndex = dataIndex;

      const slideInfo = this.safeGetSlideInfo(newSlideIndex);
      return {
        ...oldSlide,
        slideIndex: newSlideIndex,
        position: slideInfo.position,
        scale: slideInfo.scale,
        opacity: slideInfo.opacity,
        zIndex: this.getZIndex(newSlideIndex)
      };
    });

    if (steps !== 0) {
      const maxSlideIndex = steps > 0 ? this.slidePerSide : -this.slidePerSide;
      this.addedSlide += Math.abs(steps);
      for (
        let newSlideIndex =
          steps > 0
            ? this.slidePerSide - steps + 1
            : -this.slidePerSide - steps - 1;
        Math.abs(newSlideIndex) <= this.slidePerSide;
        newSlideIndex += steps > 0 ? 1 : -1
      ) {
        if (!newSlides.find(({ slideIndex }) => slideIndex === newSlideIndex)) {
          const insertPosition = newSlides.findIndex(({ slideIndex }) => {
            return slideIndex === newSlideIndex + (steps > 0 ? -1 : 1);
          });

          const { scale, position } = this.slideInfoMap[maxSlideIndex];
          const insertDataIndex = this.modDataRange(
            newCenterDataIndex + newSlideIndex
          );
          this.keyCount += 1;
          const zIndex = this.getZIndex(newSlideIndex);
          const insertSlide = {
            scale,
            position,
            opacity: 0,
            zIndex: zIndex - this.addedSlide,
            slideIndex: newSlideIndex,
            dataIndex: insertDataIndex,
            key: this.keyCount
          };

          newSlides.splice(
            steps > 0 ? insertPosition + 1 : insertPosition,
            0,
            insertSlide
          );
        }
      }
    }

    if (steps !== 0 && onActiveSlideChange) {
      onActiveSlideChange(newCenterDataIndex);
    }
    this.setState(
      () => {
        return {
          swipeStarted: false,
          renderedSlides: newSlides,
          swipRight: steps < 0 ? true : false
        };
      },
      () => {
        setTimeout(() => {
          this.resetSlides();
        }, 0);
      }
    );
  };

  private getSwipeX(e: any) {
    if (e.type[0] === 'm') return e.clientX;
    try {
      return e.touches[0]?.clientX || e.changedTouches[0]?.clientX;
    } catch {
      throw Error('Something went wrong with getting mouse position');
    }
  }

  private getSlideDOMInfo = (slideIndex: number) => {
    const { slideWidth } = this.props;
    const listRef = this.listRef.current as HTMLDivElement;
    const slideDOM = listRef.getElementsByClassName(
      `react-stacked-center-carousel-slide-${slideIndex}`
    )[0];
    const slideRect = slideDOM.getBoundingClientRect();
    const { left: carouselLeft } = listRef.getBoundingClientRect();
    const scale = slideRect.width / slideWidth;
    const additionalOffset = slideWidth * 0.5 * (1 - scale);
    const slideOffsetLeft = slideRect.left - carouselLeft - additionalOffset;
    const slideCenterOffset = slideOffsetLeft - this.centerPosition;
    return { scale, slideDOM, slideCenterOffset };
  };

  private getSlideScaleAndOpacity = (centerOffset: number) => {
    const targetSlide =
      this.sortedSlideInfo.find(({ position }) => {
        return Math.ceil(position) >= centerOffset;
      }) || this.sortedSlideInfo[this.sortedSlideInfo.length - 1];

    const {
      position,
      slideIndex,
      scale,
      maxTransformDistance,
      maxTransformScale,
      maxTransformOpacity,
      opacity
    } = targetSlide;
    const offset = Math.ceil(position) - centerOffset;
    const offsetPercentage =
      maxTransformDistance.left === 0
        ? 0
        : (offset / maxTransformDistance.left) * (slideIndex <= 0 ? -1 : 1);

    return {
      scale: scale + maxTransformScale.left * offsetPercentage,
      opacity: opacity + maxTransformOpacity.left * offsetPercentage
    };
  };

  private centerOffset = (slideIndex: number) => {
    const { slideCenterOffset } = this.getSlideDOMInfo(slideIndex);
    return Math.abs(this.slideInfoMap[0].position - slideCenterOffset);
  };

  private onSwipeStart = (e: React.MouseEvent | React.TouchEvent) => {
    const { onActiveSlideChange, disableSwipe } = this.props;
    if (disableSwipe) return;
    const initalSwipeX = this.getSwipeX(e);
    const { renderedSlides } = this.state;

    // preserve the slides
    clearTimeout(this.clearSlideTimeout);
    let shiftDirection = 0;
    let centerDataIndex = 0;
    if (this.centerOffset(-1) < this.centerOffset(0)) shiftDirection = 1;
    else if (this.centerOffset(1) < this.centerOffset(0)) shiftDirection = -1;

    const newRenderedSlides: renderedSlide[] = [];
    const swipePositionInfo = [];
    for (let slide of renderedSlides) {
      const { slideIndex, dataIndex } = slide;
      if (dataIndex === -1) {
        newRenderedSlides.push(slide);
        swipePositionInfo.push({
          slideIndex: slideIndex,
          maxLeft: 0,
          maxRight: 0
        });
        continue;
      }
      const newSlideIndex = slideIndex + shiftDirection;
      if (Math.abs(newSlideIndex) > this.slidePerSide) continue;
      if (newSlideIndex === 0) centerDataIndex = dataIndex;

      const { slideCenterOffset, scale } = this.getSlideDOMInfo(slideIndex);
      const { opacity } = this.getSlideScaleAndOpacity(slideCenterOffset);
      const { maxTransformDistance, position } =
        this.safeGetSlideInfo(newSlideIndex);

      swipePositionInfo.push({
        slideIndex: newSlideIndex,
        maxLeft: slideCenterOffset - position + maxTransformDistance.left,
        maxRight: position + maxTransformDistance.right - slideCenterOffset
      });
      newRenderedSlides.push({
        ...slide,
        scale,
        opacity,
        position: slideCenterOffset,
        slideIndex: newSlideIndex,
        zIndex: this.getZIndex(newSlideIndex)
      });
    }
    if (onActiveSlideChange && shiftDirection !== 0) {
      onActiveSlideChange(centerDataIndex);
    }
    this.setState({
      swipeStarted: true,
      initalSwipeX: initalSwipeX,
      renderedSlides: newRenderedSlides,
      prevRenderedSlides: [...newRenderedSlides],
      swipePositionInfo
    });
  };

  private onSwipe = (e: React.MouseEvent | React.TouchEvent) => {
    const { swipeStarted } = this.state;
    if (!swipeStarted) {
      return;
    }
    const { initalSwipeX, prevRenderedSlides, swipePositionInfo } = this.state;
    const { slideWidth } = this.props;
    let tempShift = false;

    const currentSwipeX = this.getSwipeX(e);
    const swipeDistance = initalSwipeX - currentSwipeX;
    const delta = Math.abs(swipeDistance);
    const swipeLeft = swipeDistance > 0;

    const transformFactor = (10 / slideWidth) * delta;
    // 0.8^10 = 0.1, when the user swipes the length of a slide then all slides will slide 90% to the left
    const transformPercentage = 1 - Math.pow(0.8, transformFactor);

    const newRenderedSlides = prevRenderedSlides.map((slide, index) => {
      const { position, slideIndex, dataIndex } = slide;
      if (dataIndex === -1) return slide;
      const maxDeltaX =
        swipePositionInfo[index][swipeLeft ? 'maxLeft' : 'maxRight'];

      const targetPosition =
        position + (swipeLeft ? -1 : 1) * maxDeltaX * transformPercentage;
      const { scale, opacity } = this.getSlideScaleAndOpacity(targetPosition);
      let zIndex = slide.zIndex;
      if (Math.abs(slideIndex) === 1) {
        if (this.centerOffset(slideIndex) < this.centerOffset(0)) {
          zIndex = this.maxZIndex;
          tempShift = true;
        }
      }
      return {
        ...slide,
        position: targetPosition,
        scale,
        opacity,
        zIndex
      };
    });

    this.setState({
      renderedSlides: newRenderedSlides,
      tempShift
    });
  };

  private resetSlides = () => {
    const { renderedSlides } = this.state;
    const newDefault = renderedSlides.map((slide) => {
      const { opacity, scale, position } = this.safeGetSlideInfo(
        slide.slideIndex
      );
      return {
        ...slide,
        zIndex: this.getZIndex(slide.slideIndex),
        opacity,
        scale,
        position
      };
    });
    this.setState(() => {
      return { renderedSlides: newDefault };
    }, this.debouncedClearInvisibleSlide);
  };

  private onSwipeEnd = (e: React.MouseEvent | React.TouchEvent) => {
    const { swipeStarted } = this.state;
    if (!swipeStarted) return;
    const { initalSwipeX } = this.state;
    const currentSwipeX = this.getSwipeX(e);
    const swipeDistance = initalSwipeX - currentSwipeX;
    const delta = Math.abs(swipeDistance);
    let swipeLeft = swipeDistance > 0;

    const swipeThreshold = this.props.swipeThreshold || 50;
    this.moveCarousel(delta <= swipeThreshold ? 0 : swipeLeft ? 1 : -1);
    this.setState({ tempShift: false });
  };

  goNext = () => {
    this.moveCarousel(1);
  };

  goBack = () => {
    this.moveCarousel(-1);
  };

  swipeTo = (steps: number) => {
    this.moveCarousel(steps);
  };

  render() {
    const { swipeStarted, renderedSlides, swipRight, tempShift } = this.state;
    const {
      slideComponent: Component,
      transitionTime = StackedCarousel.defaultTransitionTime,
      className,
      data,
      slideWidth,
      customTransition,
      carouselWidth,
      useGrabCursor,
      height
    } = this.props;

    const cursor =
      useGrabCursor && (swipeStarted ? 'grabbing' : 'grab') || 'default';
    return (
      <div
        className={`react-stacked-center-carousel ${className || ''}`}
        onMouseDown={this.onSwipeStart}
        onMouseUp={this.onSwipeEnd}
        onMouseMove={this.onSwipe}
        onMouseLeave={this.onSwipeEnd}
        onTouchStart={this.onSwipeStart}
        onTouchMove={this.onSwipe}
        onTouchEnd={this.onSwipeEnd}
        ref={this.listRef}
        style={{
          width: carouselWidth,
          height: height || this.height,
          position: 'relative',
          overflow: 'hidden',
          cursor
        }}
      >
        {renderedSlides.map(
          ({
            opacity,
            slideIndex,
            dataIndex,
            position,
            scale,
            key,
            zIndex
          }) => {
            const ID = dataIndex === -1 ? `hidden-${key}` : slideIndex;
            const zDuration =
              transitionTime * (swipRight && slideIndex <= 0 ? 0.5 : 1);
            const transition = swipeStarted
              ? 'none'
              : customTransition ||
                `all ${transitionTime}ms ease, z-index ${zDuration}ms ease`;
            const isCenterSlide = tempShift
              ? zIndex === this.maxZIndex
              : slideIndex === 0;
            return (
              <div
                key={key}
                className={`react-stacked-center-carousel-slide-${ID}`}
                draggable={false}
                style={{
                  position: 'absolute',
                  display: 'flex',
                  left: `calc(50% - ${slideWidth / 2}px)`,
                  transform: `translateX(${position}px) scale(${scale})`,
                  width: slideWidth,
                  transition,
                  opacity,
                  zIndex
                }}
              >
                {dataIndex !== -1 && (
                  <Component
                    dataIndex={dataIndex}
                    data={data}
                    slideIndex={slideIndex}
                    isCenterSlide={isCenterSlide}
                    swipeTo={this.swipeTo}
                  />
                )}
              </div>
            );
          }
        )}
      </div>
    );
  }
}

function shouldRecaclculate(prop1: props, prop2: props) {
  if (
    prop1.slideWidth !== prop2.slideWidth ||
    prop1.carouselWidth !== prop2.carouselWidth ||
    prop1.maxVisibleSlide !== prop2.maxVisibleSlide ||
    prop1.currentVisibleSlide !== prop2.currentVisibleSlide ||
    prop1.fadeDistance !== prop2.fadeDistance ||
    prop1.customScales !== prop2.customScales
  )
    return true;
  return false;
}

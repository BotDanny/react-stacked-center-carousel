export interface props {
  /**
   * An array of data items used to populate your slides.
   */
  data: any[];
  /**
   * The width of the carousel in px.
   */
  carouselWidth: number;
  /**
   * The width of each slide in px.
   */
  slideWidth: number;
  /**
   * Your component to render each slide.
   */
  slideComponent: React.ComponentType<any>;
  /**
   * Maximum amount of visible slides to display, must be an odd number.
   */
  maxVisibleSlide: number;
  /**
   * Current number of visible slides to display, defaults to maxVisibleSlide.
   */
  currentVisibleSlide?: number;
  /**
   * class name applied to the carousel container that contains the slides.
   */
  className?: string;
  /**
   * An array of numbers indicating the scale applied to the slide.
   */
  customScales?: number[];
  /**
   * How many pixel need to be swiped in order to triger the snapping effect.
   */
  swipeThreshold?: number;
  /**
   * Transition time (in ms) applied to all transition.
   */
  transitionTime?: number;
  /**
   * Custom css transition applied to all slide.
   */
  customTransition?: string;
  /**
   * The percentage of the amount of available that can be used for transition.
   */
  fadeDistance?: number;
  /**
   * Whether or not to use the grab and grabbing cursor when swiping.
   */
  useGrabCursor?: boolean;
  /**
   * The height applied to the carousel. It is calculated automatically by default
   */
  height?: number;
  /**
   * disable drag/swipe.
   */
  disableSwipe?: boolean;
  /**
   * A call back function that will be called on first mount and when the center slide changes.
   */
  onActiveSlideChange?: (activeSlide: number) => void;
}

export interface slideProp {
  dataIndex: number;
  data: any[];
  slideIndex: number;
  isCenterSlide: boolean;
  swipeTo: (steps: number) => void;
}

export interface renderedSlide {
  position: number;
  dataIndex: number;
  scale: number;
  slideIndex: number;
  opacity: number;
  key: number;
  zIndex: number;
}

export interface staticSlideInfo {
  position: number;
  scale: number;
  opacity: number;
  maxTransformDistance: {
    left: number;
    right: number;
  };
  maxTransformScale: {
    left: number;
    right: number;
  };
  maxTransformOpacity: {
    left: number;
    right: number;
  };
  slideIndex: number;
}

export interface swipePositionInfo {
  slideIndex: number;
  maxLeft: number;
  maxRight: number;
}

export interface slideInfoMap {
  [key: string]: staticSlideInfo;
}

export interface state {
  swipeStarted: boolean;
  initalSwipeX: number;
  renderedSlides: renderedSlide[];
  prevRenderedSlides: renderedSlide[];
  swipePositionInfo: swipePositionInfo[];
  swipRight: boolean;
  tempShift: boolean;
}

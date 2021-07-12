export interface props {
  data: any[];
  carouselWidth: number;
  slideWidth: number;
  slideComponent: React.ComponentType<any>;
  maxVisibleSlide: number;
  className?: string;
  currentVisibleSlide?: number;
  customScales?: number[];
  swipeThreshold?: number;
  transitionTime?: number;
  customTransition?: string;
  fadeDistance?: number;
  useGrabCursor?: boolean;
  height?: number;
  disableSwipe?: boolean;
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

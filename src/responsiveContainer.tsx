import React from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { StackedCarousel } from '.';
export interface ResponsiveContainerProps {
  render: (
    width: number,
    carouselRef?: React.RefObject<StackedCarousel>
  ) => React.ReactNode;
  carouselRef?: React.MutableRefObject<StackedCarousel | undefined>;
}

export default function ResponsiveContainer(props: ResponsiveContainerProps) {
  const { render, carouselRef } = props;
  const { width, ref } = useResizeDetector();

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={{
        width: '100%'
      }}
    >
      {width && render(width, carouselRef as React.RefObject<StackedCarousel>)}
    </div>
  );
}

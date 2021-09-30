import { useLayoutEffect, useRef, useState } from 'react';

export interface SlideDivProps {
  slideContents: Array<String>
}

export default function SlideDiv(props: SlideDivProps) {
  const [fontSize, setFontSize] = useState(200);
  const rectRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const resizeFont = () => {
      const elementRef = rectRef?.current?.getBoundingClientRect();
      const parentRect = rectRef?.current?.parentElement?.getBoundingClientRect();
      if (elementRef !== undefined && parentRect !== undefined) {
        const k = elementRef.width / fontSize;
        const widthFontSize = parentRect.width / k;
        const l = elementRef.height / fontSize;
        const heightFontSize = parentRect.height / l;
        if (heightFontSize !== Infinity) {
          setFontSize(Math.max(Math.min(heightFontSize, widthFontSize), 200));
        }
      }
      else {
        setFontSize(200);
      }
    };
    resizeFont();
    window.addEventListener("resize", resizeFont);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <p className="slide-text" style={{ fontSize: fontSize }} ref={rectRef}>
        {props.slideContents}
      </p>
    </>
  );
}

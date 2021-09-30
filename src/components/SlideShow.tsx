import { useEffect, useRef } from "react"

export interface SlideShowprops {
  slides: Array<JSX.Element>,
  currentSlide: number,
  setCurrentSlide: React.Dispatch<React.SetStateAction<number>>
};

export default function SlideShow(props: SlideShowprops) {
  const keyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const func = (ev: KeyboardEvent) => {
      if (ev.key === ' ') {
        props.setCurrentSlide((prev) => (prev + 1) % props.slides.length)
      }
    }

    const ref = keyRef?.current;
    ref?.focus();
    ref?.addEventListener("keypress", func);

    return () => {
      ref?.removeEventListener("keypress", func);
    }
  });

  return (
    <div className="slide" tabIndex={0} ref={keyRef}>
      {props.slides[props.currentSlide]}
    </div>
  )
}
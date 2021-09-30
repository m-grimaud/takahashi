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
      const mod = (n: number, m: number): number => {
        return ((n % m) + m) % m;
      }

      const m = props.slides.length;
      if (ev.key === "ArrowRight") {
        props.setCurrentSlide((prev) => mod(prev + 1, m))
      }
      else if (ev.key  === "ArrowLeft") {
        props.setCurrentSlide((prev) => mod(prev - 1, m))
      }
    }

    const ref = keyRef?.current;
    ref?.focus();
    ref?.addEventListener("keydown", func);

    return () => {
      ref?.removeEventListener("keydown", func);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="slide" tabIndex={0} ref={keyRef}>
      {props.slides[props.currentSlide]}
    </div>
  )
}
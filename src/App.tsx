import { useState } from 'react';
import Footer from './components/shared/Footer';
import SlideGen, { SlideGenProps } from './components/SlideGen';
import SlideShow, { SlideShowprops } from './components/SlideShow';

function App() {
  const [contents, setSlideContents] = useState<string>('');
  const [slideDiv, setSlideDiv] = useState<Array<JSX.Element>>([]);
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const slideShowProps: SlideShowprops = {
    slides: slideDiv,
    currentSlide: currentSlide,
    setCurrentSlide: setCurrentSlide
  };

  const props: SlideGenProps = {
    slideContents: contents,
    setSlideContents: setSlideContents,
    slideDiv: slideDiv,
    setSlideDiv: setSlideDiv
  };

  let view: JSX.Element | JSX.Element[] = [];

  if (slideDiv.length === 0) {
    view = <SlideGen {...props} />;
  } else {
    view = <SlideShow {...slideShowProps}/>
  }

  return (
    <>
      <nav className="header">
        <h3 className="no-margin-left">
          Takashi Method
        </h3>
        <button className="no-margin-right" onClick={() => {
          setSlideContents('');
          setSlideDiv([]);
          setCurrentSlide(0);
        }}>
          Reset
        </button>
      </nav>
      <main className="contents">
        {view}
      </main>
      <Footer />
    </>
  );
}
export default App;

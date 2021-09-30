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
    view = <SlideShow {...slideShowProps} />
  }

  return (
    <>
      <nav className="header" id={slideDiv.length > 0 ? "autohide" : ""}>
        <h3 className="no-margin-left">
          Takashi Method
        </h3>
        <div className="no-margin-right">
          <button style={{margin: "0 1rem 0 0"}} onClick={() => {
            setSlideDiv([]);
            setCurrentSlide(0);
          }}>
            Edit Slides
          </button>
          <button onClick={() => {
            setSlideContents('');
            setSlideDiv([]);
            setCurrentSlide(0);
          }}>
            Reset
          </button>
        </div>
      </nav>
      <main className="contents">
        {view}
      </main>
      {slideDiv.length === 0 && <Footer />}
    </>
  );
}
export default App;

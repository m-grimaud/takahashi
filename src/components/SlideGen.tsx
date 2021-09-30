import { nanoid } from 'nanoid';
import React from 'react';
import SlideDiv, { SlideDivProps } from './SlideDiv';

export interface SlideGenProps {
  slideContents: string,
  setSlideContents: React.Dispatch<React.SetStateAction<string>>,
  slideDiv: Array<JSX.Element>,
  setSlideDiv: React.Dispatch<React.SetStateAction<Array<JSX.Element>>>
};

export default function SlideGen(props: SlideGenProps) {
  const handleChange = (ele: React.ChangeEvent<HTMLTextAreaElement>): void => {
    props.setSlideContents(ele.target.value);
  }

  const parseContents = (): void => {
    const makeSlide = (contents: string[]): void => {
      contents[contents.length - 1] = contents[contents.length - 1].trimRight();
      if (contents[0].length === 0) {
        // unicode for nonbreaking space
        contents[0] = "\u00a0";
      }
      const newSlide: SlideDivProps = {
        slideContents: contents
      };

      const newDiv = <SlideDiv {...newSlide} key={nanoid()}/>;
      props.setSlideDiv(prev => [...prev, newDiv]);
    }

    if (props.slideDiv.length > 0) {
      props.setSlideDiv([]);
    }

    let slide: Array<string> = [];

    let i = 0;
    while (i < props.slideContents.length) {
      let j = i;

      while (j < props.slideContents.length && props.slideContents[j] !== '\n') {
        j++;
      }

      let line: string = props.slideContents.slice(i, j);
      i = j + 1;

      line = line.trim();

      if (line.length === 0 || line[0] === '\\') {
        if (slide.length > 0) {
          makeSlide(slide);
        }

        if (line[0] === '\\') {
          makeSlide([' ']);
        }

        slide = [];
      } else if (line[0] !== '#') {
        slide.push(line + ' ');
      }
    }

    if (slide.length > 0) {
      makeSlide(slide);
    }
  }

  return (
    <>
      <textarea value={props.slideContents} onChange={handleChange} className="full-text" placeholder='Enter your slides here, then click "Generate Slides" below.'>
      </textarea>
      <button style={{ float: "right" }} onClick={parseContents}>
        Generate Slides
      </button>
      <p>
        Create presentation slides using the <a href="https://en.wikipedia.org/wiki/Takahashi_method" target="_blank" rel="noreferrer">Takahashi Method</a>, emphasizing the use of few words in large print with no charts or pictures.
        Slides are structured as described below.
      </p>
      <ul>
        <li>
          One or more blank lines between sentences designates paragraphs.
        </li>
        <li>
          One slide per paragraph.
        </li>
        <li>
          Lines starting with <code>#</code> are ignored.
        </li>
        <li>
          Lines starting with <code>\</code> produce an empty slide.
        </li>
        <li>
          Cycle through slides by using the left and right arrow keys.
        </li>
      </ul>
      <p>
        <strong>
          Help! My text cuts off!
        </strong>
        This is intentional. Use more slides with less words on each slide.
      </p>
    </>
  )
}

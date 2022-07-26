import { useState, useMemo } from "react";
import Slick from "react-slick";
import {
  Overlay,
  Global,
  Header,
  CloseBtn,
  ImgWrapper,
  Indicator,
  SlickWrapper,
} from "./styles";

const ImagesZoom = ({ images, onClose }) => {
  const style = useMemo(() => {
    return {
      position: "fixed",
      zIndex: 5000,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    };
  }, []);

  const [currentSlide, setCurrentSlide] = useState(0);
  return (
    <>
      <Overlay>
        <Global />
        <Header>
          <h1>상세이미지</h1>
          <CloseBtn onClick={onClose}>d</CloseBtn>
        </Header>
        <SlickWrapper>
          <Slick
            //   style={style}
            initialSlide={0}
            beforeChange={(slide) => setCurrentSlide(slide)}
            infinite
            arrows={false}
            slidesToShow={1}
            slidesToScroll={1}
          >
            {images.map((v) => (
              <ImgWrapper key={v.src}>
                <img src={v.src} alt={v.src} />
              </ImgWrapper>
            ))}
          </Slick>
          <Indicator>
            <div>
              {currentSlide + 1} /{images.length}
            </div>
          </Indicator>
        </SlickWrapper>
      </Overlay>
    </>
  );
};

export default ImagesZoom;

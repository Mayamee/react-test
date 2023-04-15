import { FC, useState } from 'react';
import cn from 'classnames';
import image from '../../assets/react.svg';
interface CarouselProps {}
interface CarouselItemProps {
  image: string;
  isActive: boolean;
}
const data: any[] = [
  {
    image,
    isActive: true,
  },
  {
    image,
    isActive: false,
  },
  {
    image,
    isActive: false,
  },
];
const CarouselItem: FC<CarouselItemProps> = ({ isActive = false, image }) => {
  const classes = cn('carousel-item', {
    active: isActive,
  });
  return (
    <div className={classes}>
      <img alt="" className="d-block w-100" src={image} />
    </div>
  );
};
const Carousel: FC<CarouselProps> = ({}) => {
  const activeIndex = useState<number>(0);
  return (
    <div id="carousel" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">{}</div>
      <button
        className="carousel-control-prev"
        data-bs-target="#carousel"
        type="button"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        data-bs-target="#carousel"
        type="button"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};
export default Carousel;

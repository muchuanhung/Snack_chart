import bannerimg from '../assets/source/photo-1512484457149-266d165a4eca.avif';
import bannerslogn from '../assets/source/lg-想吃甜點是不需要理由的.svg';
import '../styles/Banner.css';

const Banner = () => {
  return (
    <>
      <div className="banner position-relative d-flex justify-content-center">
        <img className="bannerimg" src={bannerimg} alt="Banner" />
        <img className="bannerslogn" src={bannerslogn} alt="Banner_slogn" />
      </div>
    </>
  );
};

export default Banner;

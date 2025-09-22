import React, { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; 
import { FaCircle, FaRegCircle } from "react-icons/fa"; 
import "./Imagescroll.css"; 
import imag1 from '../images/computers-waste.jpg';
import imag2 from "../images/Corporate IT Recycling Drives_ Steps for Success.jpg";
import imag3 from "../images/earth-with-environment.jpg";
import imag4 from "../images/logo-with-tree.jpg";
import imag5 from "../images/recylce-dustbin.jpg";
import imag6 from "../images/recyle-loso-with-green.jpg";
import imag7 from "../images/this-is-circuit-boreds-extracted-from-old-computers-makeitbetter.jpg";

const images = [ imag1, imag2, imag3, imag4, imag5, imag6, imag7 ];

const ImageScroll = () => {
  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const manualScrollTimeout = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll(); // Cleanup on unmount
  }, []);

  useEffect(() => {
    stopAutoScroll(); 
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        let nextIndex = (prevIndex + 1) % images.length;
        scrollToImage(nextIndex);
        return nextIndex;
      });
    }, 3000); // Auto-scroll every 3 seconds

    return () => stopAutoScroll();
  }, [currentIndex]); // Re-run on every index update

  const startAutoScroll = () => {
    stopAutoScroll(); // Clear previous interval
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        let nextIndex = (prevIndex + 1) % images.length;
        scrollToImage(nextIndex);
        return nextIndex;
      });
    }, 3000);
  };

  const stopAutoScroll = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const handleManualScroll = () => {
    stopAutoScroll(); // Pause auto-scroll on manual scroll
    if (manualScrollTimeout.current) clearTimeout(manualScrollTimeout.current);
    manualScrollTimeout.current = setTimeout(() => startAutoScroll(), 5000);
  };

  const scrollLeft = () => {
    let prevIndex = (currentIndex - 1 + images.length) % images.length;
    scrollToImage(prevIndex);
    handleManualScroll();
  };

  const scrollRight = () => {
    let nextIndex = (currentIndex + 1) % images.length;
    scrollToImage(nextIndex);
    handleManualScroll();
  };

  const scrollToImage = (index) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = index * scrollRef.current.clientWidth;
      setCurrentIndex(index);
    }
  };

  return (
    <div className="image-scroll-container">
      {/* Left Arrow */}
      <FaChevronLeft onClick={scrollLeft} className="iconStyle leftIcon" />
      
      {/* Image Scroll Container */}
      <div className="scrollContainerStyle" ref={scrollRef}>
        {images.map((src, index) => (
          <img key={index} src={src} alt={`Image ${index + 1}`} className="imageStyle" />
        ))}
      </div>

      {/* Right Arrow */}
      <FaChevronRight onClick={scrollRight} className="iconStyle rightIcon" />

      {/* Navigation Dots */}
      <div className="dotsContainerStyle">
        {images.map((_, index) => (
          <span key={index} onClick={() => scrollToImage(index)}>
            {currentIndex === index ? <FaCircle className="activeDotStyle" /> : <FaRegCircle className="dotStyle" />}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ImageScroll;

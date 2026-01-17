import React, { useEffect, useState } from "react";
import "./ajioHome.css";


  const banners = [
    "https://assets-jiocdn.ajio.com/cms/AJIO/WEB/D-FASHIONATION-UHP-Z1-S1-MAIN-BANNER-50-90-08012026.jpg",
    "https://assets-jiocdn.ajio.com/cms/AJIO/WEB/D-FN-1.0-UHP-Z1-S3-Mainbanner-P15-jockey-max-under599-140126.jpg",
    "https://assets-jiocdn.ajio.com/cms/AJIO/WEB/D-FN-1.0-UHP-Z1-S3-Mainbanner-P2-Casio-Upto50-140126.jpg",
    "https://assets-jiocdn.ajio.com/cms/AJIO/WEB/D-FN-1.0-UHP-Z1-S3-Mainbanner-P3-IWLW-40to70off-140126.jpg",
    "https://assets-jiocdn.ajio.com/cms/AJIO/WEB/D-FN-1.0-UHP-Z1-S3-Mainbanner-P4-Dnmx-Avaasa-Under499-140126.jpg",
    "https://assets-jiocdn.ajio.com/cms/AJIO/WEB/D-FN-1.0-UHP-Z1-S3-Mainbanner-P5-bitiyabybhama-pixienprince-min65-140126.jpg",
    "https://assets-jiocdn.ajio.com/cms/AJIO/WEB/D-FN-1.0-UHP-Z1-S3-Mainbanner-P6-cantabil-campussutra-min60-140126.jpg",
    "https://assets-jiocdn.ajio.com/cms/AJIO/WEB/D-FN-1.0-UHP-Z1-S3-Mainbanner-P7-guess-stevemadden-aldo-min40-140126.jpg",
    "https://assets-jiocdn.ajio.com/cms/AJIO/WEB/D-FN-1.0-UHP-Z1-S3-Mainbanner-P9-superdry-min50-140126.jpg",
    "https://assets-jiocdn.ajio.com/cms/AJIO/WEB/D-FN-1.0-UHP-Z1-S3-Mainbanner-P9-ax-min40-140126.jpg",
    "https://assets-jiocdn.ajio.com/cms/AJIO/WEB/D-FN-1.0-UHP-Z1-S3-Mainbanner-P9-gap-min50-140126.jpg",
    "https://assets-jiocdn.ajio.com/cms/AJIO/WEB/D-FN-1.0-UHP-Z1-S3-Mainbanner-P10-biba-soch-min50-140126.jpg",
    "https://assets-jiocdn.ajio.com/cms/AJIO/WEB/D-FN-1.0-UHP-Z1-S3-Mainbanner-P12-adidas-puma-min50-140126.jpg",
    "https://assets-jiocdn.ajio.com/cms/AJIO/WEB/D-FN-1.0-UHP-Z1-S3-Mainbanner-P13-wishcare-thefaceshop-upto50-extra30-140126.jpg",
    "https://assets-jiocdn.ajio.com/cms/AJIO/WEB/D-FN-1.0-UHP-Z1-S3-Mainbanner-P9-Budajeans-Min65-140126.jpg",
    "https://assets-jiocdn.ajio.com/cms/AJIO/WEB/D-FN-1.0-UHP-Z1-S3-Mainbanner-P14-louisphilippe-allensolly-min40-140126.jpg",
  ];

export default function BannerCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 3500);

    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % banners.length);
  };

  return (
    <div className="ajioBannerWrap">
      <div className="ajioBannerSlider">
        {/* ✅ Only ONE banner shown */}
        <img className="ajioBannerImg" src={banners[index]} alt="banner" />

        <button className="ajioBannerArrow left" onClick={prevSlide}>
          ‹
        </button>

        <button className="ajioBannerArrow right" onClick={nextSlide}>
          ›
        </button>

        <div className="ajioDots">
          {banners.map((_, i) => (
            <span
              key={i}
              className={`ajioDot ${i === index ? "active" : ""}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
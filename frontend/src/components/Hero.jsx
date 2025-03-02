import React from "react";

const Hero = ({ title, imageUrl }) => {
  return (
    <>
      <div className="hero container">
        <div className="banner">
          <h1>{title}</h1>
          <p>
            Welcome to MediConnect, the future of healthcare at your fingertips!{" "}
          </p>
          <p>
            Our facility offers comprehensive medical services, from routine
            check-ups to emergency care, all under one roof. With real-time
            systems in place, you can easily access top doctors, advanced
            treatments, and hospital bed availability, providing you with a
            hassle-free experience.
          </p>
          <p>
            Whether you’re seeking immediate attention or planning a regular
            visit, MediConnect Hospital allows you to book appointments, check
            availability, and explore the best treatment options quickly and
            effortlessly. We're committed to delivering quality care, ensuring
            you receive the right attention, exactly when you need it.
          </p>
        </div>
        <div className="banner">
          <img src={imageUrl} alt="hero" className="animated-image" />
          <span>
            <img src="/Vector.png" alt="vector" />
          </span>
        </div>
      </div>
    </>
  );
};

export default Hero;

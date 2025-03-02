import React from "react";

const Biography = ({imageUrl}) => {
  return (
    <>
      <div className="container biography">
        <div className="banner">
          <img src={imageUrl} alt="whoweare" />
        </div>
        <div className="banner">
          <h2><b>Biography</b></h2>
          <h4>Who Are We?</h4>
          <p>
          MediConnect transforms the way you engage with healthcare, 
          bringing the entire spectrum of hospital services to your fingertips. 
          Whether you need to book a hospital bed in an emergency, 
          find the best available treatment options, or simply browse the services offered by nearby hospitals, 
          MediConnect is designed to simplify every step of your healthcare journey.</p><br></br>
          <p>Our app offers real-time updates on bed availability, 
          allowing you to secure hospital rooms during critical moments without the stress of visiting multiple facilities.
           You can search for nearby hospitals, check available beds, 
           and book one instantly removing the barriers to immediate care when time is of the essence.
           Beyond just bed bookings, MediConnect helps you explore comprehensive treatment options offered by different hospitals. 
           Whether you're looking for specialized surgeries, rehabilitation, or routine check-ups, our platform provides detailed descriptions, doctor qualifications, and patient reviews for informed decision-making</p><br></br><p>
           The app's intuitive interface makes it easy to navigate through services like emergency care, outpatient appointments, diagnostic tests, and even telemedicine consultations, allowing you to connect with healthcare providers from the comfort of your home.
           With MediConnect, we're not just making hospital services accessible we're making healthcare personal, timely, and stress-free. Your health matters, and we're here to ensure you get the care you need, exactly when you need it. MediConnect: Bridging the gap between patients and quality healthcare, one tap at a time.

          </p>
        </div>
      </div>
    </>
  );
};

export default Biography;
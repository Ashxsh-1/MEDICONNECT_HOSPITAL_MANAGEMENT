import React from "react";

const Developers = () => {
  const cards = [
    {
      title: "Indroneel Goswami",
      imgSrc: "./indroneel.jpg",
      description: "Full Stack Web Developer | Competitive Programmer",
      linkedinUrl: "https://www.linkedin.com/in/indroneel-goswami-403350285/",
    },
    {
      title: "MA Akankshya",
      imgSrc: "./akankshya.jpeg",
      description: "MERN Stack Developer",
      linkedinUrl: "https://www.linkedin.com/in/m-a-akankshya-53314a263/",
    },
    {
      title: "",
      imgSrc: "",
      description: "",
      linkedinUrl: "",
    },
    {
      title: "Ipsita Patra",
      imgSrc: "./ipsita.jpeg",
      description: "Full Stack Web Developer",
      linkedinUrl: "https://www.linkedin.com/in/ipsita-patra-372380290/",
    },
  ];

  return (
    <div className="p-5 !mt-[40px]">
      <h1 className="text-3xl font-bold mb-5 text-center">Developers</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 !m-0 justify-items-center">
        {cards.map((card, index) => (
          <div
            key={index}
            className="card w-full md:w-96 shadow-xl !p-4 !rounded-lg !border !border-gray-200 !m-4"
          >
            <figure
              className="relative w-full h-48 md:h-64 !overflow-hidden !rounded-lg"
              style={{ paddingTop: "75%" }}
            >
              <img
                src={card.imgSrc}
                alt="Card"
                className="absolute top-0 left-0 w-full h-full object-cover !rounded-lg"
              />
            </figure>
            <div className="card-body !p-4">
              <h2 className="card-title text-lg !font-bold ">
                {card.title}
              </h2>
              <p className="!text-sm">{card.description}</p>
              <div className="card-actions justify-end mt-2">
                <button
                  className="btn !bg-blue-500 !text-white !px-4 !py-2 !rounded-lg !shadow hover:!bg-blue-600"
                  onClick={() => window.open(card.linkedinUrl, "_blank")}
                >
                  Know More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Developers;

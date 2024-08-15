import { BiWorld } from "react-icons/bi"; 
import React from "react";
import { Link } from "react-router-dom";
import { TypeAnimation } from 'react-type-animation';

const Hero = () => {
  return (
    <section className="flex p-4 flex-col justify-center items-center w-full min-h-screen bg-slate-700">
      <TypeAnimation
        sequence={[
          "Welcome to Our News App", 1000,
          "", 500,
          "Get the Latest Updates", 1000,
        ]}
        wrapper="span"
        speed={50}
        style={{ fontSize: '2em', color: 'white', textAlign: 'center', marginBottom: '20px' }}
        repeat={Infinity}
      />
      <Link to="/all-news" className="flex items-center bg-black p-3 rounded-lg w-[200px] justify-center text-white hover:bg-gray-800 transition-all duration-300">
        <span className="m-1">News</span> 
        <BiWorld size={24} />
      </Link>
    </section>
  );
};

export default Hero;
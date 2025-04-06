// src/components/HeroSection.js
import React from "react";

const HeroSection = () => {
  return (
    <section className="bg-blue-600 text-white text-center py-20">
      <h1 className="text-5xl font-bold">Your Health, Our Priority</h1>
      <p className="mt-4 text-lg">Advanced healthcare solutions at your fingertips.</p>
      <button className="mt-6 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg">
        Book an Appointment
      </button>
    </section>
  );
};

export default HeroSection;

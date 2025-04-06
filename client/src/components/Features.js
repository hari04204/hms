// src/components/Features.js
import React from "react";
import { FaStethoscope, FaAmbulance, FaUserMd } from "react-icons/fa";

const features = [
  { icon: <FaStethoscope />, title: "Advanced Equipment", desc: "State-of-the-art medical technology." },
  { icon: <FaAmbulance />, title: "24/7 Emergency", desc: "Round-the-clock emergency services." },
  { icon: <FaUserMd />, title: "Expert Doctors", desc: "Qualified and experienced professionals." },
];

const Features = () => {
  return (
    <section className="py-16 text-center bg-white">
      <h2 className="text-3xl font-bold mb-6">Why Choose Us?</h2>
      <div className="flex justify-center gap-8">
        {features.map((feature, index) => (
          <div key={index} className="p-6 bg-gray-200 rounded-lg w-64">
            <div className="text-4xl mb-3">{feature.icon}</div>
            <h3 className="text-xl font-semibold">{feature.title}</h3>
            <p className="text-gray-600">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
    
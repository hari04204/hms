// src/components/Testimonials.js
import React from "react";

const testimonials = [
  { name: "John Doe", review: "Amazing doctors and excellent care!" },
  { name: "Jane Smith", review: "Highly professional staff and great facilities." },
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-gray-100 text-center">
      <h2 className="text-3xl font-bold mb-6">What Our Patients Say</h2>
      <div className="flex justify-center gap-8">
        {testimonials.map((t, index) => (
          <div key={index} className="p-6 bg-white rounded-lg shadow-md w-64">
            <p className="italic">"{t.review}"</p>
            <h3 className="mt-4 font-semibold">- {t.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;

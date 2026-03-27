"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { fadeUp, fadeUpItem, staggerContainer } from "@/features/landing/constants/animations";
import { LANDING_CONTAINER_CLASS } from "@/features/landing/constants/layout";
import { TESTIMONIALS } from "@/features/landing/data/landing-data";

export function TestimonialsSection() {
  return (
    <section className="relative py-24 lg:py-40 bg-white">
      <div className={LANDING_CONTAINER_CLASS}>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-3xl mb-20"
        >
          <h2 className="text-4xl sm:text-5xl font-light tracking-tight text-zinc-900">
            Trusted by Leaders
            <br />
            <span className="text-zinc-400">Customer Success Stories</span>
          </h2>
          <p className="mt-6 text-lg text-primary font-medium">
            Real feedback from our global logistics partners
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {TESTIMONIALS.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={fadeUpItem}
              className="bg-zinc-50 p-8 rounded-3xl border border-zinc-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={`${testimonial.id}-star-${i}`} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-zinc-600 italic leading-relaxed mb-8">
                  "{testimonial.content}"
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-zinc-200 flex items-center justify-center font-bold text-zinc-500">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold text-zinc-900">{testimonial.name}</h4>
                  <p className="text-xs text-zinc-500">{testimonial.role}, {testimonial.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

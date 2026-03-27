import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { fadeUp } from "@/features/landing/constants/animations";
import { LANDING_CONTAINER_CLASS } from "@/features/landing/constants/layout";
import { SAMPLE_ARCS, VALUES } from "@/features/landing/data/landing-data";

const World = dynamic(() => import("@/components/ui/globe").then((module) => module.World), {
  ssr: false,
});

export function SystemThinkingSection() {
  return (
    <section className="relative py-32 lg:py-40 flex items-center justify-center overflow-hidden bg-white">
      <div className={`${LANDING_CONTAINER_CLASS} grid lg:grid-cols-2 gap-16 items-center`}>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="z-10"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-zinc-900">
            Viewing Logistics
            <br />
            <span className="text-primary font-medium">As A Unified System</span>
          </h2>
          <p className="mt-8 text-xl font-light text-zinc-600">
            Shipments functioning as parts of interconnected supply chains
          </p>
          <p className="mt-8 text-lg font-light text-zinc-500 leading-relaxed border-l-2 border-zinc-200 pl-6">
            Designing logistics from supplier hubs to final delivery endpoints to run as one continuous
            flow
          </p>

          <div className="mt-16 grid sm:grid-cols-2 gap-x-8 gap-y-10">
            {VALUES.map((value) => (
              <div key={value.title} className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-zinc-100 text-zinc-500">
                    <value.icon className="w-4 h-4 text-primary" />
                  </div>
                  <h4 className="text-base font-medium text-zinc-900">{value.title}</h4>
                </div>
                <p className="text-zinc-500 leading-relaxed font-light pl-11 text-sm">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative lg:h-[800px] w-full flex items-center justify-center lg:justify-end"
        >
          <div className="relative w-full aspect-square max-w-[350px] sm:max-w-[500px] lg:max-w-none lg:w-[800px] lg:h-[800px] opacity-90 lg:absolute lg:right-[-100px]">
            <World
              data={SAMPLE_ARCS}
              globeConfig={{
                pointSize: 4,
                globeColor: "#ffffff",
                showAtmosphere: true,
                atmosphereColor: "#e5e7eb",
                atmosphereAltitude: 0.1,
                emissive: "#ffffff",
                emissiveIntensity: 0.1,
                shininess: 0,
                polygonColor: "rgba(39, 39, 42, 0.4)",
                ambientLight: "#ffffff",
                arcTime: 1000,
                arcLength: 0.9,
                rings: 1,
                maxRings: 3,
                initialPosition: { lat: 20, lng: 100 },
                autoRotate: true,
                autoRotateSpeed: 0.5,
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

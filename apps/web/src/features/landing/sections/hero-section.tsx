import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { fadeUp } from "@/features/landing/constants/animations";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[85vh] flex-col items-center justify-center text-center overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/2-side.webp"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-b from-white/80 via-white/85 to-white" />
      </div>

      <motion.div className="w-full max-w-6xl px-6 lg:px-12 z-20">
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.1}
          className="mx-auto max-w-7xl text-5xl sm:text-6xl md:text-7xl lg:text-[6.5rem] xl:text-[7rem] font-light leading-[1.05] tracking-tight text-zinc-900"
        >
          Strategic Logistics
          <br />
          <span className="font-serif italic text-zinc-400">for Enterprise Operations</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.2}
          className="mx-auto mt-12 max-w-2xl text-lg sm:text-xl font-light leading-relaxed text-zinc-500"
        >
          Connecting every stage of your supply chain from first-mile pickup to final delivery with
          intelligent tracking and comprehensive operational control
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.3}
          className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Link href="/login" prefetch={false}>
            <Button className="cursor-pointer h-14 rounded-full px-10 text-sm tracking-wide bg-zinc-900 text-white hover:bg-zinc-800 shadow-xl shadow-zinc-900/10">
              Start a Conversation
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

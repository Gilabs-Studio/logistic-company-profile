import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { fadeUp } from "@/features/landing/constants/animations";
import { LANDING_CONTAINER_CLASS } from "@/features/landing/constants/layout";

export function ClosingCtaSection() {
  return (
    <section className="relative py-40 border-t border-zinc-200 bg-white">
      <div className={`${LANDING_CONTAINER_CLASS} text-center`}>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mx-auto max-w-3xl"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-zinc-900 leading-tight">
            Solidifying Your Distribution Network
            <br />
            <span className="font-serif italic text-zinc-500">Built Upon Dependable Execution</span>
          </h2>

          <div className="mt-12 space-y-4 text-xl font-light text-zinc-600">
            <p>Establishing effective logistics execution</p>
            <p className="text-primary font-medium mt-6 text-2xl">
              Building structured systems for long-term operational success
            </p>
          </div>

          <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/login" prefetch={false}>
              <Button className="cursor-pointer h-14 rounded-full px-10 text-sm tracking-wide bg-zinc-900 text-white hover:bg-zinc-800 shadow-xl shadow-zinc-900/10">
                Design Your Network
              </Button>
            </Link>
            <Link href="/contact" prefetch={false}>
              <Button
                variant="outline"
                className="cursor-pointer h-14 rounded-full px-10 text-sm tracking-wide border-zinc-200 text-zinc-900 hover:bg-zinc-50 shadow-sm"
              >
                Contact Operations
              </Button>
            </Link>
          </div>
          <p className="mt-14 text-xs uppercase tracking-[0.2em] font-medium text-zinc-400">
            <Link
              href="/login"
              className="hover:text-primary transition-colors cursor-pointer mr-6"
            >
              Consult Associates
            </Link>
            •
            <Link
              href="/login"
              className="hover:text-primary transition-colors cursor-pointer ml-6"
            >
              Initialize Conversation
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { PERSONAL_INFO } from "@/lib/content";
import SectionHeading from "@/components/ui/SectionHeading";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function About() {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <SectionHeading number="01" title="about" />

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-6"
        >
          <motion.p
            variants={fadeInUp}
            className="text-fg-secondary text-lg leading-relaxed"
          >
            {PERSONAL_INFO.bio}
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="font-code text-sm bg-bg-secondary/50 border border-fg-primary/10 rounded-lg p-4 sm:p-6 overflow-x-auto"
          >
            <pre className="text-fg-secondary">
              <code>
                <span className="text-syntax-comment">
                  {"// "}{PERSONAL_INFO.philosophy}
                </span>
                {"\n\n"}
                <span className="text-syntax-purple">const</span>{" "}
                <span className="text-syntax-cyan">nicollas</span>{" "}
                <span className="text-fg-primary">=</span>{" "}
                <span className="text-fg-primary">{"{"}</span>
                {"\n"}
                {"  "}
                <span className="text-syntax-blue">name</span>
                <span className="text-fg-primary">:</span>{" "}
                <span className="text-syntax-green">&quot;{PERSONAL_INFO.fullName}&quot;</span>
                ,{"\n"}
                {"  "}
                <span className="text-syntax-blue">role</span>
                <span className="text-fg-primary">:</span>{" "}
                <span className="text-syntax-green">&quot;{PERSONAL_INFO.role}&quot;</span>
                ,{"\n"}
                {"  "}
                <span className="text-syntax-blue">location</span>
                <span className="text-fg-primary">:</span>{" "}
                <span className="text-syntax-green">&quot;{PERSONAL_INFO.location}&quot;</span>
                ,{"\n"}
                {"  "}
                <span className="text-syntax-blue">hackathons</span>
                <span className="text-fg-primary">:</span>{" "}
                <span className="text-syntax-purple">4</span>
                ,{"\n"}
                {"  "}
                <span className="text-syntax-blue">github</span>
                <span className="text-fg-primary">:</span>{" "}
                <span className="text-syntax-green">&quot;NicollasRezende&quot;</span>
                {"\n"}
                <span className="text-fg-primary">{"}"}</span>
              </code>
            </pre>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

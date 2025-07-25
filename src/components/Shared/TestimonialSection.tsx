"use client";
import Testimonial from "@/components/tax-advice/Testimonial";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Star } from "lucide-react";
import { useRef } from "react";

export default function TestimonialSection() {
  const container = useRef<HTMLDivElement>(null);

  // Image section animation (from right)
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo(
      container.current,
      { opacity: 0, x: 80 },
      {
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 85%",
        },
      },
    );
  }, []);

  return (
    <section ref={container} className="py-8 md:py-16 lg:py-24">
      <div className="container mx-auto py-8">
        <h2 className="text-foreground border-muted mx-auto mb-8 w-fit border-b-2 pb-8 text-center text-xl font-medium md:text-3xl lg:text-[40px]">
          What are people saying
        </h2>

        <div className="main-gradient section-inverted-radius rounded-lg">
          <Testimonial />
          <p className="text-background mt-5 text-center text-sm">
            Rated 4.5 / 5 based on 6230 reviews, Showing our latest reviews.
            <br />
            <span className="justify- flex items-center justify-center gap-2">
              <Star
                size={16}
                strokeWidth={1.5}
                fill="#00B67A"
                stroke="#00B67A"
              />
              <span className="font-semibold">Trustpilot</span>
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

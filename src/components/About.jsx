import React from "react";
import Marquee from "./Marquee";
import BlurText from "./BlurText";

const About = () => {
  return (
    <section id="about">
      <div className="h-fit md:pb-12 relative bg-black text-white">
        {/* Fade + Blur at Top */}

        {/* Main Content */}
        <div className="relative z-20  h-full">
          <div className="rounded-lg px-4 py-1 bg-white/8 backdrop-blur-lg border border-blue-500/20 w-fit flex items-center justify-center mx-auto mt-10">
            <h2 className="text-md text-center font-medium">About Us</h2>
          </div>
          <div>
            <BlurText
              text="Our solutions streamline workflows, enhance digital presence, and improve productivity with AI. We focus on building intelligent, scalable AI systems tailored to your business goals. Partner with us to unlock new growth, boost ROI, and stay ahead of the competition."
              delay={50}
              animateBy="words"
              direction="top"
              className="text-center text-2xl md:text-5xl text-white/70 px-5 md:w-4/5 leading-tight py-5 mx-auto mt-5"
            />
            {/* <p className="text-center text-2xl md:text-5xl text-white/70 px-5 md:w-4/5 leading-tight py-5 mx-auto mt-5">
              Our solutions streamline workflows, enhance digital presence, and
              improve productivity. We focus on building intelligent, scalable
              systems tailored to your business goals. Partner with us to unlock
              new growth, boost ROI, and stay ahead of the competition.
            </p> */}
          </div>
          <div className="flex items-center justify-center mt-5">
            <div className="relative inline-flex   group">
              <div className="absolute  -inset-px bg-[#3B82F6]   rounded-xl blur group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt bg-gradient-to-r"></div>

              <a
                href="https://calendly.com/nexglimpse/new-meeting"
                className="text-sm md:text-lg cursor-pointer relative inline-flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 duration-200  bg-[#3B82F6] hover:bg-[#2563EB]  text-white px-6 py-3 rounded-lg "
              >
                Book A 15-Min Call
              </a>
            </div>
          </div>

          <Marquee />
        </div>
      </div>
    </section>
  );
};

export default About;

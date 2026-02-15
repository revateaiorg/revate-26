import React from "react";
import WebDev from "../assets/web-dev.png";
import UiUx from "../assets/uiux.webp";
import ChatBot from "../assets/chat-bot.webp";
import VoiceAi from "../assets/voice-ai.png";
import Seo from "../assets/seo.webp";
import Automation from "../assets/automation.jpg";
import BlurText from "./BlurText";
import SpotlightCard from "./SpotlightCard";

const Services = () => {
  return (
    <section id="services">
      <div className="h-full text-white w-full">
        <div className="rounded-lg px-4 py-1 bg-white/8 backdrop-blur-lg border border-blue-500/20 w-fit flex items-center justify-center mx-auto md:mt-10">
          <h1 className="text-md text-center font-medium">Our Services</h1>
        </div>
        <div>
          <BlurText
            text=" We Don’t Just Build Websites."
            delay={50}
            animateBy="words"
            direction="top"
            className="text-center text-2xl md:text-5xl text-white px-5 md:w-4/5 leading-tight pt-5 mx-auto mt-5"
          />
          <BlurText
            text="We build systems that drive your growth."
            delay={50}
            animateBy="words"
            direction="top"
            className="text-center text-2xl md:text-5xl text-white/70 px-5 md:w-4/5 leading-tight pb-5 mx-auto "
          />
          {/* <p className="text-center text-2xl md:text-5xl text-white px-5 md:w-4/5 leading-tight py-5 mx-auto mt-5">
            We Don’t Just Build Websites. <br />
            <span className="text-white/70">
              We build systems that drive your growth.
            </span>
          </p> */}
        </div>

        <div className="mx-2 md:mx-16 lg:mx-32 flex justify-center items-stretch">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-4 md:gap-6 p-2 md:p-6 items-stretch h-full">
            {/* Left Column */}
            <div className="col-span-1 md:col-span-2 lg:col-span-5 flex flex-col h-full">
              {/* Large Card */}

              {/* <div className="bg-gradient-to-b from-[#1a1a1a] to-black p-5  rounded-3xl shadow-lg border border-white/10 flex flex-col h-full"> */}
              <SpotlightCard
                className="h-full flex flex-col custom-spotlight-card"
                spotlightColor="rgba(59, 130, 246, 0.2)"
              >
                <div
                  className="rounded-3xl mb-4 h-56 md:h-96 bg-cover bg-center"
                  style={{ backgroundImage: `url(${VoiceAi})` }}
                ></div>
                <h2 className="text-white text-3xl py-2 font-semibold mb-2">
                  AI Voice Agents
                </h2>
                <p className="text-white/70  mb-4">
                  Missed calls mean missed revenue. Our AI voice agents make
                  sure that never happens again. They answer calls in real time,
                  respond to FAQs, schedule or manage appointments, and transfer
                  important calls to your team when needed. Available 24/7, they
                  help you save time, cut costs, and turn more callers into
                  paying customers.
                </p>
                <div className="relative w-fit inline-flex my-5 group">
                  <div className="absolute -inset-px bg-[#3B82F6] rounded-xl blur group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt bg-gradient-to-r"></div>
                  <a
                    href="https://cal.com/pradeep-srinivasan/free-strategy-call"
                    className="text-sm md:text-md cursor-pointer relative inline-flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 duration-200 bg-[#3B82F6] hover:bg-[#2563EB] text-white px-6 py-3 rounded-lg"
                  >
                    Book An Appointment
                  </a>
                </div>
              </SpotlightCard>
              {/* </div> */}

              {/* Two Small Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 h-full">
                {/* Card 1 */}
                {/* <div className="bg-gradient-to-b from-[#1a1a1a] to-black p-4 rounded-3xl shadow-lg border border-white/10 flex flex-col h-full"> */}
                <SpotlightCard
                  className="h-full flex flex-col custom-spotlight-card"
                  spotlightColor="rgba(59, 130, 246, 0.2)"
                >
                  <div
                    className="rounded-3xl mb-4 h-56 md:h-40 bg-cover bg-center"
                    style={{ backgroundImage: `url(${WebDev})` }}
                  ></div>
                  <h2 className="text-white text-3xl py-2 font-semibold mb-2">
                    Web Development
                  </h2>
                  <p className="text-white/70 mb-4">
                    We build modern, responsive websites that look great and
                    drive results, helping your business stand out and grow
                    online.
                  </p>
                </SpotlightCard>
                {/* </div> */}

                {/* Card 2 */}
                <SpotlightCard
                  className="h-full flex flex-col custom-spotlight-card"
                  spotlightColor="rgba(59, 130, 246, 0.2)"
                >
                  <div
                    className="rounded-3xl mb-4 h-56 md:h-40 bg-cover bg-center"
                    style={{ backgroundImage: `url(${UiUx})` }}
                  ></div>
                  <h2 className="text-white text-3xl py-2 font-semibold mb-2">
                    UI/UX Design
                  </h2>
                  <p className="text-white/70 mb-4">
                    We specialize in providing top-notch UI/UX design services
                    aimed at creating intuitive and engaging user experiences.
                  </p>
                </SpotlightCard>
                {/* </div> */}
              </div>
            </div>

            {/* Right Column */}
            <div className="col-span-1 md:col-span-2 lg:col-span-3 flex flex-col gap-4 h-full">
              {/* Card 1 */}
              <SpotlightCard
                className="h-full flex flex-col custom-spotlight-card"
                spotlightColor="rgba(59, 130, 246, 0.2)"
              >
                <div
                  className="rounded-3xl mb-4 h-56 md:h-64 bg-cover bg-center"
                  style={{ backgroundImage: `url(${ChatBot})` }}
                ></div>
                <h2 className="text-white text-3xl py-2 font-semibold mb-2">
                  AI Chatbots
                </h2>
                <p className="text-white/70 mb-4">
                  Boost engagement with AI-powered chatbots that deliver fast,
                  personalized responses 24/7. They handle FAQs, guide visitors
                  to the right services, and capture leads, turning every
                  conversation into a conversion.
                </p>
              </SpotlightCard>
              {/* </div> */}

              {/* Card 2 */}
              {/* <div className="bg-gradient-to-b from-[#1a1a1a] to-black p-4 rounded-3xl shadow-lg border border-white/10 flex flex-col h-full"> */}
              <SpotlightCard
                className="h-full flex flex-col custom-spotlight-card"
                spotlightColor="rgba(59, 130, 246, 0.2)"
              >
                <div
                  className="rounded-3xl mb-4 h-56 md:h-64 bg-cover bg-center"
                  style={{ backgroundImage: `url(${Automation})` }}
                ></div>
                <h2 className="text-white text-3xl py-2 font-semibold mb-2">
                  AI Automation
                  {/* <span className="bg-orange-500 text-white text-xs px-2 py-1  rounded ml-2">
                    NEW
                  </span> */}
                </h2>
                <p className="text-white/70 mb-4">
                  Streamline your operations with AI automation that saves time,
                  reduces costs, and boosts efficiency. From handling repetitive
                  tasks to creating smart workflows, our solutions help your
                  business run smoothly and scale faster so you can focus on
                  growth.
                </p>
              </SpotlightCard>
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;

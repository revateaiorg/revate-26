import React from "react";
import { ArrowUpRight } from "lucide-react";
import LotFerox from "../assets/LotFerox.png"
import Quickidz from "../assets/quickidz.webp"
import TwentyOneGram from "../assets/21gram.webp"
import BlurText from "./BlurText";
import SilverStream from "../assets/SSP.png";
import { AudioPlayer } from "./AudioPlayer";
import SSPA from "../assets/audio/recording.wav";

const Work = () => {
  return (
    <section id="works">
      <div className="h-full text-white mt-26 w-full">
        <div className="rounded-lg px-4 py-1 bg-white/8 backdrop-blur-lg border border-blue-500/20 w-fit flex items-center justify-center mx-auto mt-10">
          <h2 className="text-md text-center font-medium">Our Works</h2>
        </div>
        <div>
          <BlurText
            text="Work That Speaks for Itself."
            delay={50}
            animateBy="words"
            direction="top"
            className="text-center text-2xl md:text-5xl text-white px-5 md:w-4/5 leading-tight pt-5 mx-auto mt-5"
          />
          <BlurText
            text="Backed by strategy. Driven by outcomes."
            delay={50}
            animateBy="words"
            direction="top"
            className="text-center text-2xl md:text-5xl text-white/70 px-5 md:w-4/5 leading-tight pb-5 mx-auto "
          />
        </div>

        {/* Tabs */}
        {/* <div className="flex justify-center items-center ">
          <div className="w-full px-2 md:px-0 md:w-1/3 my-5 flex flex-wrap justify-center items-center gap-4">
            <div className="border rounded-full px-4 py-2 cursor-pointer border-blue-300 bg-blue-950 text-blue-300">
              <p className="text-md text-center">All Works</p>
            </div>
            <div className="border border-gray-300 text-gray-300 rounded-full px-4 py-2 cursor-pointer">
              <p className="text-md text-center">AI Voice Agents</p>
            </div>
            <div className="border border-gray-300 text-gray-300 rounded-full px-4 py-2 cursor-pointer">
              <p className="text-md text-center">AI Chatbots</p>
            </div>
            <div className="border border-gray-300 text-gray-300 rounded-full px-4 py-2 cursor-pointer">
              <p className="text-md text-center">AI Automation</p>
            </div>
            <div className="border border-gray-300 text-gray-300 rounded-full px-4 py-2 cursor-pointer">
              <p className="text-md text-center">Web Development</p>
            </div>
          </div>
        </div> */}

        <div className="flex flex-col px-3 md:px-20 lg:px-32 mt-10 gap-10">


          {/* Card 1 */}
          <div className="w-full backdrop-blur-xl border border-gray-900 bg-white/5 rounded-3xl flex flex-col md:flex-row justify-between items-center px-4 py-5 space-y-4 md:space-y-0 md:space-x-4">
            {/* Image Section */}
            <div
              className="rounded-3xl w-full md:w-2/5 h-48 md:h-[55vh] border border-gray-900 bg-cover bg-center"
              style={{ backgroundImage: `url(${Quickidz})` }}
            ></div>

            {/* Content Section */}
            <div className="relative w-full md:w-3/5 border border-gray-900 bg-white/5 rounded-3xl p-5 flex flex-col justify-between h-auto md:h-[55vh]">
              <div className="space-y-4">
                <div className="rounded-lg px-3 py-1 bg-[#3B82F6] backdrop-blur-lg border border-blue-500/20 w-fit">
                  <h1 className="text-sm md:text-md font-medium">2026</h1>
                </div>

                <h1 className="text-2xl md:text-4xl font-semibold">
                  Quickidz
                </h1>

                <p className="text-sm md:text-md xl:text-lg text-white/70">
                  Designed and developed a conversion-focused landing page that uses storytelling to connect with parents, highlight key challenges in children's physical development, and guide visitors toward booking a free demo class. Beyond the website, built a custom management system to streamline lead bookings, client management, revenue tracking, staff management, and real-time business insights through a centralized dashboard.
                </p>

                <div>
                  <a
                    href="https://www.quickidz.in/"
                    className="w-fit px-3 py-1 bg-white text-black rounded-lg font-medium hover:bg-gray-200 transition-all duration-300 flex items-center gap-1"
                  >
                    Visit Site <ArrowUpRight className="inline" />
                  </a>
                </div>
              </div>
              {/* <div className="h-12 w-full rounded-xl ">
                <audio src="" controls className="w-3/5"></audio>
              </div> */}
              {/* Tags */}
              <div className="flex flex-wrap gap-3 mt-4">
                <div className="rounded-lg px-3 py-1 backdrop-blur-lg border border-gray-800 w-fit">
                  <h1 className="text-sm md:text-md font-medium">
                    Web Development
                  </h1>
                </div>
                <div className="rounded-lg px-3 py-1 backdrop-blur-lg border border-gray-800 w-fit">
                  <h1 className="text-sm md:text-md font-medium">CMS</h1>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="w-full backdrop-blur-xl border border-gray-900 bg-white/5 rounded-3xl flex flex-col md:flex-row justify-between items-center px-4 py-5 space-y-4 md:space-y-0 md:space-x-4">
            {/* Image Section */}
            <div
              className="rounded-3xl w-full md:w-2/5 h-48 md:h-[55vh] border border-gray-900 bg-cover bg-center"
              style={{ backgroundImage: `url(${LotFerox})` }}
            ></div>

            {/* Content Section */}
            <div className="relative w-full md:w-3/5 border border-gray-900 bg-white/5 rounded-3xl p-5 flex flex-col justify-between h-auto md:h-[55vh]">
              <div className="space-y-4">
                <div className="rounded-lg px-3 py-1 bg-[#3B82F6] backdrop-blur-lg border border-blue-500/20 w-fit">
                  <h1 className="text-sm md:text-md font-medium">2026</h1>
                </div>

                <h1 className="text-2xl md:text-4xl font-semibold">
                  LotFerox Nuts
                </h1>

                <p className="text-sm md:text-md xl:text-lg text-white/70">
                  Designed and developed a premium, visually immersive website for LotFerox Nuts, showcasing its range of flavoured makhana and fox nut products. Built an engaging storytelling experience that takes visitors through the brand's product flavours, health benefits, sourcing, and production process, combining rich product imagery, elegant typography, interactive elements, and a distinctive black-and-gold aesthetic to create a memorable brand experience.                </p>

                <div>
                  <a
                    href="https://lotferoxnuts.com/"
                    className="w-fit px-3 py-1 bg-white text-black rounded-lg font-medium hover:bg-gray-200 transition-all duration-300 flex items-center gap-1"
                  >
                    Visit Site <ArrowUpRight className="inline" />
                  </a>
                </div>
              </div>
              {/* <div className="h-12 w-full rounded-xl ">
                <audio src="" controls className="w-3/5"></audio>
              </div> */}
              {/* Tags */}
              <div className="flex flex-wrap gap-3 mt-4">
                <div className="rounded-lg px-3 py-1 backdrop-blur-lg border border-gray-800 w-fit">
                  <h1 className="text-sm md:text-md font-medium">
                    Web Development
                  </h1>
                </div>
                <div className="rounded-lg px-3 py-1 backdrop-blur-lg border border-gray-800 w-fit">
                  <h1 className="text-sm md:text-md font-medium">CMS</h1>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="w-full backdrop-blur-xl border border-gray-900 bg-white/5 rounded-3xl flex flex-col md:flex-row justify-between items-center px-4 py-5 space-y-4 md:space-y-0 md:space-x-4">
            {/* Image Section */}
            <div
              className="rounded-3xl w-full md:w-2/5 h-48 md:h-[55vh] border border-gray-900 bg-cover bg-center"
              style={{ backgroundImage: `url(${TwentyOneGram})` }}
            ></div>

            {/* Content Section */}
            <div className="relative w-full md:w-3/5 border border-gray-900 bg-white/5 rounded-3xl p-5 flex flex-col justify-between h-auto md:h-[55vh]">
              <div className="space-y-4">
                <div className="rounded-lg px-3 py-1 bg-[#3B82F6] backdrop-blur-lg border border-blue-500/20 w-fit">
                  <h1 className="text-sm md:text-md font-medium">2026</h1>
                </div>

                <h1 className="text-2xl md:text-4xl font-semibold">
                  21 Gram Films
                </h1>

                <p className="text-sm md:text-md xl:text-lg text-white/70">
                  Designed and developed a visually immersive, interactive landing page that showcases 21 Gram Films' short-form video production, reel shoots, and marketing services. Featuring bold visual storytelling, engaging media, and a premium dark aesthetic with vibrant green accents, the website highlights the agency's creative portfolio while making its services easy to explore and its contact journey seamless.
                </p>

                <div>
                  <a
                    href="https://21gramfilms.com/"
                    className="w-fit px-3 py-1 bg-white text-black rounded-lg font-medium hover:bg-gray-200 transition-all duration-300 flex items-center gap-1"
                  >
                    Visit Site <ArrowUpRight className="inline" />
                  </a>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-3 mt-4">
                <div className="rounded-lg px-3 py-1 backdrop-blur-lg border border-gray-800 w-fit">
                  <h1 className="text-sm md:text-md font-medium">
                    Landing Page
                  </h1>
                </div>
                <div className="rounded-lg px-3 py-1 backdrop-blur-lg border border-gray-800 w-fit">
                  <h1 className="text-sm md:text-md font-medium">CMS</h1>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="w-full backdrop-blur-xl border border-gray-900 bg-white/5 rounded-3xl flex flex-col md:flex-row justify-between items-center px-2 py-4 md:px-4 md:py-5 space-y-4 md:space-y-0 md:space-x-4">
            {/* Image Section */}
            <div
              className="rounded-3xl w-full md:w-2/5 h-48 md:h-[55vh] border border-gray-900 bg-cover bg-center"
              style={{ backgroundImage: `url(${SilverStream})` }}
            ></div>

            {/* Content Section */}
            <div className="relative w-full md:w-3/5 border border-gray-900 bg-white/5 rounded-3xl p-4 md:p-5 flex flex-col justify-between h-auto md:h-[55vh]">
              <div className="space-y-4">
                <div className="rounded-lg px-3 py-1 bg-[#3B82F6] backdrop-blur-lg border border-blue-500/20 w-fit">
                  <h1 className="text-sm md:text-md font-medium">2025</h1>
                </div>

                <h1 className="text-2xl md:text-4xl font-semibold">
                  Silver Stream Plumbing
                </h1>

                <p className="text-sm md:text-md xl:text-lg text-white/70">
                  A custom AI Voice Receptionist for Silver Stream Plumbing
                  answers calls 24/7, handles FAQs, manages bookings, and
                  forwards inquiries instantly to the owner. It also detects
                  emergencies, logs key details, and connects callers to staff
                  immediately. With no missed calls and every lead captured, the
                  company saved labor costs and saw a clear increase in revenue
                  and ROI.
                </p>
              </div>
              <div className="h-12 w-full my-5 md:my-0 rounded-xl ">
                <AudioPlayer audioSrc={SSPA} />
              </div>
              {/* Tags */}
              <div className="flex flex-wrap gap-3 mt-4">
                <div className="rounded-lg px-3 py-1 backdrop-blur-lg border border-gray-800 w-fit">
                  <h1 className="text-sm md:text-md font-medium">
                    AI Voice Receptionist
                  </h1>
                </div>
                <div className="rounded-lg px-3 py-1 backdrop-blur-lg border border-gray-800 w-fit">
                  <h1 className="text-sm md:text-md font-medium">
                    AI Automation
                  </h1>
                </div>
              </div>
            </div>
          </div>



        </div>
      </div>
    </section>
  );
};

export default Work;

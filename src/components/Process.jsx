import React from "react";
import BlurText from "./BlurText";
import Chatgpt from "../assets/chatgpt.png";
import HubSpotIcon from "../assets/hubspot.png";
import Airtable from "../assets/airtable.png";
import Sheets from "../assets/sheets.png";
import {
  BarChart,
  BarChart2Icon,
  ChartArea,
  ChartLine,
  PieChartIcon,
  TrendingUp,
} from "lucide-react";
// Icon components (using simple SVG representations)
const ListIcon = () => (
  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
    <path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z" />
  </svg>
);

const MailIcon = () => (
  <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z" />
  </svg>
);

const FileIcon = () => (
  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-8-6z" />
  </svg>
);

const TodoListIcon = () => (
  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
    <rect
      x="3"
      y="3"
      width="18"
      height="18"
      rx="2"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
    <line
      x1="7"
      y1="8"
      x2="17"
      y2="8"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="7"
      y1="12"
      x2="17"
      y2="12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="7"
      y1="16"
      x2="17"
      y2="16"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const BooksIcon = () => (
  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
    <path d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z" />
  </svg>
);

const ShareIcon = () => (
  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.15c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
  </svg>
);

export default function Process() {
  return (
    <div className="p-8">
      <div className="rounded-lg px-4 py-1 bg-white/8 backdrop-blur-lg border border-blue-500/20 w-fit flex items-center justify-center mx-auto md:mt-10">
        <h1 className="text-md text-white text-center font-medium">
          Our Process
        </h1>
      </div>
      <div>
        <BlurText
          text="How We Build Your Custom AI System"
          delay={50}
          animateBy="words"
          direction="top"
          className="text-center text-2xl md:text-5xl text-white px-5 md:w-4/5 leading-tight pt-5 mx-auto mt-5"
        />
        <BlurText
          text="That Actually Works."
          delay={50}
          animateBy="words"
          direction="top"
          className="text-center text-2xl md:text-5xl text-white/70 px-5 md:w-4/5 leading-tight pb-5 mx-auto "
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto mt-10">
        {/* Card 1 */}
        <div className="relative w-full max-w-sm z-10">
          <div className="relative bg-gradient-to-b border-neutral-800 bg-neutral-900 rounded-3xl p-8 min-h-[650px] overflow-hidden border">
            {/* Orange gradient with higher z-index */}
            <div className="absolute -bottom-40 -left-35 w-[400px] h-[400px] rounded-full blur-3xl opacity-30 bg-gradient-to-r from-blue-500 to-blue-600 z-30" />

            <div className="relative z-10 h-42">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-slate-900">1</span>
              </div>
              <h3 className="text-[22px] font-semibold text-white mb-2">
                Share Your Workflow
              </h3>
              <p className="text-gray-400 text-lg leading-relaxed mb-12">
                From lead gen to client onboarding, just share your workflow and
                the tools you use.
              </p>
              {/* Icons container with lower z-index */}
              <div className="relative w-full h-full z-20">
                <div className="absolute right-5 -rotate-12 w-30 h-30 rounded-full bg-gradient-to-tr from-neutral-900 to-gray-700 flex items-center justify-center shadow-lg border-t-3 border-gray-500 animate-pulse-scale">
                  <MailIcon />
                </div>
                <div className="absolute left-5 top-10 -rotate-12 w-26 h-26 rounded-full bg-gradient-to-br from-neutral-900 to-gray-700 flex items-center justify-center shadow-lg border-t-3 border-gray-500 animate-pulse-scale-delayed-1">
                  <ListIcon />
                </div>
                <div className="absolute left-0 -bottom-25 rotate-12 w-20 h-20 rounded-full bg-gradient-to-br from-neutral-900 to-gray-700 flex items-center justify-center shadow-lg border-t-3 border-gray-500 animate-pulse-scale-delayed-2">
                  <CalendarIcon />
                </div>
                <div className="absolute right-4 -bottom-20 -rotate-12 w-20 h-20 rounded-full bg-gradient-to-br from-neutral-900 to-gray-700 flex items-center justify-center shadow-lg border-t-3 border-gray-500 animate-pulse-scale-delayed-3">
                  <FileIcon />
                </div>
                <div className="absolute right-30 -bottom-40 -rotate-12 w-20 h-20 rounded-full bg-gradient-to-br from-neutral-900 to-gray-700 flex items-center justify-center shadow-lg border-t-3 border-gray-500 animate-pulse-scale-delayed-4">
                  <TodoListIcon />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="relative w-full max-w-sm z-10">
          <div className="relative bg-gradient-to-b border-neutral-800 bg-neutral-900 rounded-3xl p-8 min-h-[650px] h-[650px]  overflow-hidden border">
            <div className="absolute -bottom-40 -left-35 w-[400px] h-[400px] rounded-full blur-3xl opacity-30 bg-gradient-to-r from-blue-500 to-blue-600 z-30" />
            <div className="relative z-10">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-slate-900">2</span>
              </div>
              <h3 className="text-[22px] font-semibold text-white mb-2">
                We Build the System
              </h3>
              <p className="text-gray-400 text-lg leading-relaxed mb-12">
                We design and set up custom automations that connect your tools
                with AI—so work happens while you sleep.
              </p>

              <div className="relative overflow-hidden z-10">
                {/* Top fade overlay */}
                <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-neutral-900 to-transparent z-10 pointer-events-none" />

                {/* Bottom fade overlay */}
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-neutral-900 to-transparent z-10 pointer-events-none" />

                <div className="flex-col gap-6 animate-loop-y z-20">
                  {/* First set of items */}
                  <div className="w-26 h-26 rounded-full bg-gradient-to-br from-neutral-900 to-gray-700 flex items-center justify-center shadow-lg border-t-3 border-gray-500 ">
                    <img src={Chatgpt} className="w-16" alt="" />
                  </div>
                  <div className="w-26 h-26 rounded-full bg-gradient-to-br from-neutral-900 to-gray-700 flex items-center justify-center shadow-lg border-t-3 border-gray-500 ">
                    <img src={HubSpotIcon} className="w-16" alt="" />
                  </div>
                  <div className="w-26 h-26 rounded-full bg-gradient-to-br from-neutral-900 to-gray-700 flex items-center justify-center shadow-lg border-t-3 border-gray-500 ">
                    <img src={Airtable} className="w-16" alt="" />
                  </div>
                  <div className="w-26 h-26 rounded-full bg-gradient-to-br from-neutral-900 to-gray-700 flex items-center justify-center shadow-lg border-t-3 border-gray-500 ">
                    <img src={Sheets} className="w-16" alt="" />
                  </div>

                  {/* Duplicate set for seamless loop */}
                  <div className="w-26 h-26 rounded-full bg-gradient-to-br from-neutral-900 to-gray-700 flex items-center justify-center shadow-lg border-t-3 border-gray-500 ">
                    <img src={Chatgpt} className="w-16" alt="" />
                  </div>
                  <div className="w-26 h-26 rounded-full bg-gradient-to-br from-neutral-900 to-gray-700 flex items-center justify-center shadow-lg border-t-3 border-gray-500 ">
                    <img src={HubSpotIcon} className="w-16" alt="" />
                  </div>
                  <div className="w-26 h-26 rounded-full bg-gradient-to-br from-neutral-900 to-gray-700 flex items-center justify-center shadow-lg border-t-3 border-gray-500 ">
                    <img src={Airtable} className="w-16" alt="" />
                  </div>
                  <div className="w-26 h-26 rounded-full bg-gradient-to-br from-neutral-900 to-gray-700 flex items-center justify-center shadow-lg border-t-3 border-gray-500 ">
                    <img src={Sheets} className="w-16" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="relative w-full max-w-sm">
          <div className="relative bg-gradient-to-b border-neutral-800 bg-neutral-900 rounded-3xl p-8 min-h-[650px] h-[650px] overflow-hidden border">
            <div className="absolute -bottom-40 -left-35 w-[400px] h-[400px] rounded-full blur-3xl opacity-30 bg-gradient-to-r from-blue-500 to-blue-600 z-30" />
            <div className="relative z-10">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-slate-900">3</span>
              </div>
              <h3 className="text-[22px] font-semibold text-white mb-2">
                Launch and Take Control
              </h3>
              <p className="text-gray-400 text-lg leading-relaxed mb-12">
                You get a plug-and-play dashboard with a walkthrough to manage
                everything easily.
              </p>

              <div className="mt-25">
                <div className="bg-black w-[400px] h-[250px] rounded-xl p-3 animate-pulse">
                  <div className="flex space-x-1.5 items-center">
                    <div className="bg-red-600 w-[12px] h-[12px] rounded-full"></div>
                    <div className="bg-yellow-600 w-[12px] h-[12px] rounded-full"></div>

                    <div className="bg-green-600 w-[12px] h-[12px] rounded-full"></div>
                  </div>

                  <div className="flex justify-between gap-4 pt-5">
                    <div className="w-1/4 h-[50px] rounded-xl bg-gray-800"></div>
                    <div className="w-1/4 h-[50px] rounded-xl bg-gray-800"></div>
                    <div className="w-1/4 h-[50px] rounded-xl bg-gray-800"></div>
                    <div className="w-1/4 h-[50px] rounded-xl bg-gray-800"></div>
                  </div>

                  <div className="flex h-full pt-3">
                    <div className="w-3/5 h-3/5 bg-gray-800 rounded-xl flex justify-center items-center">
                      {/* <TrendingUp className="text-gray-500" size={100} /> */}
                      <ChartLine className="text-gray-500" size={100} />
                      {/* <BarChart />
                      <BarChart2Icon /> */}
                    </div>
                    <div className="flex-col w-2/5 h-3/5">
                      <div className="h-full bg-gray-800 rounded-xl mb-2 ml-3 flex justify-center items-center">
                        <PieChartIcon className="text-gray-500" size={70} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

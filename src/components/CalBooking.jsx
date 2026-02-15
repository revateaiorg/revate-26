import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import BlurText from "./BlurText";
export default function CalBooking() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({
        namespace:
          "free-strategy-call-boost-your-business-with-ai-and-web-solutions",
      });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);
  return (
    <section>
      <div className="h-full text-white mt-16 w-full">
        {/* <div className="rounded-lg px-4 py-1 bg-white/8 backdrop-blur-lg border border-orange-400/20 w-fit flex items-center justify-center mx-auto mt-10">
          <h1 className="text-md text-center font-medium">Book Your Slot</h1>
        </div> */}
        <div>
          <BlurText
            text="Take the First Step Toward Higher Revenue"
            delay={50}
            animateBy="words"
            direction="top"
            className="text-center text-2xl md:text-5xl text-white px-5 md:w-4/5 leading-tight pt-5 mx-auto mt-5"
          />
          <BlurText
            text="Let’s Get on a Call."
            delay={50}
            animateBy="words"
            direction="top"
            className="text-center text-2xl md:text-5xl text-white/70 px-5 md:w-4/5 leading-tight pb-5 mx-auto "
          />
        </div>
      </div>
      {/* <Cal
        namespace="free-strategy-call-boost-your-business-with-ai-and-web-solutions"
        calLink="nexglimpse-c5eica/free-strategy-call-boost-your-business-with-ai-and-web-solutions"
        style={{ width: "100%", height: "100%", overflow: "scroll" }}
        config={{ layout: "month_view" }}
      /> */}
      <Cal namespace="free-strategy-call"
        calLink="pradeep-srinivasan/free-strategy-call"
        style={{ width: "100%", height: "100%", overflow: "scroll" }}
        config={{ "layout": "month_view", "useSlotsViewOnSmallScreen": "true" }}


      />
    </section>
  );
}

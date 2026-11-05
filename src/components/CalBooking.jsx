import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import SectionHeading from "./SectionHeading";
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
    <section id="booking">
      <div className="h-full text-white mt-16 w-full">
        <SectionHeading dark align="center" label="Let’s get started" title="A smarter business" accent="starts with a conversation." description="Book a free strategy call to discuss your workflow, goals, and the right next step." />
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

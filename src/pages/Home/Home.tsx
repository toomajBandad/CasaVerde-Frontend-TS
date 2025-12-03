import { useEffect, useState } from "react";
import SwiperReact from "../../components/SwiperReact/SwiperReact";
import Capabilities from "../../components/Capabilities/Capabilities";
import CardConceptCompo from "../../components/CardConceptCompo/CardConceptCompo";
import BlogBloque from "../../components/BlogBloque/BlogBloque";
import NewsBar from "../../components/NewsBar/NewsBar";
import TopMain from "../../components/TopMain/TopMain";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  return (
    <>
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-gray-200 h-40 rounded-lg"
            ></div>
          ))}
        </div>
      ) : (
        <div className="bg-white">
          {/* TopMain Section */}
          <div
            className="flex justify-center items-center w-full bg-cover bg-center 
                       bg-[url('/images/backgrounds/2.png')] 
                       h-[60vh] md:h-[90vh]"
          >
            <div className="bg-black/50 flex flex-col justify-center items-center gap-8 md:gap-4 p-4 md:p-16">
              <h1
                className="text-[2.8rem] md:text-[4rem] ] 
                           font-[aladin] text-center text-Pine
                           [text-shadow:1px_1px_1px_var(--Light-Jade)] 
                           relative transition-all animate-[opacityAnime_2s_ease]"
              >
                Find your property wherever you like !
              </h1>
              <TopMain />
            </div>
          </div>

          {/* Other Sections */}
          <SwiperReact />
          <Capabilities />
          <CardConceptCompo />
          <BlogBloque />
          <NewsBar />
        </div>
      )}
    </>
  );
}

import SwiperReact from "../../components/SwiperReact/SwiperReact";
import Capabilities from "../../components/Capabilities/Capabilities";
import CardConceptCompo from "../../components/CardConceptCompo/CardConceptCompo";
import BlogBloque from "../../components/BlogBloque/BlogBloque";
import NewsBar from "../../components/NewsBar/NewsBar";
import HeroComp from "../../components/HeroComp/HeroComp";

export default function Home() {
  return (
    <div className="bg-white">
      <HeroComp />
      <SwiperReact />
      <Capabilities />
      <CardConceptCompo />
      <BlogBloque />
      <NewsBar />
    </div>
  );
}

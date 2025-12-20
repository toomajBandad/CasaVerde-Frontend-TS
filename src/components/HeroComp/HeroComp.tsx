import TopMain from "../TopMain/TopMain";

export default function HeroComp() {
  return (
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
  );
}

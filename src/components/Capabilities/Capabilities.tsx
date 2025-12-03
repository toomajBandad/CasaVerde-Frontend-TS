import { GiShadowFollower } from "react-icons/gi";
import { HiMiniUserGroup } from "react-icons/hi2";
import { FaProjectDiagram, FaUserFriends } from "react-icons/fa";
import CountUp from "react-countup";

export default function Capabilities() {
  return (
    <div className="flex w-full justify-center items-center mt-10">
      <div className="m-0 flex flex-col justify-center items-center w-full h-[90vh] bg-[url('/images/backgrounds/top11.png')] bg-fixed bg-cover gap-24">
        {/* Title */}
        <div className="font-[Aladin] text-5xl md:text-6xl text-Lemon">
          Our Capabilities
        </div>

        {/* Items Wrapper */}
        <div className="flex flex-col md:flex-row justify-center items-center bg-black/70 p-8 md:p-16 gap-12 md:gap-28">
          {/* First Row */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-28">
            <div className="flex flex-col justify-center items-center gap-2 md:gap-5">
              <div className="text-5xl text-white">
                <FaProjectDiagram />
              </div>
              <div className="text-Lemon font-[Aladin] text-2xl font-semibold">
                <CountUp end={1203} duration={5} enableScrollSpy />
              </div>
              <div className="text-white font-bold text-xl">Total Projects</div>
            </div>

            <div className="flex flex-col justify-center items-center gap-2 md:gap-5">
              <div className="text-5xl text-white">
                <HiMiniUserGroup />
              </div>
              <div className="text-Lemon font-[Aladin] text-2xl font-semibold">
                <CountUp end={742} duration={5} enableScrollSpy />
              </div>
              <div className="text-white font-bold text-xl">Customers</div>
            </div>
          </div>

          {/* Second Row */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-28">
            <div className="flex flex-col justify-center items-center gap-2 md:gap-5">
              <div className="text-5xl text-white">
                <GiShadowFollower />
              </div>
              <div className="text-Lemon font-[Aladin] text-2xl font-semibold">
                <CountUp end={3890} duration={5} enableScrollSpy />
              </div>
              <div className="text-white font-bold text-xl">Followers</div>
            </div>

            <div className="flex flex-col justify-center items-center gap-2 md:gap-5">
              <div className="text-5xl text-white">
                <FaUserFriends />
              </div>
              <div className="text-Lemon font-[Aladin] text-2xl font-semibold">
                <CountUp end={2100} duration={5} enableScrollSpy />
              </div>
              <div className="text-white font-bold text-xl">Members</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { FaLinkedin, FaYoutube, FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useNavigate } from "react-router";
import { IoLocationSharp } from "react-icons/io5";
import { MdOutlineLocalPhone, MdOutlineFax } from "react-icons/md";
import { IoMailOpenOutline } from "react-icons/io5";

export default function FooterItem() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center w-full border-t-4 border-white px-12 pt-16 pb-8 text-white bg-linear-to-b from-Pine to-[#1f8f85]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 w-full">
        {/* Logo + Social */}
        <div className="flex flex-col justify-center items-start gap-4">
          <div
            className="font-[Fascinate] text-[1.9rem] cursor-pointer hover:text-Lemon hover:underline"
            onClick={() => navigate("/")}
          >
            CASA VERDE
          </div>
          <div className="flex justify-center items-center gap-4 text-2xl mt-4 cursor-pointer">
            <FaLinkedin className="hover:text-Lemon transition" />
            <FaInstagram className="hover:text-Lemon transition" />
            <FaXTwitter className="hover:text-Lemon transition" />
            <FaFacebook className="hover:text-Lemon transition" />
            <FaYoutube className="hover:text-Lemon transition" />
          </div>
        </div>

        {/* Important Links */}
        <div className="flex flex-col gap-4">
          <h4 className="font-[Aladin] font-semibold text-2xl">
            Important Links:
          </h4>
          <ul className="flex flex-col gap-2">
            <li
              className="flex items-start gap-2 font-normal cursor-pointer hover:text-Lemon hover:underline hover:pl-1 transition"
              onClick={() => navigate("/")}
            >
              HOME
            </li>
            <li
              className="flex items-start gap-2 font-normal cursor-pointer hover:text-Lemon hover:underline hover:pl-1 transition"
              onClick={() => navigate("/about")}
            >
              About Us
            </li>
            <li
              className="flex items-start gap-2 font-normal cursor-pointer hover:text-Lemon hover:underline hover:pl-1 transition"
              onClick={() => navigate("/news")}
            >
              News
            </li>
          </ul>
        </div>

        {/* Our Info */}
        <div className="flex flex-col gap-4">
          <h4 className="font-[Aladin] font-semibold text-2xl">Our info:</h4>
          <ul className="flex flex-col gap-2">
            <li className="flex items-center gap-2 font-normal">
              <IoLocationSharp className="text-lg" />
              Plaza Mayor, 21
            </li>
            <li className="flex items-center gap-2 font-normal">
              <MdOutlineLocalPhone className="text-lg" />
              +34 123 456 789
            </li>
            <li className="flex items-center gap-2 font-normal">
              <MdOutlineFax className="text-lg" />
              +34 987 654 321
            </li>
            <li className="flex items-center gap-2 font-normal">
              <IoMailOpenOutline className="text-lg" />
              in@casa.v.com
            </li>
          </ul>
        </div>

        {/* Help */}
        <div className="flex flex-col gap-4">
          <h4 className="font-[Aladin] font-semibold text-2xl">Help:</h4>
          <ul className="flex flex-col gap-2">
            <li className="flex items-start gap-2 font-normal cursor-pointer hover:text-Lemon hover:underline hover:pl-1 transition">
              Frequently questions
            </li>
            <li className="flex items-start gap-2 font-normal cursor-pointer hover:text-Lemon hover:underline hover:pl-1 transition">
              Your account
            </li>
            <li className="flex items-start gap-2 font-normal cursor-pointer hover:text-Lemon hover:underline hover:pl-1 transition">
              Privacy
            </li>
            <li className="flex items-start gap-2 font-normal cursor-pointer hover:text-Lemon hover:underline hover:pl-1 transition">
              Cookies policy
            </li>
          </ul>
        </div>
      </div>

      {/* Signature */}
      <div className="w-full border-t border-white text-center mt-8 pt-6">
        © 2025 Toomaj Bandad all rights reserved
      </div>
    </div>
  );
}

import React from "react";
import homelogo from "../assests/Mansions.svg";
import penthouselogo from "../assests/Penthouse.svg";
import magazinelogo from "../assests/Magazine.svg";
import newletterlogo from "../assests/Newsletters.svg";
import collectible from "../assests/Collectible.svg";
import trafic from "../assests/Traffic.svg";
import logout from "../assests/Log Out.svg";
import leadslogo from "../assests/Leads White.svg";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ setViewType }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full sm:w-[280px] bg-green-900 text-white  items-center justify-center flex flex-col p-4 sm:relative z-10">
      <h2 className="text-xl mb-16">wellcome @username</h2>
      <ul className="space-y-8 font-inter mb-8 ">
        <li
          onClick={() => setViewType("leads")}
          className="hover:bg-green-700 p-2 w-[200px]  mb-4 border  cursor-pointer flex items-center gap-4"
        >
          <img src={leadslogo} alt="" className="w-6 h-6 " /> Leads
        </li>
        <li
          onClick={() => {
            setViewType("");
            navigate("/homeform");
          }}
          className="hover:bg-green-700 p-2 border mb-4 w-[200px] cursor-pointer flex items-center gap-4"
        >
          <img src={homelogo} alt="" className="w-6" /> Featured
        </li>
        <li
          onClick={() => setViewType("mansions")}
          className="hover:bg-green-700 p-2  flex border mb-4 gap-4  w-[200px] cursor-pointer items-center"
        >
          {" "}
          <img src={homelogo} alt="" className="w-6" />
          Mansion Listings
        </li>
        <li
          onClick={() => setViewType("penthouses")}
          className="hover:bg-green-700 p-2 border cursor-pointer mb-4 flex w-[200px] gap-4 items-center"
        >
          <img src={penthouselogo} alt="" className="w-4" />
          Penthouse Listings
        </li>
        <li
          onClick={() => setViewType("luxurycollectibles")}
          className="hover:bg-green-700 p-2 border cursor-pointer w-[200px] flex mb-4 gap-4 items-center"
        >
          <img src={collectible} alt="" className="w-4" />
          Luxury Collectibles
        </li>
        <li
          onClick={() => setViewType("property")}
          className="hover:bg-green-700 p-2 border cursor-pointer flex mb-4 w-[200px] gap-4 items-center"
        >
          <img src={newletterlogo} alt="" className="w-4" />
          Newsletter Signup
        </li>
        <li
          onClick={() => setViewType("magazine")}
          className="hover:bg-green-700 p-2 flex border gap-4 mb-4 w-[200px] items-center"
        >
          <img src={magazinelogo} alt="" className="w-4" />
          Magazine Post
        </li>
        <li className="hover:bg-green-700 p-2 w-[200px] flex gap-4  border mb-4 items-center">
          <img src={trafic} alt="" className="w-4" />
          Traffic Analytics
        </li>
      </ul>
      <li className="mt-24 p-2 bg-red-800 flex w-[200px] flex gap-4 items-center ">
        <img src={logout} alt="Logout" className="w-4" />
        Logout
      </li>
    </div>
  );
};

export default Sidebar;

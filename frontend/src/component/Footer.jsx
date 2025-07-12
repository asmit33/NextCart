import React from "react";
import logo from "../assets/logo.png";

function Footer() {
  return (
    <div className="w-full mb-[90px] md:mb-0">
      <div className="w-full md:h-[30vh] h-auto bg-[#dbfcfcec] flex flex-wrap items-center justify-center md:px-[50px] px-4 py-6 gap-6">
        {/* Left: Logo & Description */}
        <div className="w-full md:w-[30%] flex flex-col items-center justify-start gap-2">
          <div className="flex items-center gap-2 mt-2 md:mt-6">
            <img src={logo} alt="logo" className="md:w-10 md:h-10 w-8 h-8" />
            <p className="text-[19px] sm:text-[14px] text-black">NextCart</p>
          </div>
          <p className="text-[12px] sm:text-[10px] text-[#1e2223] hidden md:block">
            NextCart is your all-in-one online shopping destination, offering
            top-quality products, unbeatable deals, and fast delivery—all backed
            by trusted service designed to make your life easier every day.
          </p>
          <p className="text-[12px] sm:text-[10px] text-[#1e2223] block md:hidden">
            Fast. Easy. Reliable. NextCart Shopping
          </p>
        </div>

        {/* Center: Company Links */}
        <div className="w-full md:w-[25%] flex flex-col items-center text-center">
          <p className="text-[19px] sm:text-[14px] text-[#1e2223] font-sans mt-2 md:mt-6">
            COMPANY
          </p>
          <ul className="space-y-1 mt-1">
            <li className="text-[12px] sm:text-[10px] text-[#1e2223] hidden md:block cursor-pointer">
              Home
            </li>
            <li className="text-[12px] sm:text-[10px] text-[#1e2223] cursor-pointer">
              About us
            </li>
            <li className="text-[12px] sm:text-[10px] text-[#1e2223] hidden md:block cursor-pointer">
              Delivery
            </li>
            <li className="text-[12px] sm:text-[10px] text-[#1e2223] cursor-pointer">
              Privacy Policy
            </li>
          </ul>
        </div>

        {/* Right: Contact Info */}
        <div className="w-full md:w-[25%] flex flex-col items-center text-center">
          <p className="text-[19px] sm:text-[14px] text-[#1e2223] font-sans mt-2 md:mt-6">
            GET IN TOUCH
          </p>
          <ul className="space-y-1 mt-1">
            <li className="text-[12px] sm:text-[10px] text-[#1e2223]">
              +91-9876510XXX
            </li>
            <li className="text-[12px] sm:text-[10px] text-[#1e2223]">
              contact@NextCart.com
            </li>
            <li className="text-[12px] sm:text-[10px] text-[#1e2223] hidden md:block">
              +1-123-456-7890
            </li>
            <li className="text-[12px] sm:text-[10px] text-[#1e2223] hidden md:block">
              admin@NextCart.com
            </li>
          </ul>
        </div>
      </div>

      <div className="w-full h-[1px] bg-slate-400"></div>

      <div className="w-full h-auto py-2 bg-[#dbfcfcec] flex items-center justify-center text-[12px] sm:text-[10px] text-[#1e2223] text-center">
        © 2025 NextCart.com — All Rights Reserved
      </div>
    </div>
  );
}

export default Footer;

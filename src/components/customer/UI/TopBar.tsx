"use client";

import {
  ChevronDown,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function Navbar() {
  return (
    <>
    <a href="/">
      <div className="flex w-full space-x-4 h-14 bg-primary-g1 text-white p-4">
        <ChevronDown size={24} className="rotate-90 "/>
        <span>Back</span>
      </div>
    </a>
    </>
  );
}

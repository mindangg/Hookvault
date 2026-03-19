"use client";
import React from "react";
import { Spotlight } from "./ui/spotlight";
import { Splite } from "./ui/splite";

export function HeroScene() {
  return (
    <div className="w-full h-[500px] bg-black relative overflow-hidden rounded-none border-none">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <Splite
        scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
        className="w-full h-full"
      />
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent via-black/50 to-black pointer-events-none z-10" />
    </div>
  );
}

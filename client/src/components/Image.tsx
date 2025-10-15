"use client";
import { useState } from "react";
import NextImage from "next/image";

interface ImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  onClick?: () => void;
  loading?: "lazy" | "eager";
  tooltip?: string;
}

export const Image = (props: ImageProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      className={`relative ${props.className} cursor-pointer`}
      onClick={props.onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && props.tooltip ? (
        <div className="opacity-0 hover:opacity-100 transition absolute mb-1 w-full h-full bg-black/75 backdrop-blur-sm text-white text-xs rounded-md p-2 overflow-y-hidden">
          <span>{props.tooltip}</span>
        </div>
      ) : null}
      <NextImage
        loading={props.loading || "lazy"}
        {...props}
        alt={props.alt}
        src={props.src}
        className={`rounded-md ${isLoading ? "bg-gray-400 animate-pulse" : ""} w-full`}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
};

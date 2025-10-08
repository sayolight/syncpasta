"use client";
import {useState} from "react";
import {motion} from "framer-motion";

interface ImageProps {
    src: string;
    alt: string;
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
            className={`relative cursor-pointer ${props.className}`}
            onClick={props.onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {isHovered && props.tooltip ? (
                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    transition={{duration: 0.05}}
                    className="absolute mb-1 w-full h-full bg-black/75 backdrop-blur-sm text-white text-xs rounded p-2 overflow-y-hidden"
                >
                    <span>{props.tooltip}</span>
                </motion.div>
            ) : null}
            <img
                {...props}
                alt={props.alt}
                src={props.src}
                className={`rounded-md ${isLoading ? "bg-gray-400 animate-pulse" : ""}`}
                onLoad={() => setIsLoading(false)}
            />
        </div>
    );
};

"use client";

import { X } from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
  onClose?: () => void;
}

export const Modal = (props: ModalProps) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && props.isOpen && props.onClose) {
        props.onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [props]);

  return (
    <>
      {props.isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
          className="fixed inset-0 z-1 w-screen h-screen backdrop-blur-md bg-black/75 flex items-center justify-center"
        >
          <div
            className={`fixed inset-0 z-2 cursor-pointer`}
            onClick={props.onClose}
          />
          <div className="bg-neutral-900 z-3 p-4 rounded shadow-lg md:w-1/3 w-full max-w-md">
            <div className="flex items-center justify-between mb-2 text-neutral-400">
              <span className="font-bold text-sm select-none">
                {props.title}
              </span>
              <span
                className="cursor-pointer hover:text-neutral-300"
                onClick={props.onClose}
              >
                <X size={14} />
              </span>
            </div>
            {props.children}
          </div>
        </motion.div>
      )}
    </>
  );
};

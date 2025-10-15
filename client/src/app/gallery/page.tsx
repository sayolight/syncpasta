"use client";
import { Button } from "@/components/Button";
import { Image } from "@/components/Image";
import { Input } from "@/components/Input";
import { Modal } from "@/components/Modal";
import { useState } from "react";

export default function Gallery() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageTags, setSelectedImageTags] =
    useState<string>("test tags");

  return (
    <div>
      <Modal
        title="Edit pasta"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <div className="flex flex-col gap-2">
          <Image
            src={`https://picsum.photos/150?${selectedImage}`}
            width={150}
            height={150}
            alt="A cute kitten"
          ></Image>
          <div className="mt-1"></div>
          <Input
            title="Tags"
            type="textarea"
            className="no-scrollbar"
            value={selectedImageTags}
            onChange={(e) => setSelectedImageTags(e.target.value)}
          ></Input>
          <Button className="w-full">Save</Button>
        </div>
      </Modal>

      <Input title="Search" placeholder="funny cat meme"></Input>
      <div className="mt-3 grid grid-cols-6 gap-4">
        {[...Array(20)].map((_, i) => (
          <Image
            key={i}
            src={`https://picsum.photos/150?${i}`}
            width={150}
            height={150}
            className="w-full"
            alt="A cute kitten"
            tooltip="This is a cute kitten"
            onClick={() => {
              setSelectedImage(`${i}`);
              setIsModalOpen(true);
            }}
          ></Image>
        ))}
      </div>
    </div>
  );
}

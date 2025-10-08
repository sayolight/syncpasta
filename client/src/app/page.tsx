"use client";
import { Block } from "@/components/Block";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Modal } from "@/components/Modal";
import { useState } from "react";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <Block>
        Hello world
        <Button onClick={() => setIsModalOpen(true)} variant="primary">Open Modal</Button>
        <Button variant="primary">Click me</Button>
        <Input placeholder="Type here..." title="Text" />
        <div className="flex flex-row gap-1">
          <Button variant="primary">Primary</Button>
          <Button variant="dangerous">Secondary</Button>
        </div>
      </Block>
      <Modal isOpen={isModalOpen} title="Modal Title" onClose={() => setIsModalOpen(false)}>
        <p>This is the modal content.</p>
        <Button
          variant="primary"
          onClick={() => alert("Button inside modal clicked!")}
        >
          Click Me
        </Button>
      </Modal>
    </>
  );
}

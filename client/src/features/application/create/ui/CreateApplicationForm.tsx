import { Modal } from "@ui/modal";
import { Input } from "@ui/input";
import { Button } from "@ui/button";
import { useCreateApplication } from "@/features/application/create/model/useCreateApplication.ts";
import { Alert } from "@ui/alert";
import * as React from "react";
import { useState } from "react";

interface CreateApplicationFormProps {
  isOpen: boolean;
  setIsOpen: (arg: boolean) => void;
}

export function CreateApplicationForm({
  isOpen,
  setIsOpen,
}: CreateApplicationFormProps) {
  const { createApplication, isLoading, error } = useCreateApplication();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createApplication({
      name,
      description,
    });
    setName("");
    setDescription("");
    setIsOpen(false);
  };

  return (
    <form onSubmit={onSubmit}>
      <Modal
        active={isOpen}
        onClose={() => setIsOpen(false)}
        title={"create application"}
      >
        {error && <Alert title={"⚠ error!"}>{error}</Alert>}
        <Input
          title={"application name"}
          placeholder={"cool app"}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          disabled={isLoading}
        ></Input>
        <Input
          title={"description"}
          placeholder={"i am a cool app"}
          disabled={isLoading}
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        ></Input>
        <Button type={"submit"} variant={"primary"} disabled={isLoading}>
          create
        </Button>
      </Modal>
    </form>
  );
}

import { Button, Input } from "@/shared/ui";

export default function MainPage() {
  return (
    <>
      <Button>secondary button</Button>
      <Button variant={"primary"}>primary button</Button>
      <Button variant={"warning"}>warning button</Button>
      <Input title={"gigga"}></Input>
    </>
  );
}

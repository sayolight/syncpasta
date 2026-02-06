import { Button, Block, Input } from "@/shared/ui";

export default function MainPage() {
  return (
    <>
      <Block direction="column" title={"test block"}>
        <Input placeholder={"test"} title={"tvoe imya"}></Input>
        <Button>secondary button</Button>
        <Button variant={"primary"}>primary button</Button>
        <Button variant={"warning"}>warning button</Button>
      </Block>

      <Block direction="row" title={"test block"}>
        <Input placeholder={"test"} title={"tvoe imya"}></Input>
        <Button>secondary button</Button>
        <Button variant={"primary"}>primary button</Button>
        <Button variant={"warning"}>warning button</Button>
      </Block>
    </>
  );
}

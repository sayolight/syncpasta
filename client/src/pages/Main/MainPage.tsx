import { Button, Block, Input, Typography } from "@/shared/ui";
import { Modal } from "@ui/modal";
import * as React from "react";

export default function MainPage() {
  const [modal, setModal] = React.useState(true);

  return (
    <>
      <Modal
        active={modal}
        onClose={() => setModal(false)}
        title={"test modal"}
      >
        <Input placeholder={"test"} title={"tvoe imya"}></Input>
        <Button variant={"primary"}>submit</Button>
      </Modal>
      <Block direction="column" title={"test block"}>
        <Input placeholder={"test"} title={"tvoe imya"}></Input>
        <Button>secondary button</Button>
        <Button variant={"primary"}>primary button</Button>
        <Button variant={"warning"}>warning button</Button>
        <Typography variant={"normal"} align={"left"} weight={"regular"}>
          hello
        </Typography>
        <Typography variant={"normal"} align={"left"} weight={"medium"}>
          hello
        </Typography>
        <Typography variant={"normal"} align={"left"} weight={"bold"}>
          hello
        </Typography>
        <Typography variant={"muted"} align={"center"} weight={"medium"}>
          hello
        </Typography>
        <Typography variant={"disabled"} align={"right"} weight={"bold"}>
          hello
        </Typography>
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

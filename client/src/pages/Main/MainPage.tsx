import { Button, Block, Typography, Input } from "@/shared/ui";
import { useNavigate } from "react-router";

export default function MainPage() {
  const navigate = useNavigate();

  return (
    <>
      <Block>
        <Typography weight={"bold"}>welcome to syncpasta</Typography>
        <Typography variant={"muted"}>
          a service for synchronizing text and media files between any
          applications.
        </Typography>
        <Button variant={"primary"} onClick={() => navigate("/auth")}>
          get started
        </Button>
      </Block>

      <Block>
        <Typography weight={"bold"}>organize</Typography>
        <Typography variant={"muted"}>
          search for your media simply by using keywords.
        </Typography>
        <Input title={"keywords"} value={"funny cat gif"}></Input>
      </Block>

      <Block>
        <Typography weight={"bold"}>integration</Typography>
        <Typography variant={"muted"}>
          create your own integration with syncpasta or use any ready-made one.
        </Typography>
        <Block direction={"row"} isCard={false}>
          <a href={"/applications"}>
            <Button variant={"secondary"}>applications</Button>
          </a>
          <a href={"/api/docs"}>
            <Button variant={"secondary"}>documentation</Button>
          </a>
        </Block>
      </Block>
    </>
  );
}

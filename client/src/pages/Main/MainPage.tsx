import { Button, Block, Typography, Input } from "@/shared/ui";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

export default function MainPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      <Block>
        <Typography weight={"bold"}>{t("main.welcome.header")}</Typography>
        <Typography variant={"muted"}>
          {t("main.welcome.description")}
        </Typography>
        <Button variant={"primary"} onClick={() => navigate("/auth")}>
          {t("main.welcome.get_started")}
        </Button>
      </Block>

      <Block>
        <Typography weight={"bold"}>{t("main.organize.header")}</Typography>
        <Typography variant={"muted"}>
          {t("main.organize.description")}
        </Typography>
        <Input
          title={t("main.organize.input.title")}
          value={t("main.organize.input.value")}
        ></Input>
      </Block>

      <Block>
        <Typography weight={"bold"}>{t("main.integration.header")}</Typography>
        <Typography variant={"muted"}>
          {t("main.integration.description")}
        </Typography>
        <Block direction={"row"} isCard={false}>
          <a href={"/applications"}>
            <Button variant={"secondary"}>
              {t("main.integration.buttons.applications")}
            </Button>
          </a>
          <a href={"/api/docs"}>
            <Button variant={"secondary"}>
              {t("main.integration.buttons.documentation")}
            </Button>
          </a>
        </Block>
      </Block>
    </>
  );
}

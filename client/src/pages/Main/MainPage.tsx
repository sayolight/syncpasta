import { Button, Block, Typography, Input } from "@/shared/ui";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import styles from "./MainPage.module.scss";
import { clsx } from "clsx";

const INTEGRATIONS = [
  {
    name: "sayolight/syncpasta-telegram",
    url: "https://github.com/sayolight/syncpasta-telegram",
    tools: "🛠 typescript",
  },
  {
    name: "sayolight/syncpasta-extension",
    url: "https://github.com/sayolight/syncpasta-extension",
    tools: "🛠 typescript",
  },
  {
    name: "sayolight/syncpasta-discord",
    url: "https://github.com/sayolight/syncpasta-discord",
    tools: "🛠 typescript",
  },
  {
    name: "create your own!",
    url: "/api/docs",
    tools: "🛠 any language",
  },
];

export default function MainPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      <Block
        direction={"row"}
        className={clsx(styles.main_page_block, styles.welcome_block)}
      >
        <Block className={clsx(styles.text_block)} isCard={false}>
          <Typography weight={"bold"} size={36}>
            {t("main.welcome.header")}
          </Typography>
          <Typography variant={"muted"} size={16}>
            {t("main.welcome.description")}
          </Typography>
          <Button
            size={"large"}
            variant={"primary"}
            className={clsx(styles.get_started)}
            onClick={() => navigate("/auth")}
          >
            {t("main.welcome.get_started")}
          </Button>
        </Block>
        <Block isCard={false}>
          <img
            src={"./box.webp"}
            className={styles.image_box}
            alt={"test"}
            height={256}
            width={325}
          />
        </Block>
      </Block>

      <Block isCard={false} direction={"row"}>
        <Block
          className={clsx(styles.main_page_block, styles.main_parallel_block)}
        >
          <Typography weight={"bold"} size={28}>
            {t("main.organize.header")}
          </Typography>
          <Typography variant={"muted"}>
            {t("main.organize.description")}
          </Typography>
          <Input
            title={t("main.organize.input.title")}
            value={t("main.organize.input.value")}
          ></Input>
        </Block>

        <Block
          className={clsx(styles.main_page_block, styles.main_parallel_block)}
        >
          <Typography weight={"bold"} size={28}>
            {t("main.synchronize.header")}
          </Typography>
          <Typography variant={"muted"}>
            {t("main.synchronize.description")}
          </Typography>
        </Block>
      </Block>

      <Block className={styles.main_page_block}>
        <Typography weight={"bold"} size={28}>
          {t("main.integration.header")}
        </Typography>
        <Typography variant={"muted"}>
          {t("main.integration.description")}
        </Typography>
      </Block>

      <Block direction={"row"} isCard={false}>
        {INTEGRATIONS.map((data, index) => (
          <Block
            key={index}
            className={clsx(styles.main_parallel_block, styles.main_page_block)}
          >
            <Typography weight={"bold"} variant={"accent"}>
              {data.name}
            </Typography>
            <Typography weight={"bold"} variant={"muted"}>
              {data.tools}
            </Typography>
            <a href={data.url} target={"_blank"} rel="noreferrer">
              <Button className={styles.view_button}>view</Button>
            </a>
          </Block>
        ))}
      </Block>
    </>
  );
}

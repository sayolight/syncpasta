import styles from "./Timeline.module.scss";
import * as React from "react";
import { Typography } from "@/shared/ui";

interface TimelineData {
  date: Date;
  action?: string;
  content: React.ReactNode;
}

interface TimelineProps extends React.HTMLProps<HTMLDivElement> {
  timeline: TimelineData[];
}

export function Timeline({ timeline, ...props }: TimelineProps) {
  return (
    <div className={styles.timeline} {...props}>
      {timeline.map((timeline, index) => {
        return (
          <div key={index} className={styles.timeline__item}>
            <Typography
              className={styles.timeline__item__date}
              variant={"muted"}
              weight={"bold"}
            >
              {timeline.date.toLocaleDateString()}{" "}
              {timeline.date.toLocaleTimeString()}
              {" — "}
              {timeline.action}
            </Typography>
            <Typography
              className={styles.timeline__item__content}
              variant={"muted"}
            >
              {timeline.content}
            </Typography>
          </div>
        );
      })}
    </div>
  );
}

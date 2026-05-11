import { Alert } from "@ui/alert";
import { Typography } from "@/shared/ui";
import { useTranslation } from "react-i18next";

interface ErrorAlertProps {
  fieldLocale?: string;
  error: {
    code: string;
    message: string;

    details: { field: string; errors: string[] }[];
  } | null;
}

export function ErrorAlert({ error, fieldLocale }: ErrorAlertProps) {
  const { t } = useTranslation();
  return (
    error && (
      <Alert title={"⚠ " + t(`error.${error.code}`)}>
        {error.details?.map((detail) => (
          <Typography key={detail.field}>
            {t("validation.field")}{" "}
            <b>
              &#34;
              {t(`${fieldLocale}.${detail.field}.title`)}&#34;
            </b>
            {detail.errors.map((e) => (
              <>
                <br />
                <span key={e}>- {t(`validation.${e}`)}</span>
              </>
            ))}
          </Typography>
        ))}
      </Alert>
    )
  );
}

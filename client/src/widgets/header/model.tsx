import { useLocation } from "react-router";

export const useCurrentPath = () => {
  const pathname = useLocation().pathname;
  return pathname?.replace("/", "").split("/")[0];
};

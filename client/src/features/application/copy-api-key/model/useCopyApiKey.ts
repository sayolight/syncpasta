export function useCopyApiKey() {
  const copyApiKey = (key?: string) => {
    if (!key) return;
    navigator.clipboard.writeText(key).then();
  };

  return { copyApiKey };
}

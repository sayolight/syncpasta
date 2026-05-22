import "@tanstack/react-query";

declare module "@tanstack/react-query" {
  interface Register {
    defaultError: {
      code: string;
      message: string;

      details: { field: string; errors: string[] }[];
    };
  }
}

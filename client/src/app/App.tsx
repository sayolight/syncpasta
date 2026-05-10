import { RouterProvider } from "react-router";
import router from "@/app/router.tsx";
import "@/app/i18n";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/shared/api/query.ts";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;

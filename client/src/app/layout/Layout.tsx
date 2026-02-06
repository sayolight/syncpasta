import Header from "@/app/layout/Header.tsx";
import { Outlet } from "react-router";

export function Layout() {
  return (
    <>
      <Header />
      <main className="main">
        <Outlet />
      </main>
    </>
  );
}

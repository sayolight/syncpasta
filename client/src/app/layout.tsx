import { Outlet } from "react-router";
import { Header } from "../widgets/header";

export const Layout = () => {
  return (
    <div className={`flex flex-col items-center min-h-screen`}>
      <div className="lg:w-3xl sm:w-xl w-min">
        <Header />
        <main className="flex flex-col gap-4 sm:items-start mb-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
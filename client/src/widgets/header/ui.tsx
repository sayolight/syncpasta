import { NavLink } from "react-router";
import { useCurrentPath } from "./model";

export const Header = () => {
  const pathname = useCurrentPath();

  return (
    <header className="flex items-center justify-between w-full py-8 text-sm font-semibold text-neutral-300">
      <NavLink className="text-foreground" to="/">
        <span className="">syncpasta</span>
        <span className="text-neutral-500">{` // ${pathname}`}</span>
      </NavLink>
      <nav className="flex gap-4">
        <NavLink className="hover:underline" to="/gallery">
          Gallery
        </NavLink>
        <NavLink className="font-semibold hover:underline" to="/auth">
          Login
        </NavLink>
      </nav>
    </header>
  );
};

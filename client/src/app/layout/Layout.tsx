import Header from "./Header.tsx";
import * as React from "react";

export function Layout({children}: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            <main className="main">{children}</main>
        </>
    )
}
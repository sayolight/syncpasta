"use client";
import { Block } from "@/components/Block";
import { Button } from "@/components/Button";
import { Text } from "@/components/Text";
import { usePathname } from "next/navigation";

interface SidebarItem {
    label: string;
    href: string;
    className?: string;
}

const sidebarItems: SidebarItem[] = [
    { label: "Account", href: "/account" },
    { label: "Security", href: "/account/security" },
    { label: "Integrations", href: "/account/integrations" },
    { label: "Log out", href: "/account/logout", className: "mt-3" },
]

export default function AccountLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname = usePathname();
    return <div className="flex">
        <div className="min-w-2xs">
            <Block>
                {sidebarItems.map((item) => (
                    <Button
                        element="link"
                        key={item.href}
                        href={item.href}
                        className={item.className}
                    >
                        {
                            item.href === pathname
                                ? <Text weight="bold" variant="fg">{item.label}</Text>
                                : <Text weight="semibold" variant="muted">{item.label}</Text>
                        }
                    </Button>
                ))}
            </Block>
        </div>
        <div className="ml-3 w-full">
            <Block>
                {children}
            </Block>
        </div>
    </div>;
}
import { Block } from "@/components/Block";
import { Text } from "@/components/Text";
import Image from "next/image";

const AppInfo = () => {
    return <Block>
        <div className="flex flex-row">
            <Image src="https://picsum.photos/64" alt="Example App" width={64} height={64} />
            <div className="flex flex-col ml-3">
                <Text weight="bold" variant="fg">Example App</Text>
                <Text variant="muted" className="text-sm">Client ID: abc123xyz</Text>
            </div>
        </div>
    </Block>;
}

export default function Integrations() {
    return <>
        <Text>Manage your integrations here.</Text>
        <AppInfo />
    </>
}
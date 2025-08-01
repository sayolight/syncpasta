import {Button} from "../../shared/ui/button.tsx";
import {Block} from "../../shared/ui/block.tsx";
import {Modal} from "../../shared/ui/modal.tsx";
import {useState} from "react";
import {Input} from "../../shared/ui/input.tsx";
import {Image} from "../../shared/ui/image.tsx";

export const MainPage = () => {
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    return (
        <>
            <Block>
                <Button onClick={() => setIsModalVisible(true)}>open modal</Button>
                <Button variant={"link"}>test button</Button>
                <Button variant={"dangerous"}>test button</Button>
                <Button variant={"primary"}>test button</Button>
            </Block>
            <Modal isOpen={isModalVisible} onClose={() => setIsModalVisible(false)} title={"Test modal"}>
                <Input placeholder={"Your email"} type={"email"}></Input>
                <Input placeholder={"password"} type={"password"}></Input>
                <Button variant={"primary"} textAlign={"center"}>cool button</Button>
            </Modal>
            <Block>
                <Image src={"https://http.cat/images/101.jpg"} alt={"cat"} tooltip={"kit"}></Image>
            </Block>
        </>
    );
};

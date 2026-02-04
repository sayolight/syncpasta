import {useLocation} from "react-router";

export default function Header() {
    const location = useLocation();

    return (
        <header className="header">
            <a href={"#"}>
                <span className="header__logo">syncpasta</span>
                <span className="header__pathname"> // {location.pathname}</span>
            </a>
            <div className="header__nav">
                <a href={"#"}>applications</a>
                <a href={"#"}>gallery</a>
                <a href={"#"}>account</a>
            </div>
        </header>
    )
}
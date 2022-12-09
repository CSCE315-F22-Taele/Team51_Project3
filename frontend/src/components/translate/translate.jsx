import { useEffect } from "react";
import "./translate.css";

const Translate = () => {
    const googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
            {
                pageLanguage: "en",
            },
            "google_translate_element"
        );
    };

    useEffect(() => {
        var addScript = document.createElement("script");
        addScript.setAttribute(
            "src",
            "http://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        );
        document.body.appendChild(addScript);
        window.googleTranslateElementInit = googleTranslateElementInit;
    }, []);

    return <div id="google_translate_element"></div>;
};

export default Translate;

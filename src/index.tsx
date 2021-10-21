import { render } from "react-dom";
import { App } from "./App";

const afterLoad = () => {
    const appContainer = document.createElement("section");
    appContainer.setAttribute("class", "application-container");

    document.body.appendChild(appContainer);

    render(<App />, appContainer);
};

window.addEventListener("load", afterLoad);

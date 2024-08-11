import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import "./assets/css/responsive.css";

import Game from "./components/Game";

const root = createRoot(document.getElementById("root"));
root.render(
    <StrictMode>
        <Game />
    </StrictMode>
);

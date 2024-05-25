import { useState } from "react";
import ThemeContext from "./themeContext";

const ThemeState = (props) => {
    const [theme, setTheme] = useState({
        light: true,
        dark: false,
        anotherDark: false,
        darkTeal:false,
        rainbow:false,
    });

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {props.children}
        </ThemeContext.Provider>
    );
};

export default ThemeState;

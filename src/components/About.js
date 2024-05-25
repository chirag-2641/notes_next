import React, { useContext } from 'react'
import themeContext from '../context/themes/themeContext'


const About = () => {


    const contextForThemes = useContext(themeContext);
    const { theme } = contextForThemes;
    console.log("t-lig = "+theme.light)

    let aboutStyle = {
        color: 'black', 
        paddingBottom:'600px'
    }


    if(theme.light) {
        aboutStyle = {
            color: 'black',
            paddingBottom:'600px'
        }
    } else if(theme.dark) {
        aboutStyle = {
            color: 'white',
            paddingBottom:'600px'
        }
    } else if(theme.anotherDark) {
        aboutStyle = {
            color: '#00c548',
            paddingBottom:'600px'
        }
    }

    return (
        <div style={aboutStyle}>
            <h1>This is About page.</h1>
        </div>
    )
}

export default About

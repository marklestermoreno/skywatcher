import React, { useEffect } from 'react'
import misc from '../../lib/misc'

const BrowserOutdated = () => {

    let container = document.getElementById("container")
    let browserStyle = document.getElementById("browser")
    let message = document.getElementById("message")

    useEffect(() => {

        if (container) {
            container.style.display = "flex"
            container.style.marginTop = "flex"
            container.style.marginBottom = "flex"
            container.style.flexDirection = "column"
            container.style.textAlign = 'center'
            container.style.justifyContent = 'center';
            container.style.alignItems = 'center';
            container.style.height = '100vh';
            browserStyle.style.color = "#2c2c2c"
            browserStyle.style.marginTop = "1.25rem"
            browserStyle.style.marginBottom = "1.25rem"
            browserStyle.style.fontSize = "2.25rem"
            browserStyle.style.lineHeight = "2.5rem"
            browserStyle.style.fontWeight = "600"
            message.style.color = "white"

            if (misc.isFirefox) {
                container.style.backgroundColor = "#E66000"
                document.getElementById("browser").style.color = "white"

            }
            else if (misc.isChrome) {
                container.style.backgroundColor = "#DD5144"
                document.getElementById("browser").style.color = "white"
            }
            else if (misc.isSafari) {
                container.style.backgroundColor = "#006CFF"
                document.getElementById("browser").style.color = "white"
            }
            else if (misc.isOpera) {
                container.style.backgroundColor = "#B20317"
                document.getElementById("browser").style.color = "white"
            }
            else if (misc.isYandex) {
                container.style.backgroundColor = "#B20317"
                document.getElementById("browser").style.color = "white"
            }
            else if (misc.isEdge) {
                container.style.backgroundColor = "#3277bc"
                document.getElementById("browser").style.color = "white"
            }
        }

        else {
            window.alert("Oops. It looks like you have an outdated browser")
        }

    }, [container])

    return (

        <div id="container">
            <p id="browser"> {container ? misc.browserName : ""}  {container ? misc.browserVersion : ""} </p>
            <p id="message"> {container ? "Please update your " : ""}
                <b>  {container ? misc.browserName : ""} </b>
                {container ? 'to the current version or' : ""} <br />
                {container ? 'use Opera, Chrome, Edge, Safari, Yandex or Firefox' : ""}  </p>
        </div>

    )
}

export default BrowserOutdated
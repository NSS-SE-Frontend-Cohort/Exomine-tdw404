import { renderBody, renderHeader } from "./RenderAll.js"

const render = () => {
    renderHeader(document.querySelector("#header"))
    renderBody(document.querySelector("#trades"))
}

render()
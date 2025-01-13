import { renderBody, renderHeader } from "./RenderAll.js"

const render = async () => {
    renderHeader(document.querySelector("#header"))
    await renderBody(document.querySelector("#trades"))
}

render()
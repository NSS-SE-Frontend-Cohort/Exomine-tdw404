import { renderBody, renderHeader } from "./RenderAll.js"

const render = async () => {
    await renderBody(document.querySelector("#trades"))
}

document.addEventListener("stateChanged", event => {
    render()
})

renderHeader(document.querySelector("#header"))
render()
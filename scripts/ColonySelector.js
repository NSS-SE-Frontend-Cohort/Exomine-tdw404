import { getAllColonies } from "./ColonyDao.js"
import { getSelectedColony, setColony } from "./TransientState.js"

export const colonyList = async () => {
    document.addEventListener("change", handleColonyChoice)
    const render = []
    render.push(`<label for="colonyList" class = "standard">Welcome, governor.</label>`)
    render.push(`<select class="standard" id="colonyList" name="colonyList">`)
    render.push(`<option value="0">Please select your home colony...</option>`)
    const result = await getAllColonies()
    result.sort(alphaSort).forEach(element => {
        var selected = (parseInt(element.id) == getSelectedColony()) ? `selected="selected"` : ``
        render.push(`<option ${selected} value="${element.id}">${element.locationName} - ${element.displayName}: ${element.colonist.displayName}</option>`)});
    render.push(`</select>`)
    return render.join(`\n`)
}

const alphaSort = (a, b) => {
    var locA = a.locationName.toUpperCase();
    var locB = b.locationName.toUpperCase();
    return (locA < locB) ? -1 : (locA > locB) ? 1 : 0;
}

const handleColonyChoice = (event) => {
    if (event.target.name === "colonyList") {
        setColony(parseInt(event.target.value))
    }
}

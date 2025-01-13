import { getAllColonies, getColony } from "./ColonyDao.js"
import { getAllMinerals } from "./MineralDao.js"
import { getSelectedColony, setColony } from "./TransientState.js"

export const colonyList = async () => {
    document.addEventListener("change", handleColonyChoice)
    const render = []
    render.push(
    `<label for="colonyList" class = "standard">Welcome, governor.</label>
        <select class="standard" id="colonyList" name="colonyList">
        <option value="0">Please select your home colony...</option>`)
    const result = await getAllColonies()
    result.sort(alphaSort).forEach(element => {
        var selected = (parseInt(element.id) == getSelectedColony()) ? `selected="selected"` : ``
        render.push(`<option ${selected} value="${element.id}">${element.locationName} - ${element.displayName}: Gov. ${element.colonist.displayName}</option>`)});
    render.push(
    `</select>
    <hr class="dotted"></hr>
    <div id ="ownMinerals">
        <h3 class="title">Home Colony Supplies</h3>
        <ul class="standard" id="ownMineralList">
        </ul>
    </div>`)
    return render.join(`\n`)
}

const ownedMinerals = async () => {
    const mineralDetails = await getAllMinerals()
    const selectedColony = await getColony(getSelectedColony())
    return selectedColony.mineralMap.map(element => {
        return `<li>${mineralDetails.get(element.mineralId).displayName}: ${element.mineralQuantity} ${mineralDetails.get(element.mineralId).unit}</li>`
    }).join(`\n`)
}

const alphaSort = (a, b) => {
    var locA = a.locationName.toUpperCase();
    var locB = b.locationName.toUpperCase();
    return (locA < locB) ? -1 : (locA > locB) ? 1 : 0;
}

const handleColonyChoice = async (event) => {
    if (event.target.name === "colonyList") {
        setColony(parseInt(event.target.value))
        document.querySelector(`#ownMineralList`).innerHTML = await ownedMinerals()
    }
}

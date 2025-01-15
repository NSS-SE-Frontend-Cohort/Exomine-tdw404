import { getAllColonies, getColony } from "./ColonyDao.js"
import { getAllMinerals } from "./MineralDao.js"
import { getSelectedColony, refreshChoices, setColony } from "./TransientState.js"

export const colonyList = async () => {
    document.addEventListener("change", handleColonyChoice)
    const result = await getAllColonies()
    return result.sort(alphaSort).map(element => {
        var selected = (parseInt(element.id) == getSelectedColony()) ? `selected="selected"` : ``
        return `<option ${selected} value="${element.id}">${element.locationName} - ${element.displayName}: Gov. ${element.colonist.displayName}</option>`}).join(`\n`)
}

export const ownedMinerals = async () => {
    if(getSelectedColony() != 0) {
        const mineralDetails = await getAllMinerals()
        const selectedColony = await getColony(getSelectedColony())
        return selectedColony.mineralMap.map(element => {
        return `<li>${mineralDetails.get(element.mineralId).displayName}: ${element.mineralQuantity} ${mineralDetails.get(element.mineralId).unit}</li>`
    }).join(`\n`)
    } else return (``) 
}

const alphaSort = (a, b) => {
    var locA = a.locationName.toUpperCase();
    var locB = b.locationName.toUpperCase();
    return (locA < locB) ? -1 : (locA > locB) ? 1 : 0;
}

const handleColonyChoice = async (event) => {
    if (event.target.name === "colonyList") {
        setColony(parseInt(event.target.value))
        refreshChoices()
    }
}

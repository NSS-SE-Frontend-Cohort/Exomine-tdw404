import { getAllColonies } from "./ColonyDao.js"
import { getAllMinerals } from "./MineralDao.js"
import { getSelectedColony } from "./TransientState.js"

export const tradePartnerList = async () => {
    if(getSelectedColony() != 0) {
        const mineralDetails = await getAllMinerals()
        const colonyList = await getAllColonies()
        const render = []
        render.push(
        `<label for="tradePartnerList" class = "standard">Select a trading partner.</label>
        <select class="standard" id="tradePartnerList" name="tradePartnerList">
        <option value="0">Please select a trading partner...</option>`)
        const result = await getAllColonies()
        result.sort(alphaSort).forEach(element => {
                var selected = (parseInt(element.id) == getSelectedColony()) ? `selected="selected"` : ``
                render.push(`<option ${selected} value="${element.id}">${element.locationName} - ${element.displayName}: Gov. ${element.colonist.displayName}</option>`)});
        document.querySelector(`#trading_dialogue`).innerHTML = (`Working on it`)
    } else document.querySelector(`#trading_dialogue`).innerHTML = (`Select your home colony before continuing.`)
}

const alphaSort = (a, b) => {
    var locA = a.locationName.toUpperCase();
    var locB = b.locationName.toUpperCase();
    return (locA < locB) ? -1 : (locA > locB) ? 1 : 0;
}
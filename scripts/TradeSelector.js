import { getAllColonies, getColony } from "./ColonyDao.js"
import { getAllMinerals } from "./MineralDao.js"
import { formatPrice } from "./PriceFormatter.js"
import { addTrade, getSelectedColony, getSelectedMineral, getSelectedTrader, setMineral, setTrader } from "./TransientState.js"

export const tradePartnerList = async () => {
    document.addEventListener("change", handleTradePartnerChoice)
    if(getSelectedColony() != 0) {
        const mineralDetails = await getAllMinerals()
        const colonyList = await getAllColonies()
        const result = await getAllColonies()
        return result.sort(alphaSort).map(element => {
                var selected = (parseInt(element.id) == getSelectedTrader()) ? `selected="selected"` : ``
                if(element.id != getSelectedColony()) {
                    return `<option ${selected} value="${element.id}">${element.locationName} - ${element.displayName}</option>`
                }}).join(`\n`);
    } else {
        //document.querySelector(`#traderList`).disabled = true
        return ''
    }
}

export const offeredMinerals = async () => {
    document.addEventListener("change", handleMineralChoice)
    if(getSelectedTrader() != 0) {
        const mineralDetails = await getAllMinerals()
        const selectedTrader = await getColony(getSelectedTrader())
        return selectedTrader.mineralMap.map(element => {
            var selected = (parseInt(element.mineralId) == getSelectedMineral()) ? `checked` : ``
            return `
            <label class='hoverPointer standard'>
            <input type='radio' class='hoverPointer standard' name='tradeOption' value='${element.mineralId}' ${selected}/> ${mineralDetails.get(element.mineralId).displayName}: ${element.mineralQuantity} ${mineralDetails.get(element.mineralId).unit} @ ${formatPrice(mineralDetails.get(element.mineralId).pricePerUnit)}/unit
            </label>
            <br>
            `
    }).join(`\n`)
    } else return (``) 
}

export const addToCartButton = async () => {
    document.addEventListener("click", addToCart)
    return `<button class='hoverPointer' id='addToCart'>Add to Cart</button>`
}

const alphaSort = (a, b) => {
    var locA = a.locationName.toUpperCase();
    var locB = b.locationName.toUpperCase();
    return (locA < locB) ? -1 : (locA > locB) ? 1 : 0;
}

const handleTradePartnerChoice = async (event) => {
    if (event.target.name === "traderList") {
        setTrader(parseInt(event.target.value))
    }
}

const handleMineralChoice = async (event) => {
    if (event.target.name === "tradeOption") {
        setMineral(parseInt(event.target.value))
    }
}

const addToCart = async (clickEvent) => {
    if (clickEvent.target.id === "addToCart" 
        && document.querySelector('#tradeQuantity').value > 0
        && getSelectedMineral() != 0) {
        document.activeElement.blur()
        addTrade(parseInt(document.querySelector('#tradeQuantity').value))
    }
}

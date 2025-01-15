import { getAllColonies } from "./ColonyDao.js"
import { getAllMinerals } from "./MineralDao.js"
import { formatPrice } from "./PriceFormatter.js"
import { getTradeList } from "./TransientState.js"

export const populateCart = async () => {
    const tradeList = getTradeList()
    if(tradeList.size == 0) {
        return `<div class="standard"> (Empty)</div>`
    } else {
        const mineralDetails = await getAllMinerals()
        const colonyList = await getAllColonies()
        // return `<label class='hoverPointer standard'>
        //         <input type='radio' class='hoverPointer standard' name='cartTrade' value='${element.mineralId}' ${selected}/> ${mineralDetails.get(element.mineralId).displayName}: ${element.mineralQuantity} ${mineralDetails.get(element.mineralId).unit} @ ${formatPrice(mineralDetails.get(element.mineralId).pricePerUnit)}/unit
        //         </label>
        //         <br>`
    }
    
}

export const cartTotal = async () => {
    var total = 0
    const mineralDetails = await getAllMinerals()
    getTradeList().forEach(element => {
        const mineral = mineralDetails.get(element.selectedMineral)
        total += (element.quantity * mineral.pricePerUnit)})
    return `<div class="standard"> Cart total = ${formatPrice(total)}</div>
        <button class='hoverPointer' id='removeTrade'>Remove Selected</button>
        <button class='hoverPointer' id='completeTrade'>Checkout</button>`
}
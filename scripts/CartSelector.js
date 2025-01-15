import { getAllColonies, getColonyMap } from "./ColonyDao.js"
import { getAllMinerals } from "./MineralDao.js"
import { formatPrice } from "./PriceFormatter.js"
import { getSelectedTrade, getTradeList, removeTrade, setTrade } from "./TransientState.js"

export const populateCart = async () => {
    document.addEventListener("change", handleTradeChoice)
    const tradeList = getTradeList()
    if(tradeList.size == 0) {
        return `<div class="standard"> (Empty)</div>`
    } else {
        const mineralDetails = await getAllMinerals()
        const colonyDetails = await getColonyMap()
        const render = []
        //const trades = tradeList.values()
        tradeList.forEach((value, key) =>{
            var selected = (parseInt(key) == getSelectedTrade()) ? `checked` : ``
           render.push(`<label class='hoverPointer standard'>
                <input type='radio' class='hoverPointer standard' name='cartTrade' value='${key}' ${selected}/> ${value.quantity} ${mineralDetails.get(value.selectedMineral).unit} of ${mineralDetails.get(value.selectedMineral).displayName} from ${colonyDetails.get(value.selectedTrader).displayName}
                </label>
                <br>`)
        })
        return render.join(`\n`)
    }
    
}

export const cartTotal = async () => {
    var total = 0
    const mineralDetails = await getAllMinerals()
    getTradeList().forEach(element => {
        const mineral = mineralDetails.get(element.selectedMineral)
        total += (element.quantity * mineral.pricePerUnit)})
    document.addEventListener("click", deleteTrade)
    return `<div class="standard"> Cart total = ${formatPrice(total)}</div>
        <button class='hoverPointer' id='removeTrade'>Remove Selected</button>
        <button class='hoverPointer' id='completeTrade'>Checkout</button>`
}

const handleTradeChoice = async (event) => {
    if (event.target.name === "cartTrade") {
        setTrade(parseInt(event.target.value))
    }
}

const deleteTrade = async (clickEvent) => {
    if (clickEvent.target.id === "removeTrade" 
        && getSelectedTrade() != 0) {
        document.activeElement.blur()
        removeTrade()
    }
}
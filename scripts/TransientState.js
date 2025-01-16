import { getColony, updateColony } from "./ColonyDao.js"

const state = {
    "selectedColony": 0,
    "selectedTrader": 0,
    "selectedMineral": 0,
    "tradeList" : new Map(),
    "selectedTrade": 0
}



export const setColony = (colonyId) => {
    state.selectedColony = colonyId
    document.dispatchEvent(new CustomEvent("stateChanged"))
}

export const getSelectedColony = () => {
    return state.selectedColony
}

export const setTrader = (traderId) => {
    state.selectedTrader = traderId
    document.dispatchEvent(new CustomEvent("stateChanged"))
}

export const getSelectedTrader = () => {
    return state.selectedTrader
}

export const setMineral = (mineralID) => {
    state.selectedMineral = mineralID
    document.dispatchEvent(new CustomEvent("stateChanged"))
}

export const getSelectedMineral = () => {
    return state.selectedMineral
}

export const addTrade = (quantity, price) => {
    state.tradeList.set(Date.now(), {
        "selectedColony": state.selectedColony,
        "selectedTrader": state.selectedTrader,
        "selectedMineral": state.selectedMineral,
        "quantity": quantity
    })
    state.selectedMineral = 0
    document.dispatchEvent(new CustomEvent("stateChanged"))
}

export const getTradeList = () => {
    return state.tradeList
}

export const setTrade = (tradeId) =>{
    state.selectedTrade = tradeId
    document.dispatchEvent(new CustomEvent("stateChanged"))
}

export const getSelectedTrade = () => {
    return state.selectedTrade
}

export const removeTrade = () => {
    state.tradeList.delete(state.selectedTrade)
    state.selectedTrade = 0
    document.dispatchEvent(new CustomEvent("stateChanged"))
}

export const refreshChoices = () => {
    state.selectedTrader = 0
    state.selectedMineral = 0
    state.tradeList = new Map()
    state.selectedTrade = 0
    document.dispatchEvent(new CustomEvent("stateChanged"))
}

export const purchaseMineral = async () => {
    /*
        Does the chosen governor's colony already own some of this mineral?
            - If yes, what should happen?
            - If no, what should happen?

        Defining the algorithm for this method is traditionally the hardest
        task for teams during this group project. It will determine when you
        should use the method of POST, and when you should use PUT.

        Only the foolhardy try to solve this problem with code.
    */

    for(const value of state.tradeList.values()) {
        const homeColony = await getColony(value.selectedColony)
        const tradeColony = await getColony(value.selectedTrader)
        const homeMinerals = mapMaker(homeColony.mineralMap)
        const tradeMinerals = mapMaker(tradeColony.mineralMap)
        console.log(homeColony.mineralMap)
        const selectedMineral = value.selectedMineral
        if (tradeMinerals.has(selectedMineral)) {
            const requested = value.quantity
            const available = tradeMinerals.get(selectedMineral).mineralQuantity
            const actual = Math.min(requested, available)
            const stockpile = homeMinerals.get(selectedMineral)? homeMinerals.get(selectedMineral).mineralQuantity : 0
            if (available == actual) {
                tradeMinerals.delete(selectedMineral)
            }else
            {tradeMinerals.get(selectedMineral).mineralQuantity = (available - actual)}
            if (homeMinerals.has(selectedMineral)) {
                homeMinerals.get(selectedMineral).mineralQuantity = stockpile + actual
            } else {
                homeMinerals.set(selectedMineral, {"mineralId": selectedMineral, "mineralQuantity": actual})
            }
            homeColony.mineralMap = Array.from(homeMinerals.values())
            updateColony(homeColony)
            tradeColony.mineralMap = Array.from(tradeMinerals.values())
            updateColony(tradeColony)
        }
    }
    state.selectedTrade = 0
    state.tradeList = new Map()
    document.dispatchEvent(new CustomEvent("stateChanged"))
}

const mapMaker = (object) => {
    const newMap = new Map()
    object.forEach(element => {
        newMap.set(element.mineralId, element)
    });
    return newMap
}
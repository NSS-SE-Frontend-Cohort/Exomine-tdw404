const state = {
    "selectedColony": 0,
    "selectedTrader": 0,
    "selectedMineral": 0,
    "tradeList" : new Map()
}



export const setColony = (colonyId) => {
    state.selectedColony = colonyId
    console.log(`Selected colony = ${state.selectedColony}`)
    document.dispatchEvent(new CustomEvent("stateChanged"))
}

export const getSelectedColony = () => {
    return state.selectedColony
}

export const setTrader = (traderId) => {
    state.selectedTrader = traderId
    console.log(`Selected trader = ${state.selectedTrader}`)
    document.dispatchEvent(new CustomEvent("stateChanged"))
}

export const getSelectedTrader = () => {
    return state.selectedTrader
}

export const setMineral = (mineralID) => {
    state.selectedMineral = mineralID
    console.log(`Selected mineral = ${state.selectedMineral}`)
    document.dispatchEvent(new CustomEvent("stateChanged"))
}

export const getSelectedMineral = () => {
    return state.selectedMineral
}

export const addTrade = (quantity) => {
    state.tradeList.set(Date.now(), {
        "selectedColony": state.selectedColony,
        "selectedTrader": state.selectedTrader,
        "selectedMineral": state.selectedMineral,
        "quantity": quantity
    })
    console.log(state.tradeList)
    state.selectedMineral = 0
    document.dispatchEvent(new CustomEvent("stateChanged"))
}
export const purchaseMineral = () => {
    /*
        Does the chosen governor's colony already own some of this mineral?
            - If yes, what should happen?
            - If no, what should happen?

        Defining the algorithm for this method is traditionally the hardest
        task for teams during this group project. It will determine when you
        should use the method of POST, and when you should use PUT.

        Only the foolhardy try to solve this problem with code.
    */



    document.dispatchEvent(new CustomEvent("stateChanged"))
}

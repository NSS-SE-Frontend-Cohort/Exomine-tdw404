export const getAllMinerals = async () => {
    const result = await fetch ("http://localhost:8088/minerals").then(result => result.json())
    const mineralMap = new Map()
    result.forEach(element => {
        mineralMap.set(element.id, element)
    })
    return mineralMap
}

export const getMineral = async (mineralId) => {
    return await fetch (`http://localhost:8088/colonies/${mineralId}`).then(result => result.json())
}
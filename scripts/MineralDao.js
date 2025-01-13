export const getAllMinerals = async () => {
    const response = await fetch ("http://localhost:8088/minerals")
}

export const getMineral = async (mineralId) => {
    const response = await fetch (`http://localhost:8088/colonies/${mineralId}`)
}
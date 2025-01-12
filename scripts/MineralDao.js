export const getAllMinerals = async () => {
    const response = await fetch ("http://localhost:0888/minerals")
}

export const getMineral = async (mineralId) => {
    const response = await fetch (`http://localhost:0888/colonies/${mineralId}`)
}
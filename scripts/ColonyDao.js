export const getAllColonies = async () => {
    const colonies = await fetch ("http://localhost:8088/colonies?_expand=colonist").then(result => result.json())
    return colonies
}

export const getColonyMap = async () => {
    const result = await fetch ("http://localhost:8088/colonies?_expand=colonist").then(result => result.json())
    const colonyMap = new Map()
    result.forEach(element => {
        colonyMap.set(element.id, element)
    })
    return colonyMap
}

export const getColony = async (colonyId) => {
    return await fetch (`http://localhost:8088/colonies/${colonyId}`).then(result => result.json())
}

export const updateColony = async (colony) => {
    const postOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(colony)
    }
    return await fetch (`http://localhost:8088/colonies/${colony.id}`, postOptions).then(result => result.json())
}
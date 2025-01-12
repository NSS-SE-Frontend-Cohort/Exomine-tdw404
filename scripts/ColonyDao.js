export const getAllColonies = async () => {
    const response = await fetch ("http://localhost:0888/colonies?expand=colonist")
}

export const getColony = async (colonyId) => {
    const response = await fetch (`http://localhost:0888/colonies/${colonyId}`)
}

export const postColony = async (colony) => {
    const postOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(colony)
    }
    const response = await fetch (`http://localhost:0888/colonies/${colonyId}`, postOptions)
}
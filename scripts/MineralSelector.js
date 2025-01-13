import { getAllMinerals } from "./MineralDao.js"

export const mineralList = async () => {
    
    const result = await getAllMinerals()
    //const mineralMap = new Map(Object.entries(result.props.json))
    
    const render = []
    render.push(`<h2 class="title">Trade Offers</h2>`)

}
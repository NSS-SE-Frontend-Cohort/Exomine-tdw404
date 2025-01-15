import { cartTotal, populateCart } from "./CartSelector.js";
import { colonyList, ownedMinerals } from "./ColonySelector.js";
import { randomInt } from "./Randomizer.js";
import { addToCartButton, offeredMinerals, tradePartnerList } from "./TradeSelector.js";

const phrases = new Map([
    [1, "In space, no one can hear you save!"],
    [2, "Vacuum sucks, our prices don't!"],
    [3, "All shipments now contain 30% fewer xenomorphs!"],
    [4, "Your gateway to universal prosperity (terms and conditions apply)!"],
    [5, "We mine it, you buy it, everyone’s happy—except the asteroid."],
    [6, "You don't have to have gravity to work here, but it helps!"]
  ]);

export const renderHeader = (header) => {
    header.innerHTML = `<div class="logo">EXOMINE<sup>TM</sup> Mineral Trading Platform</div>
    <div class="terminal">${phrases.get(randomInt(1,6))}</div>`
}

export const renderBody = async (trades) => {
    trades.innerHTML = 
    `<article class="trade_screens">
            <section class="options screen_home">
                <h2 class="title">Home Colony</h2>
                <label for="colonyList" class = "standard">Welcome, governor.</label>
                <select class="standard hoverPointer" id="colonyList" name="colonyList">
                <option value="0">Please select your home colony...</option>
                ${await colonyList()}
                </select>
                <hr class="dotted"></hr>
                <div id ="ownMinerals">
                    <h3 class="title">Home Colony Supplies</h3>
                    <ul class="standard" id="ownMineralList">
                        ${await ownedMinerals()}
                    </ul>
                </div>
            </section>
            <section class="options screen_offers">
                <h2 class="title">Trade Offers</h2>
                <label for="traderList" class = "standard hoverPointer">Trading with:</label>
                <select class="standard" id="traderList" name="traderList">
                <option value="0">Please select a trading partner...</option>
                ${await tradePartnerList()}
                </select>
                <hr class="dotted"></hr>
                    <h3 class="title">Minerals on Offer</h3>
                    ${await offeredMinerals()}
                    <input class="standard" type="number" id="tradeQuantity" name="tradeQuantity" min="0" value="0">
                    ${await addToCartButton()}
            </section>
            <section class="options screen_list">
                <h2 class="title">Cart</h2>
                <hr class="dotted"></hr>
                ${await populateCart()}
                <hr class="dotted"></hr>
                ${await cartTotal()}
            </section>
    </article>`
}
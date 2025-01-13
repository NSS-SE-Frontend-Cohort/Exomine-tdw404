import { colonyList, ownedMinerals } from "./ColonySelector.js";
import { randomInt } from "./Randomizer.js";

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
                <select class="standard" id="colonyList" name="colonyList">
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
                <div class="standard" id="trading_dialogue">Select your home colony before continuing.</div>
            </section>
            <section class="options screen_list">
                <h2 class="title">Cart</h2>
                <div class="standard" id="cart_dialogue">Select your home colony before continuing.</div>
            </section>
    </article>`
}
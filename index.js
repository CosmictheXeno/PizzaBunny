let gamePaused = false;

const increaseButton = document.getElementById("increase");
const countLabel = document.getElementById("money");
const pizzaShop = document.getElementById("PizzaShop");
const moneyperClickLabel = document.getElementById("MPC");
const autoIncomeLabel = document.getElementById('MPS');

const currentVersion = "2.3.7";

function saveGame(data) {
    localStorage.getItem("save", JSON.stringify({
        version: currentVersion,
    }));
}

window.onload = function () {
    const seenVersion = localStorage.getItem("seenPatchNotes");

    if (seenVersion !== currentVersion) {
        document.getElementById("patchnote").style.display = "block";
    }
};

document.getElementById("closePatchNotes").onclick = function () {
    document.getElementById("patchnote").style.display = "none";

    localStorage.setItem("seenPatchNotes", "2.3.7");
}

const pn = document.getElementById("patchnote");
const pnBtn = document.getElementById("viewpatchnote");

pnBtn.onclick = function () {
    pn.style.display = "block";
}

const openBtn = document.getElementById('open');
const modal = document.getElementById('modalcontainer');

const cheeseBtn = document.getElementById('cheese');
const chsprice = document.getElementById('chpp')
const chsname = document.getElementById('chp')

const gpBtn = document.getElementById('Pepper')
const gpprice = document.getElementById('gppp')
const gpname = document.getElementById('gpp')

const mbBtn = document.getElementById('meatball')
const mbprice = document.getElementById('mbpp')
const mbname = document.getElementById('mbp')

const pcfBtn = document.getElementById('pepperonicf')
const pcfprice = document.getElementById('pcfp')
const pcfname = document.getElementById('ppcf')

const ccfBtn = document.getElementById('cheesecf')
const ccfprice = document.getElementById('ccfp')
const ccfname = document.getElementById('ccf')

const gpcfBtn = document.getElementById('greenpeppercf')
const gpcfprice = document.getElementById('gpcfp')
const gpcfname = document.getElementById('gpcf')

const mbcfBtn = document.getElementById('meatballcf')
const mbcfprice = document.getElementById('mbcfp')
const mbcfname = document.getElementById('mbcf')

const ranchBtn = document.getElementById('ranch')
const ranchprice = document.getElementById('ranchp')
const ranchname = document.getElementById('ranchn')

const mhsBtn = document.getElementById('mhotsauce')
const mhsprice = document.getElementById('mhsp')
const mhsname = document.getElementById('mhsn')

const msBtn = document.getElementById('marinarasauce')
const msprice = document.getElementById('msp')
const msname = document.getElementById('msn')

const ccBtn = document.getElementById('carrotcola')
const ccprice = document.getElementById('ccp')
const ccname = document.getElementById('ccn')

const ssBtn = document.getElementById('sweetstem')
const ssprice = document.getElementById('ssp')
const ssname = document.getElementById('ssn')

const hgBtn = document.getElementById('hillgo')
const hgprice = document.getElementById('hgp')
const hgname = document.getElementById('hgn')

const bdsBtn = document.getElementById('breadstick')
const bdsprice = document.getElementById('bdsp')
const bdsname = document.getElementById('bdsn')

const cbBtn = document.getElementById('cheesybread')
const cbprice = document.getElementById('cbp')
const cbname = document.getElementById('cbn')

const gbBtn = document.getElementById('garlicbread')
const gbprice = document.getElementById('gbp')
const gbname = document.getElementById('gbn')

const cfbBtn = document.getElementById('cheesefilledbread')
const cfbprice = document.getElementById('cfbp')
const cfbname = document.getElementById('cfbn')

const ctailBtn = document.getElementById('bunnytail')
const ctailprice = document.getElementById('ctp')
const ctailname = document.getElementById('ctn')

const cfctBtn = document.getElementById('cfcinnamontail')
const cfctprice = document.getElementById('cfctp')
const cfctname = document.getElementById('cfctn')

const brownieBtn = document.getElementById('brownie')
const brownieprice = document.getElementById('browniep')
const browniename = document.getElementById('brownien')

const candybBtn = document.getElementById('candybrownie')
const candybprice = document.getElementById('candybp')
const candybname = document.getElementById('candybn')

const cfbsBtn = document.getElementById('cheesefilledstick')
const cfbsprice = document.getElementById('cfbsp')
const cfbsname = document.getElementById('cfbsn')

const cfgsBtn = document.getElementById('cheesefilledgarlicstix')
const cfgsprice = document.getElementById('cfgbp')
const cfgsname = document.getElementById('cfgbn')

document.addEventListener("click", function(event) {

    if (event.target.closest("button")) {
        return;
    }

    if (event.target.closest(".modalcontent")) {
        return;
    }

    count += click;

    updateDisplay();
});

const reset =
document.getElementById("reset");

function fullReset() {

    const confirmed = confirm(
        "This will reset EVERYTHING are you sure?"
    );

    if (!confirmed) return;

    count = 0;
    click = 1;
    autoIncome = 0;

    for (const upgrade in upgrades) {
        upgrades[upgrade].level = 0;

        upgrades[upgrade].price =
        upgrades[upgrade].baseName;
    }

    updateDisplay();

    updateUpgradeLabels();

    saveGame();

    location.reload();
}


reset.addEventListener(
    "click",
    fullReset
);

function updateDisplay() {
    document.getElementById("MPC").innerText = "$" + formatMoney(click) + "/click";
    document.getElementById("MPS").innerText = "$" + formatMoney(autoIncome) + "/sec";
    document.getElementById("money").textContent = "$" + formatMoney(count);
}

setInterval(function () {
    if (!gamePaused) {
    count += autoIncome;
    updateDisplay();
    }
}, 1000);

function formatMoney(amount) {
    if (amount >= 1000000000000000000) return (amount / 1000000000000000000).toFixed(1).replace(".0", "") + "Qi";
    if (amount >= 1000000000000000) return (amount / 1000000000000000).toFixed(1).replace(".0", "") + "Qa";
    if (amount >= 1000000000000) return (amount / 1000000000000).toFixed(1).replace(".0", "") + "T";
    if (amount >= 1000000000) return (amount / 1000000000).toFixed(1).replace(".0", "") + "B";
    if (amount >= 1000000) return (amount / 1000000).toFixed(1).replace(".0", "") + "M";
    if (amount >= 1000) return (amount / 1000).toFixed(1).replace(".0", "") + "K";
    return Math.floor(amount);
}

function updateUpgradeLabels() {
    chsprice.textContent = "$" + formatMoney(upgrades.Cheese.price);
    chsname.textContent = "Cheese Lv. " + upgrades.Cheese.level;

    gpprice.textContent = "$" + formatMoney(upgrades.gp.price);
    gpname.textContent = "Green Pepper Pizza Lv. " + upgrades.gp.level;

    mbprice.textContent = "$" + formatMoney(upgrades.mb.price);
    mbname.textContent = "Meatball Pizza Lv. " + upgrades.mb.level;

    pcfprice.textContent = "$" + formatMoney(upgrades.pcf.price);
    pcfname.textContent = "Pepperoni Cheese Filled Pizza Lv. " + upgrades.pcf.level;

    ccfprice.textContent = "$" + formatMoney(upgrades.ccf.price);
    ccfname.textContent = "Extra Cheese Pizza Lv. " + upgrades.ccf.level;

    gpcfprice.textContent = "$" + formatMoney(upgrades.gpcf.price);
    gpcfname.textContent = "Green Pepper Cheese Filled Pizza Lv. " + upgrades.gpcf.level;

    mbcfprice.textContent = "$" + formatMoney(upgrades.mbcf.price);
    mbcfname.textContent = "Meatball Cheese Filled Pizza Lv. " + upgrades.mbcf.level;

    ranchprice.textContent = "$" + formatMoney(upgrades.ranch.price);
    ranchname.textContent = "Ranch Lv. " + upgrades.ranch.level;
    
    mhsprice.textContent = "$" + formatMoney(upgrades.mhs.price);
    mhsname.textContent = "Mild Hot Sauce Lv. " + upgrades.mhs.level;

    msprice.textContent = "$" + formatMoney(upgrades.ms.price);
    msname.textContent = "Marinara Sauce Lv. " + upgrades.ms.level;

    ccprice.textContent = "$" + formatMoney(upgrades.cc.price);
    ccname.textContent = "Carrot Cola Lv. " + upgrades.cc.level;

    ssprice.textContent = "$" + formatMoney(upgrades.ss.price);
    ssname.textContent = "Sweet Stem Lv. " + upgrades.ss.level;

    hgprice.textContent = "$" + formatMoney(upgrades.hg.price);
    hgname.textContent = "Hill Go Lv. " + upgrades.hg.level;

    bdsprice.textContent = "$" + formatMoney(upgrades.bds.price);
    bdsname.textContent = "Breadstick Lv. " + upgrades.bds.level;

    cbprice.textContent = "$" + formatMoney(upgrades.cb.price);
    cbname.textContent = "Cheese Bread Lv. " + upgrades.cb.level;
    
    gbprice.textContent = "$" + formatMoney(upgrades.gb.price);
    gbname.textContent = "Garlic Bread Lv. " + upgrades.gb.level;

    cfbprice.textContent = "$" + formatMoney(upgrades.cfb.price);
    cfbname.textContent = "Cheese Filled Bread Lv. " + upgrades.cfb.level;

    cfbsprice.textContent = "$" + formatMoney(upgrades.cfbs.price);
    cfbsname.textContent = "Cheese Filled Cheese Stick Lv. " + upgrades.cfbs.level;

    cfgsprice.textContent = "$" + formatMoney(upgrades.cfgs.price);
    cfgsname.textContent = "Cheese Filled Garlic Stick Lv. " + upgrades.cfgs.level;

    ctailprice.textContent = "$" + formatMoney(upgrades.ctail.price);
    ctailname.textContent = "Cinnabun Tail Lv. " + upgrades.ctail.level;

    cfctprice.textContent = "$" + formatMoney(upgrades.cfct.price);
    cfctname.textContent = "Creme Filled Cinnabun Tail Lv. " + upgrades.cfct.level;

    brownieprice.textContent = "$" + formatMoney(upgrades.brownie.price);
    browniename.textContent = "Brownie Lv. " + upgrades.brownie.level;

    candybprice.textContent = "$" + formatMoney(upgrades.candyb.price);
    candybname.textContent = "Candy Brownie Lv. " + upgrades.candyb.level;
}

function buyUpgrade(button, upgrade, priceLabel, nameLabel, baseName) {
    button.onclick = function () {
        if (count >= upgrade.price) {
            count -= upgrade.price;

            click += upgrade.clickIncrease;
            autoIncome += upgrade.autoIncrease; 

            upgrade.level += 1;

            upgrade.price = Math.floor(upgrade.price * 1.5);

            updateDisplay();
            updateUpgradeLabels();
        }
    };
}

function endEvent() {
    eventActive = false;

    clearInterval(eventTimerInterval);

    document.getElementById("irsevent").style.display = "none";

    currentClicks = 0;
    timeLeft = 10;

    document.getElementById("clickCount").textContent = "0";
    document.getElementById("eventTimer").textContent = "10";
}

function startEvent() {
    eventActive = true;
    currentClicks = 0;
    timeLeft = 15;

    document.getElementById("irsevent").style.display = "block";
    document.getElementById("clickCount").textContent = currentClicks;
    document.getElementById("eventTimer").textContent = timeLeft;

    eventTimerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById("eventTimer").textContent = timeLeft;

        if (timeLeft <= 0) {
            failEvent();
        }
    }, 1000);
    if (eventActive) return;
}

function winEvent() {
    clearInterval(eventTimerInterval);
    eventActive = false;

    document.getElementById("irsevent")

    count += 2000000;
    updateDisplay();
    endEvent();
}

function failEvent() {
    clearInterval(eventTimerInterval);
    eventActive = false;

    document.getElementById("irsevent").style.display = "none";

    count *= 0.5;
    updateDisplay();
    endEvent();
}

window.onload = function () {
    loadGame();
};

function saveGame () {
    let saveData = {
        version: currentVersion,
        count: count,
        click: click,
        autoIncome: autoIncome,
        upgrades: upgrades,
    };

    localStorage.setItem("pizzabunnySave", JSON.stringify(saveData));
}

function loadGame() {
    const savedData = localStorage.getItem("pizzabunnySave");

    if (!savedData) return;
        const data = JSON.parse(savedData);

        if (!data.version) {
            data.version = "0.0"
        }

        count = data.count ?? 0;
        click = data.click ?? 1;
        autoIncome = data.autoIncome ?? 0;

        if (data.upgrades) {
            for (let key in upgrades) {
                if (data.upgrades[key]) {
                    upgrades[key].level = data.upgrades[key].level ?? 0;
                    upgrades[key].price = data.upgrades[key].price ?? upgrades[key].price;
                }
            }
        }

        updateDisplay();
        updateUpgradeLabels();
}

let clicksNeeded = 50;
let currentClicks = 0; 
let timeLeft = 15;
let eventInterval;
let eventTimerInterval;
let count = 0;
let click = 1;
let autoIncome = 0;

let upgrades = {
    Cheese: {
        level: 0,
        price: 3,
        clickIncrease: 4,
        autoIncrease: 0
    },
    gp: {
        level: 0,
        price: 6,
        clickIncrease: 8,
        autoIncrease: 0
    },
    mb: {
        level: 0,
        price: 9,
        clickIncrease: 12,
        autoIncrease: 0
    },
    pcf: {
        level: 0,
        price: 29,
        clickIncrease: 0,
        autoIncrease: 30
    },
    ccf: {
        level: 0,
        price: 49,
        clickIncrease: 0,
        autoIncrease: 60
    },
    gpcf: {
        level: 0,
        price: 69,
        clickIncrease: 0,
        autoIncrease: 90
    },
    mbcf: {
        level: 0,
        price: 89,
        clickIncrease: 0,
        autoIncrease: 120
    },
    ranch: {
        level: 0,
        price: 120,
        clickIncrease: 3,
        autoIncrease: 120
    },
    mhs: {
        level: 0,
        price: 322,
        clickIncrease: 6,
        autoIncrease: 120
    },
    ms: {
        level: 0,
        price: 524,
        clickIncrease: 9,
        autoIncrease: 120
    },
    cc: {
        level: 0,
        price: 699,
        clickIncrease: 9,
        autoIncrease: 395
    },
    ss: {
        level: 0,
        price: 864,
        clickIncrease: 9,
        autoIncrease: 670
    },
    hg: {
        level: 0,
        price: 1029,
        clickIncrease: 9,
        autoIncrease: 945
    },
    bds: {
        level: 0,
        price: 6079,
        clickIncrease: 11,
        autoIncrease: 1247
    },
    cb: {
        level: 0,
        price: 11129,
        clickIncrease: 13,
        autoIncrease: 4250
    },
    gb: {
        level: 0,
        price: 61179,
        clickIncrease: 15,
        autoIncrease: 7253
    },
    cfb: {
        level: 0,
        price: 71189,
        clickIncrease: 30,
        autoIncrease: 9273
    },
    cfbs: {
        level: 0,
        price: 81199,
        clickIncrease: 45,
        autoIncrease: 11293
    },
    cfgs: {
        level: 0,
        price: 91209,
        clickIncrease: 60,
        autoIncrease: 31313
    },
    ctail: {
        level: 0,
        price: 132139,
        clickIncrease: 0,
        autoIncrease: 51315
    },
    cfct: {
        level: 0,
        price: 632194,
        clickIncrease: 10,
        autoIncrease: 0
    },
    brownie: {
        level: 0,
        price: 884749,
        clickIncrease: 10,
        autoIncrease: 50
    },
    candyb: {
        level: 0,
        price: 1137279,
        clickIncrease: 10,
        autoIncrease: 100
    },
}
buyUpgrade(cheeseBtn, upgrades.Cheese, chsprice, chsname, "Cheese Pizza");
buyUpgrade(gpBtn, upgrades.gp, gpprice, gpname, "Green Pepper Pizza");
buyUpgrade(mbBtn, upgrades.mb, mbprice, mbname, "Meatball Pizza");
buyUpgrade(pcfBtn, upgrades.pcf, pcfprice, pcfname, "Pepperoni Cheese filled Pizza");
buyUpgrade(ccfBtn, upgrades.ccf, ccfprice, ccfname, "Extra Cheese pizza");
buyUpgrade(gpcfBtn, upgrades.gpcf, gpcfprice, gpcfname, "Green Pepper Cheese Filled Pizza");
buyUpgrade(mbcfBtn, upgrades.mbcf, mbcfprice, mbname, "Meatball Cheese Filled Pizza");
buyUpgrade(ranchBtn, upgrades.ranch, ranchprice, ranchname, "Ranch");
buyUpgrade(mhsBtn, upgrades.mhs, mhsprice, mhsname, "Mild Hot Sauce");
buyUpgrade(msBtn, upgrades.ms, msprice, msname, "Marinara Sauce");
buyUpgrade(ccBtn, upgrades.cc, ccprice, ccname, "Carrot Cola");
buyUpgrade(ssBtn, upgrades.ss, ssprice, ssname, "Sweet Stem");
buyUpgrade(hgBtn, upgrades.hg, hgprice, hgname, "Hill Go");
buyUpgrade(bdsBtn, upgrades.bds, bdsprice, bdsname, "Breadstick");
buyUpgrade(cbBtn, upgrades.cb, cbprice, cbname, "Cheese Bread");
buyUpgrade(gbBtn, upgrades.gb, gbprice, gbname, "Garlic Bread");
buyUpgrade(cfbBtn, upgrades.cfb, cfbprice, cfbname, "Cheese Filled Bread");
buyUpgrade(cfbsBtn, upgrades.cfbs, cfbsprice, cfbsname, "Cheese Filled Bread Stick");
buyUpgrade(cfgsBtn, upgrades.cfgs, cfgsprice, cfgsname, "Cheese Filled Garlic Stick");
buyUpgrade(ctailBtn, upgrades.ctail, ctailprice, ctailname, "Cinnabun Tail");
buyUpgrade(cfctBtn, upgrades.cfct, cfctprice, cfctname, "Creme Filled Cinnabun Tail");
buyUpgrade(brownieBtn, upgrades.brownie, brownieprice, browniename, "Brownie");
buyUpgrade(candybBtn, upgrades.candyb, candybprice, "Candy Brownie");

increaseButton.onclick = function () {
    count += click;
    updateDisplay();
};

openBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}); 
document.getElementById("eventButton").onclick = () => {
    if (!eventActive) return;

    currentClicks++;
    document.getElementById("clickCount").textContent = currentClicks;

    if(currentClicks >= clicksNeeded) {
        winEvent();
    }
};

setInterval(saveGame, 5000);

loadGame();
updateUpgradeLabels();
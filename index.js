
let randomEventCooldown = false;
let gamePaused = false;
let eventActive = false;

let chaseActive = false;

let targetX = 0;
let targetY = 0;

let playerX = 0;
let playerY = 0;

const increaseButton = document.getElementById("increase");
const countLabel = document.getElementById("money");
const pizzaShop = document.getElementById("PizzaShop");
const moneyperClickLabel = document.getElementById("MPC");
const autoIncomeLabel = document.getElementById('MPS');

const currentVersion = "2.3.6";

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

    localStorage.setItem("seenPatchNotes", "2.3.6");
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



document.addEventListener("keydown", (e) => {
    if (!chaseActive) return;

    switch (e.key) {
        case "ArrowUp":
            chaseGame.movePlayer(0, -1);
            break;
        case "ArrowDown":
            chaseGame.movePlayer(0, 1);
            break;
        case "ArrowLeft":
            chaseGame.movePlayer(-1, 0);
            break;
        case "ArrowRight":
            chaseGame.movePlayer(1, 0);
            break;
    }
});

function endChaseEvent() {
    gamePaused = false;

    chaseActive = false;

    settimeout( () => {
        randomEventCooldown = false;
    }, 15000);
}

function triggerChaseEvent() {
    randomEventCooldown = true;
    gamePaused = true;

    chaseActive = true;

    targetX = Math.random() * 300;
    targetY = Math.random() * 300;

    playerX = 150;
    playerY = 150;

    chaseGame.start();
}

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

function buyUpgrade(button, upgrade, priceLabel, nameLabel, baseName) {
    button.onclick = function () {
        if (count >= upgrade.price) {
            count -= upgrade.price;

            click += upgrade.clickIncrease;
            autoIncome += upgrade.autoIncrease; 

            upgrade.level += 1;

            upgrade.price = Math.floor(upgrade.price * 1.5);

            priceLabel.textContent = "$" + formatMoney(upgrade.price);
            nameLabel.textContent = baseName + " lv. " + formatMoney(upgrade.level);

            updateDisplay();
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

setInterval( () => {
    if (!eventActive && Math.random() < 0.2) {
        startEvent();
    }
}, 30000);


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

document.addEventListener("keydown", (e) => {
    if (!chaseActive) return;

    if (e.key === "ArrowUp") playerY -= speed;
    if (e.key === "ArrowDown") playerY += speed;
    if (e.key === "ArrowLeft") playerX -= speed;
    if (e.key === "ArrowRight") playerX += speed;

    updatePositions();
    checkCatch();
});

let dx = 0;
let dy = 0;

if (chaseActive) {
    dx = targetX - playerX;
    dy = targetY - playerY;
    const chaseGame = {
    active: false,
    playerX: 0,
    playerY: 0,
    targetX: 0,
    targetY: 0,
    speed: 5,
    timeLeft: 10,
    interval: null,

    start() {
        document.getElementById("target").style.display = "block";
        document.getElementById("player").style.display = "none";
        this.active = true;
        this.timeLeft = 10;

        this.targetX = Math.random() * 300;
        this.targetY = Math.random() * 300;

        this.updateTargetPosition();

        this.interval = setInterval(() => {
            this.timeLeft--;

            if (this.timeLeft <= 0) {
                this.fail();
            }
        }, 1000);
    },

    movePlayer(dx, dy) {
        if (!this.active) return;

        this.playerX += dx * this.speed;
        this.playerY += dy * this.speed;

        this.updatePlayerposition();
        this.checkCatch();
    },

    checkCatch() {
        const distance = Math.hypot(
            this.playerX - this.targetX,
            this.playerY - this.targetY
        );

        if (distance < 30) {
            this.win();
        }
    },

    win() {
        this.stop();
        count += 5000;
        updateDisplay();
        endChaseEvent();
    },

    fail() {
        this.stop();
        count = Math.max(0, count - 25000);
        updateDisplay();
        endChaseEvent();
    },

    stop() {
        this.active = false;
        clearInterval(this.interval);
        document.getElementById("target").style.display = "none";
        document.getElementById("player").style.display = "none";
    },

    updatePlayerPosition() {
        const player = document.getElementById("player");
        player.style.left = this.playerX + "px";
        player.style.top = this.playerY + "px";
    },

    updateTargetPosition() {
        const target = document.getElementById("target");
        target.style.left = this.targetX + "px";
        target.style.top = this.targetY + "px";
    }
};
}

if (chaseActive && Math.abs(dx) <10) {

}

targetX += Math.sign(dx) * 10;
targetY += Math.sign(dy) * 10;

playerX = Math.max(0, Math.min(360, playerX));
playerY = Math.max(0, Math.min(260, playerY));

setInterval( () => {
    if (gamePaused || randomEventCooldown) return;

    let chance = Math.random();

    if (chance < 0.05) {
        triggerChaseEvent();
    }
}, 2000);

setInterval(saveGame, 5000);

loadGame();
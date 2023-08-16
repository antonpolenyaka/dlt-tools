"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sleep = exports.getEarnedByStakingByIndex = exports.prettyBN = exports.isEarnedChanged = exports.sumEarnedBN = exports.hasDesposit = exports.hasEarned = void 0;
const ethers_1 = require("ethers");
function hasEarned(earnedByStaking) {
    let result = false;
    if (earnedByStaking !== undefined) {
        let sum = sumEarnedBN(earnedByStaking);
        if (sum > 0 && sum.toString() !== '0') {
            result = true;
        }
    }
    return result;
}
exports.hasEarned = hasEarned;
function hasDesposit(depositBalance) {
    let result = false;
    if (depositBalance !== undefined) {
        if (depositBalance.gt(BigInt(0)) && depositBalance.toString() !== '0') {
            result = true;
        }
    }
    return result;
}
exports.hasDesposit = hasDesposit;
function sumEarnedBN(earnedByStaking) {
    let sum = BigInt(0);
    if (earnedByStaking !== undefined && earnedByStaking.length > 0) {
        for (let i = 0; i < earnedByStaking.length; i++) {
            sum = sum + earnedByStaking[i];
        }
    }
    return sum;
}
exports.sumEarnedBN = sumEarnedBN;
function isEarnedChanged(stateValues, propsValues) {
    let result = false;
    if ((propsValues === undefined && stateValues !== undefined) ||
        (propsValues !== undefined && stateValues === undefined)) {
        result = true;
    }
    else if (propsValues !== undefined && stateValues !== undefined) {
        if (propsValues.length !== stateValues.length) {
            result = true;
        }
        else {
            for (let i = 0; i < propsValues.length; i++) {
                if (propsValues[i].toString() !== stateValues[i].toString()) {
                    result = true;
                    break;
                }
            }
        }
    }
    return result;
}
exports.isEarnedChanged = isEarnedChanged;
function prettyBN(valueBN, customDecimals) {
    let result = '0';
    let decimals = customDecimals !== null && customDecimals !== void 0 ? customDecimals : 2;
    if (valueBN !== undefined) {
        let valueToShow;
        try {
            if (valueBN instanceof BigInt) {
                valueToShow = ethers_1.ethers.formatEther(valueBN.toString());
                result = toFixed(valueToShow, decimals);
            }
            else if (typeof (valueBN) === 'bigint') {
                valueToShow = ethers_1.ethers.formatEther(valueBN.toString());
                result = toFixed(valueToShow, decimals);
            }
            else if (typeof (valueBN) === 'number') {
                valueToShow = valueBN.toString();
                result = toFixed(valueToShow, decimals);
            }
            else {
                result = toFixed(valueBN, decimals);
            }
        }
        catch (_a) {
            result = valueBN;
        }
    }
    return result;
}
exports.prettyBN = prettyBN;
function toFixed(num, fixed) {
    const re = new RegExp('^-?\\d+(?:.\\d{0,' + (fixed || -1) + '})?');
    return num.match(re)[0];
}
function getEarnedByStakingByIndex(index, earned) {
    let result = '0';
    if (earned !== undefined && earned.length >= index) {
        const earnedBN = earned[index];
        result = prettyBN(earnedBN, 18);
    }
    return result;
}
exports.getEarnedByStakingByIndex = getEarnedByStakingByIndex;
function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}
exports.sleep = sleep;

import { ethers } from 'ethers';

export function hasEarned(earnedByStaking: any) {
    let result = false;
    if (earnedByStaking !== undefined) {
        let sum = sumEarnedBN(earnedByStaking);
        if (sum > 0 && sum.toString() !== '0') {
            result = true;
        }
    }
    return result;
}

export function hasDesposit(depositBalance: any) {
    let result = false;
    if (depositBalance !== undefined) {
        if (depositBalance.gt(BigInt(0)) && depositBalance.toString() !== '0') {
            result = true;
        }
    }
    return result;
}

export function sumEarnedBN(earnedByStaking: any) {
    let sum = BigInt(0);
    if (earnedByStaking !== undefined && earnedByStaking.length > 0) {
        for (let i = 0; i < earnedByStaking.length; i++) {
            sum = sum + earnedByStaking[i];
        }
    }
    return sum;
}

export function isEarnedChanged(stateValues: any, propsValues: any) {
    let result = false
    if (
        (propsValues === undefined && stateValues !== undefined) ||
        (propsValues !== undefined && stateValues === undefined)
    ) {
        result = true;
    } else if (propsValues !== undefined && stateValues !== undefined) {
        if (propsValues.length !== stateValues.length) {
            result = true;
        } else {
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

export function prettyBN(valueBN: any, customDecimals: any): string {
    let result = '0';
    let decimals = customDecimals ?? 2;
    if (valueBN !== undefined) {
        let valueToShow;
        try {
            if (valueBN instanceof BigInt) {
                valueToShow = ethers.formatEther(valueBN.toString());
                result = toFixed(valueToShow, decimals);
            } else if (typeof (valueBN) === 'bigint') {
                valueToShow = ethers.formatEther(valueBN.toString());
                result = toFixed(valueToShow, decimals);
            } else if (typeof (valueBN) === 'number') {
                valueToShow = valueBN.toString();
                result = toFixed(valueToShow, decimals);
            } else {
                result = toFixed(valueBN, decimals);
            }
        } catch {
            result = valueBN;
        }
    }
    return result;
}

function toFixed(num: any, fixed: any) {
    const re = new RegExp('^-?\\d+(?:.\\d{0,' + (fixed || -1) + '})?');
    return num.match(re)[0];
}

export function getEarnedByStakingByIndex(index: any, earned: any) {
    let result = '0';
    if (earned !== undefined && earned.length >= index) {
        const earnedBN = earned[index];
        result = prettyBN(earnedBN, 18);
    }
    return result;
}

export function sleep(milliseconds: any) {
    const date = Date.now();
    let currentDate: number | null = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

export function toShortAddress(address: string): string {
    return address.substring(0, 5) + "..." + address.slice(-4);
}
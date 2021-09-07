
export const toPosition = (num) =>
    `${num}${num.slice(-1) === "1"
        ? "st"
        : num.slice(-1) === "2"
            ? "nd"
            : num.slice(-1) === "3"
                ? "rd"
                : "th"
    } Surplus`;

export const toLayerPosition = (num) =>
    `${num}${num.slice(-1) === "1"
        ? "st"
        : num.slice(-1) === "2"
            ? "nd"
            : num.slice(-1) === "3"
                ? "rd"
                : "th"
    } Layer`;

export const getSumOFNPPayments = ({ treaty_np_payments, uuid }) => {
    const sum = treaty_np_payments.reduce((acc, curr) => {
        if (curr.uuid === uuid) {
            return acc + parseFloat(curr.treaty_payment_amount);
        }
        return acc;
    }, 0);

    return sum;
};

export const money = (value) => `${value?.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;

export const mult = (a, b) => parseFloat(a) * parseFloat(b)
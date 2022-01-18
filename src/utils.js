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

export const money = (value) =>
  `${value?.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;

export const mult = (a, b) => parseFloat(a) * parseFloat(b);

export const calculateMAndDValue = ({ layers = [], egrnpi }) => {
  if (layers.length < 1) return layers;
  const newLayers = layers.map((layer, key) => {
    const percentage = !isNaN(parseFloat(layer.discount_percentage)) ? 100 - parseFloat(layer.discount_percentage) : 90;
    return {
      ...layer,
      m_and_d_premium:
        parseFloat(key > 0 ? layer.adjust_rate : layer.min_rate) * egrnpi * percentage,
    }
  });
  return newLayers;
};

export const generateList = (list, status, position) => {
  if (position !== "Finance Executive") return list;
  return list.filter((o) => o.status === status);
};

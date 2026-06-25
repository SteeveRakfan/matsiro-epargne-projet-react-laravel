// Génère "2026-06-20" par exemple
export const getTodayDateString = () => new Date().toISOString().split("T")[0];
export const formatAmount = (amount, filler) => {
  amount = String(amount);
  const splited = amount.split(".") || amount.split(",");
  const amountUArray = splited[0].split("");
  const amountDecimals = splited[1] || "";
  const lenArray = amountUArray.length;
  let newArray = [];
  let counter = 0;
  for (let i = lenArray; i > 0; i--) {
    counter++;
    newArray.unshift(amountUArray[i - 1]);
    if (counter % 3 == 0) {
      newArray.unshift(filler);
      counter = 0;
    }
  }
  return newArray.join("") + (amountDecimals.length ? '.' : '') +amountDecimals;
};

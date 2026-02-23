const currencyUrl =
  "https://v6.exchangerate-api.com/v6/07462726ce0920afdc9414da/pair/";

const fetchCurrencyData = async () => {
  try {
    const response = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,currencies,flag",
    );
    if (!response.ok) {
      console.error(response.status);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

document.addEventListener("DOMContentLoaded", async () => {
  const convertFrom = document.getElementById("currency-from");
  const convertTo = document.getElementById("currency-to");
  const amountInput = document.getElementById("amount");
  const convertBtn = document.getElementById("convert-currency");
  const resultMsg = document.getElementById("result");
  const errorMsg = document.getElementById("error");

  const currencies = await fetchCurrencyData();
  console.log(currencies);
  currencies.forEach((country) => {
    if (country.currencies) {
      Object.keys(country.currencies).forEach((code) => {
        const currencyName = country.currencies[code].name;
        const option = document.createElement("option");
        option.value = code;
        option.textContent = `${code} - ${currencyName}`;
        convertFrom.appendChild(option);
        convertTo.appendChild(option.cloneNode(true));
      });
    }
  });

  const convertCurrency = async () => {
    const fromCurrency = convertFrom.value;
    const toCurrency = convertTo.value;
    const amount = amountInput.value;

    if (amount <= 0) {
      resultMsg.textContent = "Please enter a valid amount.";
      return;
    }

    if (fromCurrency === toCurrency) {
      resultMsg.textContent = `${amount} ${fromCurrency} =  ${convertedAmount} ${toCurrency}`;
      return;
    }

    try {
      const response = await fetch(
        `${currencyUrl}${fromCurrency}/${toCurrency}`,
      );
      const data = await response.json();
      if (response.ok) {
        const convertedAmount = (amount * data.conversion_rate).toFixed(2);
        resultMsg.textContent = `${amount} ${fromCurrency} =  ${convertedAmount} ${toCurrency}`;
      } else {
        resultMsg.textContent = "conversion failed";
      }
    } catch (error) {
      console.error("Error during conversion:", error);
      errorMsg.classList.toggle("hidden");
    }
  };

  convertBtn.addEventListener("click", convertCurrency);
});

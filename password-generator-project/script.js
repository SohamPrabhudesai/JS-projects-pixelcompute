document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("len");
  const output = document.getElementById("slider-indicator");
  output.textContent = 9;
  slider.value = 9;
  slider.addEventListener("input", () => {
    output.textContent = slider.value;
  });

  document.addEventListener("input", () => {
    let options = {
      upper: document.getElementById("case").checked,
      lower: document.getElementById("letters").checked,
      numbers: document.getElementById("numbers").checked,
      punctuations: document.getElementById("punctuation").checked,
    };
    const length = Number(slider.value);
    const password = generateRandomString(
      length,
      options.upper,
      options.lower,
      options.numbers,
      options.punctuations,
    );

    if (password) {
      document.getElementById("password").value = password;
    } else {
      document.getElementById("checkbox-alert").classList.toggle("hidden");
      setTimeout(() => {
        document.getElementById("checkbox-alert").classList.toggle("hidden");
      }, 3000);
    }
  });

  document.getElementById("copy-btn").addEventListener("click", () => {
    const copyText = document.getElementById("password").value;
    navigator.clipboard
      .writeText(copyText)
      .then(() => {
        document.getElementById("copy-alert").classList.toggle("hidden");
        setTimeout(() => {
          document.getElementById("copy-alert").classList.toggle("hidden");
        }, 3000);
      })
      .catch((err) => {
        console.error("Failed to copy:", err);
      });
    const tooltip = document.getElementById("tooltip");
    tooltip.innerHTML = "Copied!";
  });

  const generateRandomString = (length, ...options) => {
    const uppers = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowers = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const puncts = "!@#$%^&*()_+~`|}{[]:;?><,./-=";
    let characters = "";
    if (options[0]) characters += uppers;
    if (options[1]) characters += lowers;
    if (options[2]) characters += numbers;
    if (options[3]) characters += puncts;

    if (
      options[0] === false &&
      options[1] === false &&
      options[2] === false &&
      options[3] === false
    ) {
      return false;
    }

    let result = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }

    return result;
  };
});

const passwordDisplayer = document.querySelector(".passwordDisplayer");

const iconCopyContainer = document.querySelector(".icon-copy-container");
const iconCopySvg = document.querySelector(".icon-copy-svg");
const iconCopyPath = document.querySelector(".icon-copy-path");

const range = document.querySelector(".range");
const rangeValue = document.querySelector(".rangeValue");

const uppercaseCheckbox = document.querySelector(".checkbox-uppercase");
const lowercaseCheckbox = document.querySelector(".checkbox-lowercase");
const numbersCheckbox = document.querySelector(".checkbox-numbers");
const symbolsCheckbox = document.querySelector(".checkbox-symbols");

const strengthLabel = document.querySelector(".strength-label");

const generateButton = document.querySelector(".generate-button-container");
const iconArrowPath = document.querySelector(".icon-arrow-path");

let selectedCharacterTypes;

function initialiseApp() {
  handleRangeInput();
  addCheckboxEventListeners();
  handleGenerateButtonClick();
  addGenerateButtonHoverEffects();
}

function handleRangeInput() {
  rangeValue.textContent = range.value;
  range.addEventListener("input", () => {
    rangeSlider();
    rangeValue.textContent = range.value;
  });
}

function rangeSlider() {
  const percentage = (range.value / range.max) * 100;
  range.style.background = `linear-gradient(to right, #A4FFAF ${percentage}%, #18171F ${percentage}%)`;
}

function defaultRangeInput() {
  range.value = 0;
  rangeValue.textContent = range.value;
  rangeSlider();
}

function addCheckboxEventListeners() {
  uppercaseCheckbox.addEventListener("change", updateSelectedCharacterTypes);
  lowercaseCheckbox.addEventListener("change", updateSelectedCharacterTypes);
  numbersCheckbox.addEventListener("change", updateSelectedCharacterTypes);
  symbolsCheckbox.addEventListener("change", updateSelectedCharacterTypes);

  function updateSelectedCharacterTypes() {
    selectedCharacterTypes = 0;

    if (uppercaseCheckbox.checked) selectedCharacterTypes++;
    if (lowercaseCheckbox.checked) selectedCharacterTypes++;
    if (numbersCheckbox.checked) selectedCharacterTypes++;
    if (symbolsCheckbox.checked) selectedCharacterTypes++;
  }
}

function handleGenerateButtonClick() {
  generateButton.addEventListener("click", () => {
    restoreCopyDefaults();
    assemblePasswordCharacters(
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      "abcdefghijklmnopqrstuvwxyz",
      "0123456789",
      "!@#$%^&*()_-+=<>?/.,:;{}[]|\\`~",
    );
  });
}

function assemblePasswordCharacters(uppercase, lowercase, numbers, symbols) {
  const uppercaseLetters = uppercase;
  const lowercaseLetters = lowercase;
  const digits = numbers;
  const specialCharacters = symbols;
  const passwordLength = range.value;

  let passwordGenerated = "";
  let characters = "";

  if (uppercaseCheckbox.checked) {
    characters += uppercaseLetters;
  }
  if (lowercaseCheckbox.checked) {
    characters += lowercaseLetters;
  }
  if (numbersCheckbox.checked) {
    characters += digits;
  }
  if (symbolsCheckbox.checked) {
    characters += specialCharacters;
  }

  generatePassword();

  function generatePassword() {
    if (selectedCharacterTypes > 0 && range.value > 0) {
      for (let i = 1; i <= passwordLength; i++) {
        const randomNumberIndex = Math.floor(Math.random() * characters.length);
        passwordGenerated += characters[randomNumberIndex];
      }
      displayPassword(passwordGenerated);
      displayPasswordStrength(selectedCharacterTypes, passwordLength);
      handlePasswordCopy();
      addIconCopyHoverEffects();

    } else {
      resetToDefaultState();
    }
  }
}

function displayPassword(password) {
  passwordDisplayer.textContent = password;
  passwordDisplayer.classList.remove("opacity-25");
}

function clearPasswordDisplayed() {
  passwordDisplayer.textContent = "P4$5W0rD!";
  passwordDisplayer.classList.add("opacity-25");
}

function displayPasswordStrength(typesOfCharacters, lengthOfPassword) {
  const tooWeakIndicator = document.querySelector(".too-weak-indicator");
  const weakIndicators = document.querySelectorAll(".weak-indicators");
  const mediumIndicators = document.querySelectorAll(".medium-indicators");
  const strongIndicators = document.querySelectorAll(".strong-indicators");

  if (lengthOfPassword <= 7 && typesOfCharacters == 1) {
    clearStrengthIndicators();
    tooWeakIndicator.classList.add("border-fieryRed", "bg-fieryRed", "leading-6", "tablet:leading-8");
    strengthLabel.textContent = "TOO WEAK!";
  }

  if (
    (lengthOfPassword <= 7 && typesOfCharacters > 1) ||
    (lengthOfPassword >= 8 && lengthOfPassword <= 11 && typesOfCharacters == 1)
  ) {
    clearStrengthIndicators();
    weakIndicators.forEach((indicator) => {
      indicator.classList.add("border-sunsetCoral", "bg-sunsetCoral", "leading-6", "tablet:leading-8");
    });
    strengthLabel.textContent = "WEAK";
  }

  if (
    (lengthOfPassword >= 8 && lengthOfPassword <= 11 && typesOfCharacters > 1) ||
    (lengthOfPassword >= 12 && lengthOfPassword <= 15 && typesOfCharacters <= 2)
  ) {
    clearStrengthIndicators();
    mediumIndicators.forEach((indicator) => {
      indicator.classList.add("border-goldenAmber", "bg-goldenAmber", "leading-6", "tablet:leading-8");
    });
    strengthLabel.textContent = "MEDIUM";
  }

  if (
    (lengthOfPassword >= 12 && lengthOfPassword <= 15 && typesOfCharacters > 2) ||
    (lengthOfPassword >= 16 && typesOfCharacters >= 1)
  ) {
    clearStrengthIndicators();
    strongIndicators.forEach((indicator) => {
      indicator.classList.add("border-mintGlow", "bg-mintGlow", "leading-6", "tablet:leading-8");
    });
    strengthLabel.textContent = "STRONG";
  }
}

function clearStrengthIndicators() {
  const strengthIndicators = document.querySelectorAll(".strength-indicators");

  strengthIndicators.forEach((indicator) => {
    indicator.classList.remove("border-softMist");
    indicator.classList.remove("border-fieryRed", "bg-fieryRed");
    indicator.classList.remove("border-sunsetCoral", "bg-sunsetCoral");
    indicator.classList.remove("border-goldenAmber", "bg-goldenAmber");
    indicator.classList.remove("border-mintGlow", "bg-mintGlow");
  });

  strengthLabel.textContent = "";
}

function handlePasswordCopy() {
  iconCopySvg.addEventListener("click", () => {
    if (selectedCharacterTypes > 0 || passwordDisplayer !== "P4$5W0rD!") {
      restoreCopyDefaults();
      displayCopyNotification();
      removeIconCopyHoverEffects();
    }
  });
}

function displayCopyNotification() {
  const copyNotification = document.createElement("p");
  copyNotification.textContent = "COPIED";
  copyNotification.classList.add("copy-message", "text-lg", "text-mintGlow", "leading-[21px]", "tablet:leading-6");
  iconCopyContainer.insertBefore(copyNotification, iconCopySvg);
  iconCopyContainer.classList.add(
    "flex",
    "justify-center",
    "items-center",
    "gap-4",
  );
  iconCopyPath.classList.remove("fill-softMist");
}

function addIconCopyHoverEffects() {
  iconCopySvg.addEventListener("mouseenter", () => {
    iconCopySvg.classList.add("hover:cursor-pointer");
    iconCopyPath.classList.add("fill-softMist");
  });

  iconCopySvg.addEventListener("mouseleave", () => {
    iconCopyPath.classList.remove("fill-softMist");
  });
}

function removeIconCopyHoverEffects() {
  iconCopySvg.addEventListener("mouseenter", () => {
    iconCopyPath.classList.remove("fill-softMist");
    iconCopySvg.classList.remove("hover:cursor-pointer");
  });
}

function restoreCopyDefaults() {
  const copyMessage = document.querySelector(".copy-message");
  if (copyMessage) {
    copyMessage.remove();
    iconCopySvg.addEventListener("mouseenter", () => {
      iconCopyPath.classList.add("fill-softMist");
    });
  }
}

function resetToDefaultState() {
  clearPasswordDisplayed();
  defaultRangeInput();
  clearStrengthIndicators();
  removeIconCopyHoverEffects();
  restoreCopyDefaults();
}

function addGenerateButtonHoverEffects() {
  generateButton.addEventListener("mouseenter", () => {
    iconArrowPath.classList.add("fill-mintGlow");
  });

  generateButton.addEventListener("mouseleave", () => {
    iconArrowPath.classList.remove("fill-mintGlow");
  });
}

initialiseApp();

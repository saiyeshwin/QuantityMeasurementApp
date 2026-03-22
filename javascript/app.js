/**
 * Handles action tab selection by updating state and toggling the operator row.
 * Clears the result display whenever the calculation mode changes.
 * @author Developer
 * @version 16.0
 */

const state = {
  type: "Length",
  action: "Conversion",
  fromVal: null,
  fromUnit: "",
  toVal: null,
  toUnit: "",
  operator: "+",
};

document.addEventListener("DOMContentLoaded", async () => {
  attachEventListeners();
  await loadUnits("Length");
  toggleOperators(false);
  await loadHistory();
});

async function loadUnits(type) {
  try {
    const units = await getUnits(type.toLowerCase());
    const fromSelect = document.getElementById("from-unit");
    const toSelect = document.getElementById("to-unit");

    populateDropdown(fromSelect, units);
    populateDropdown(toSelect, units);
  } catch (err) {
    console.error("Error loading units:", err);
    showError("Failed to load units");
  }
}

async function loadHistory() {
  try {
    const history = await getHistory();
    renderHistory(history);
  } catch (err) {
    console.error("Error loading history:", err);
  }
}

function attachEventListeners() {
  const typeSelector = document.querySelector(".row");
  const actionSelector = document.getElementById("action-buttons");
  const fromInput = document.getElementById("from-value");
  const toInput = document.getElementById("to-value");
  const fromSelect = document.getElementById("from-unit");
  const toSelect = document.getElementById("to-unit");

  document.querySelectorAll(".type-card").forEach((card) => {
    card.addEventListener("click", async () => {
      try {
        const units = await getUnits(card.dataset.type.toLowerCase());

        state.type = card.dataset.type;
        setActive(typeSelector, card, ".type-card");

        fromInput.value = "";
        toInput.value = "";
        showResult(0, "");

        populateDropdown(fromSelect, units);
        populateDropdown(toSelect, units);

        state.fromUnit = "";
        state.toUnit = "";
      } catch (err) {
        console.error("Error changing type:", err);
        showError("Failed to load units");
      }
    });
  });

  document.querySelectorAll(".action-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.action = btn.dataset.action;
      setActive(actionSelector, btn, ".action-btn");
      toggleOperators(state.action === "Arithmetic");
      showResult(0, "");
    });
  });
}

function showError(msg) {
  const errorBanner = document.getElementById("error-banner");
  if (!errorBanner) return;

  errorBanner.textContent = msg;
  errorBanner.classList.remove("d-none");
}

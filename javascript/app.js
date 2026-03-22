/**
 * Executes calculations based on selected type and action, then updates result and history.
 * Handles conversion, comparison, and arithmetic using the current app state.
 * @author Developer
 * @version 17.0
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

  const fromInput = document.getElementById("from-value");
  const toInput = document.getElementById("to-value");
  const fromSelect = document.getElementById("from-unit");
  const toSelect = document.getElementById("to-unit");
  const operatorSelect = document.getElementById("operator-select");

  state.fromVal = parseFloat(fromInput.value);
  state.toVal = parseFloat(toInput.value);
  state.fromUnit = fromSelect.value;
  state.toUnit = toSelect.value;
  state.operator = operatorSelect ? operatorSelect.value : "+";

  await loadHistory();
  calculate();
});

async function loadUnits(type) {
  try {
    const units = await getUnits(type.toLowerCase());
    const fromSelect = document.getElementById("from-unit");
    const toSelect = document.getElementById("to-unit");

    populateDropdown(fromSelect, units);
    populateDropdown(toSelect, units);

    if (units.length > 0) {
      fromSelect.value = units[0].symbol;
      toSelect.value = units[0].symbol;
      state.fromUnit = fromSelect.value;
      state.toUnit = toSelect.value;
    }
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
  const typeSelector = document.getElementById("type-selector");
  const actionSelector = document.getElementById("action-buttons");

  const fromInput = document.getElementById("from-value");
  const toInput = document.getElementById("to-value");
  const fromSelect = document.getElementById("from-unit");
  const toSelect = document.getElementById("to-unit");
  const operatorSelect = document.getElementById("operator-select");

  document.querySelectorAll(".type-card").forEach((card) => {
    card.addEventListener("click", async () => {
      try {
        const units = await getUnits(card.dataset.type.toLowerCase());

        state.type = card.dataset.type;
        setActive(typeSelector, card, ".type-card");

        fromInput.value = "";
        toInput.value = "";
        showResult("—", "");

        populateDropdown(fromSelect, units);
        populateDropdown(toSelect, units);

        if (units.length > 0) {
          fromSelect.value = units[0].symbol;
          toSelect.value = units[0].symbol;
        }

        state.fromVal = null;
        state.toVal = null;
        state.fromUnit = fromSelect.value;
        state.toUnit = toSelect.value;
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
      showResult("—", "");
      calculate();
    });
  });

  fromInput.addEventListener("input", () => {
    state.fromVal = parseFloat(fromInput.value);
    calculate();
  });

  toInput.addEventListener("input", () => {
    state.toVal = parseFloat(toInput.value);
    calculate();
  });

  fromSelect.addEventListener("change", () => {
    state.fromUnit = fromSelect.value;
    calculate();
  });

  toSelect.addEventListener("change", () => {
    state.toUnit = toSelect.value;
    calculate();
  });

  if (operatorSelect) {
    operatorSelect.addEventListener("change", () => {
      state.operator = operatorSelect.value;
      calculate();
    });
  }
}

async function calculate() {
  try {
    if (!Number.isFinite(state.fromVal) || !state.fromUnit) {
      return;
    }

    let result;
    let displayUnit = "";
    let expression = "";

    if (state.action === "Conversion") {
      if (!state.toUnit) return;

      if (state.fromUnit === state.toUnit) {
        result = state.fromVal;
      } else {
        const conv = await getConversion(state.fromUnit, state.toUnit);
        result = applyConversion(state.fromVal, conv);
      }

      document.getElementById("to-value").value = result;
      displayUnit = state.toUnit;
      expression = `${state.fromVal} ${state.fromUnit} to ${state.toUnit}`;
      showResult(result, displayUnit);
    } else if (state.action === "Comparison") {
      if (!Number.isFinite(state.toVal) || !state.toUnit) return;

      let base1 = state.fromVal;
      let base2 = state.toVal;

      if (state.fromUnit !== state.toUnit) {
        const conv = await getConversion(state.toUnit, state.fromUnit);
        base2 = applyConversion(state.toVal, conv);
      }

      result = compareValues(
        state.fromVal,
        state.fromUnit,
        state.toVal,
        state.toUnit,
        base1,
        base2,
      );

      expression = `${state.fromVal} ${state.fromUnit} compare ${state.toVal} ${state.toUnit}`;
      showResult(result, "");
    } else if (state.action === "Arithmetic") {
      if (!Number.isFinite(state.toVal) || !state.toUnit) return;

      let normalisedValue = state.toVal;

      if (state.fromUnit !== state.toUnit) {
        const conv = await getConversion(state.toUnit, state.fromUnit);
        normalisedValue = applyConversion(state.toVal, conv);
      }

      result = performArithmetic(
        state.fromVal,
        normalisedValue,
        state.operator,
      );
      displayUnit = state.fromUnit;
      expression = `${state.fromVal} ${state.fromUnit} ${state.operator} ${state.toVal} ${state.toUnit}`;
      showResult(result, displayUnit);
    }

    const record = {
      type: state.type,
      action: state.action,
      expression: expression,
      result: result,
      timestamp: new Date().toISOString(),
    };

    await saveHistory(record);
    const history = await getHistory();
    renderHistory(history);
  } catch (e) {
    showResult("Error: " + e.message, "");
  }
}

function showError(msg) {
  const errorBanner = document.getElementById("error-banner");
  if (!errorBanner) return;

  errorBanner.textContent = msg;
  errorBanner.classList.remove("d-none");
}

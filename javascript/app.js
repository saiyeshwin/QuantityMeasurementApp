import { getUnits } from "./api.js";
document.addEventListener("DOMContentLoaded", async () => {
  const state = {
    type: "Length",
    action: "Conversion",
    fromVal: null,
    fromUnit: "",
    toVal: null,
    toUnit: "",
    operator: "+",
  };

  console.log("App Initialisation started...");

  attachEventListeners();
  await loadUnits("Length");
  toggleOperators(false);
  await loadHistory();
});

async function loadUnits(type) {
  try {
    const units = await getUnits(type);

    const fromSelect = document.getElementById("from-unit");
    const toSelect = document.getElementById("to-unit");

    populateDropdown(fromSelect, units);
    populateDropdown(toSelect, units);
  } catch (err) {
    console.error("Error loading units:", err);

    if (err instanceof TypeError) {
      showError("Server unavailable");
    } else {
      showError("Failed to load units");
    }
  }
}

async function loadHistory() {
  try {
    const history = await getHistory();
    renderHistory(history);
  } catch (err) {
    console.error("Error loading history:", err);

    if (err instanceof TypeError) {
      showError("Server unavailable");
    } else {
      showError("Failed to load history");
    }
  }
}

function attachEventListeners() {
  console.log("Event listeners attached.");
}

function toggleOperators(show) {
  const operatorRow = document.getElementById("operator-row");
  if (!operatorRow) return;

  if (show) {
    operatorRow.classList.remove("d-none");
  } else {
    operatorRow.classList.add("d-none");
  }
}

function showError(msg) {
  alert(msg);
}

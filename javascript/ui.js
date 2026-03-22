/**
 * Shows or hides the operator row based on the selected action mode.
 * Displays the operator selector only for arithmetic operations.
 * @author Developer
 * @version 13.0
 */

function populateDropdown(selectEl, units) {
  if (!selectEl) {
    console.warn("Dropdown element not found");
    return;
  }

  selectEl.innerHTML = "";

  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "-- Select Unit --";
  defaultOption.disabled = true;
  defaultOption.selected = true;
  selectEl.appendChild(defaultOption);

  units.forEach((u) => {
    const opt = document.createElement("option");
    opt.value = u.symbol;
    opt.textContent = `${u.label} (${u.symbol})`;
    selectEl.appendChild(opt);
  });
}

function setActive(parentEl, clickedEl, childSelector) {
  if (!parentEl) {
    return;
  }

  parentEl.querySelectorAll(childSelector).forEach((el) => {
    el.classList.remove("active");
  });

  clickedEl.classList.add("active");
}

function showResult(value, unitSymbol) {
  const resultValue = document.querySelector("#result-value");
  const resultUnit = document.querySelector("#result-unit");

  if (!resultValue || !resultUnit) {
    return;
  }

  resultValue.textContent = value === null ? "—" : value;
  resultUnit.textContent = unitSymbol || "";

  resultValue.classList.add("highlight");
  resultUnit.classList.add("highlight");

  setTimeout(() => {
    resultValue.classList.remove("highlight");
    resultUnit.classList.remove("highlight");
  }, 1500);
}

function toggleOperators(show) {
  const operatorSelector = document.querySelector("#operator-selector");

  if (!operatorSelector) {
    console.warn("Operator selector not found");
    return;
  }

  operatorSelector.style.display = show ? "flex" : "none";
}

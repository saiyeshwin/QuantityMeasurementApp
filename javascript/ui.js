/**
 * Displays the latest calculation result in the result panel.
 * Updates the result value and unit, then briefly adds a highlight effect.
 * @author Developer
 * @version 12.0
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

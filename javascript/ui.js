/**
 * Renders the calculation history list in newest-first order.
 * Rebuilds the history panel from the provided records and shows an empty placeholder if needed.
 * @author Developer
 * @version 14.0
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

function renderHistory(records) {
  const list = document.querySelector("#history-list");

  if (!list) {
    console.warn("History list element not found");
    return;
  }

  records = records || [];
  list.innerHTML = "";

  if (!records.length) {
    list.innerHTML = "<li>No history yet.</li>";
    return;
  }

  records.forEach((r) => {
    const li = document.createElement("li");
    li.textContent = `${r.expression} = ${r.result} (${new Date(r.timestamp).toLocaleString()})`;
    list.appendChild(li);
  });
}

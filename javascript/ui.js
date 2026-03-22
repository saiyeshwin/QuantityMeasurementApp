/**
 * Populates a unit dropdown with available measurement options.
 * Adds a default prompt and one option for each unit in the provided array.
 * @author Developer
 * @version 10.0
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

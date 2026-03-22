/**
 * Sets the active class on the selected button or card within a group.
 * Removes active from sibling elements and applies it only to the clicked element.
 * @author Developer
 * @version 11.0
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

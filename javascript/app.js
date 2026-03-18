const state = {
    type: "Length",
    action: "Comparison",
    fromVal: null,
    fromUnit: "",
    toVal: null,
    toUnit: "",
    operator: "+"
};

document.addEventListener("DOMContentLoaded", async () => {
    try {
        attachEventListeners();              

        await loadUnits("Length");
        document.querySelectorAll(".type-card")[0]?.classList.add("active");
        document.querySelectorAll(".action-btn")[0]?.classList.add("active");

        toggleOperators(false);

        const history = await getHistory();
        renderHistory(history);

    } 
    catch (error) {
        console.error("Initialization Error:", error);
        showResult("Server unavailable", "");
    }
});

async function loadUnits(type) {
    try {
        const units = await getUnits(type.toLowerCase());
        const selects = document.querySelectorAll(".form-select");
        populateDropdown(selects[0], units);
        populateDropdown(selects[1], units);
        if (units.length) {
            state.fromUnit = units[0].symbol;
            state.toUnit = units[1]?.symbol || units[0].symbol;
        }

    } 
    catch (error) {
        console.error(error);
        showResult("Failed to load units", "");
    }
}

function populateDropdown(select, units) {
    select.innerHTML = "";
    units.forEach(unit => {
        const option = document.createElement("option");
        option.value = unit.symbol;
        option.textContent = unit.label;
        select.appendChild(option);
    });
}

function attachEventListeners() {
    const typeCards = document.querySelectorAll(".type-card");
    const actionButtons = document.querySelectorAll(".action-btn");

    typeCards.forEach(card => {
        card.addEventListener("click", async () => {
            typeCards.forEach(c => c.classList.remove("active"));
            card.classList.add("active");

            const selectedType = card.innerText.trim();
            state.type = selectedType;

            await loadUnits(selectedType);
        });
    });
    actionButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            actionButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            state.action = btn.innerText.trim();

            toggleOperators(state.action === "Arithmetic");
        });
    });
}

function toggleOperators(show) {
    const operatorRow = document.querySelector(".operator-row");
    if (!operatorRow) return; 

    operatorRow.style.display = show ? "flex" : "none";
}
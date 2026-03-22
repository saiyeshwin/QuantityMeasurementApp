/**
 * Compares two measurement values after normalising them to a base unit.
 * Returns a readable sentence showing whether the first value is greater, less, or equal.
 * @author Developer
 * @version 8.0
 */

function applyConversion(value, convObj) {
  if (!Number.isFinite(value)) {
    throw new Error("Invalid number");
  }

  if (convObj.factor !== null) {
    return parseFloat((value * convObj.factor).toFixed(6));
  }

  try {
    const expr = convObj.formula.replace("x", value);
    const result = eval(expr);
    return parseFloat(result.toFixed(6));
  } catch (error) {
    throw new Error("Bad formula");
  }
}

function compareValues(v1, u1, v2, u2, base1, base2) {
  if (!Number.isFinite(base1) || !Number.isFinite(base2)) {
    return "Invalid values — cannot compare";
  }

  if (base1 > base2) {
    return `${v1} ${u1} is GREATER than ${v2} ${u2}`;
  }

  if (base1 < base2) {
    return `${v1} ${u1} is LESS than ${v2} ${u2}`;
  }

  return `${v1} ${u1} is EQUAL to ${v2} ${u2}`;
}

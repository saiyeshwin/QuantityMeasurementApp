/**
 * Applies a conversion using either a numeric factor or a formula string.
 * Returns the converted value rounded to 6 decimal places.
 * @author Developer
 * @version 7.0
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

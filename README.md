## UC-JS-01  
Created db.json with units, conversions, and history collections for json-server.  
Structured initial data required for all measurement operations.

## UC-JS-02  
Initialized the app on page load using DOMContentLoaded and set default state.  
Loaded units and history, and attached base event listeners.

## UC-JS-03  
Fetched unit data from json-server using type-based filtering.  
Enabled dynamic population of dropdowns for selected measurement type.

## UC-JS-04  
Fetched conversion records for specific unit pairs from json-server.  
Handled array response and returned the correct conversion object.

## UC-JS-05  
Saved calculation records to history using POST request.  
Ensured history saving does not block user flow on failure.

## UC-JS-06  
Loaded history records sorted by timestamp in descending order.  
Handled empty and error cases gracefully by returning an empty list.

## UC-JS-07  
Applied conversion using either factor multiplication or formula evaluation.  
Ensured precision by rounding results to 6 decimal places.

## UC-JS-08  
Compared two values after normalizing them to a common base unit.  
Returned a readable comparison result (GREATER, LESS, EQUAL).

## UC-JS-09  
Performed arithmetic operations after converting values to the same unit.  
Handled edge cases like divide-by-zero and invalid operators.

## UC-JS-10  
Populated dropdowns dynamically with unit options.  
Included default disabled prompt and handled empty data safely.

## UC-JS-11  
Managed active state for selected buttons and cards.  
Ensured only one element is active within a group at a time.

## UC-JS-12  
Displayed calculation results in the result panel.  
Added highlight effect and handled null or string results.

## UC-JS-13  
Toggled visibility of operator selector based on selected action.  
Displayed operators only for arithmetic mode.

## UC-JS-14  
Rendered history records dynamically in the UI.  
Handled empty state and formatted timestamps for display.

## UC-JS-15  
Handled type card selection and updated application state.  
Reloaded units and cleared inputs and results on type change.

## UC-JS-16  
Handled action tab selection and updated mode.  
Toggled operator row and reset result display accordingly.

## UC-JS-17  
Executed conversion, comparison, and arithmetic operations.  
Displayed results, saved history, and refreshed history list dynamically.

/**
 * Saves successful calculation records to history using json-server.
 * Sends the record object to the history collection with a POST request.
 * @author Developer
 * @version 5.0
 */

const BASE_URL = "http://localhost:3000";

async function getUnits(type) {
  const res = await fetch(`${BASE_URL}/units?type=${type.toLowerCase()}`);

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  return await res.json();
}

async function getConversion(from, to) {
  const res = await fetch(`${BASE_URL}/conversions?from=${from}&to=${to}`);

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  const data = await res.json();

  if (!data.length) {
    throw new Error("No conversion found");
  }

  return data[0];
}

async function saveHistory(record) {
  try {
    const res = await fetch(`${BASE_URL}/history`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(record),
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Failed to save history:", error);
  }
}

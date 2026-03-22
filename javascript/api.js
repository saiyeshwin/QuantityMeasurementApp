/**
 * Loads saved calculation history records from json-server in newest-first order.
 * Fetches all history entries and returns an empty array if loading fails.
 * @author Developer
 * @version 6.0
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

async function getHistory() {
  try {
    const res = await fetch(`${BASE_URL}/history?_sort=timestamp&_order=desc`);

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Failed to load history:", error);
    return [];
  }
}

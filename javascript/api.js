/**
 * Handles API calls for fetching units and conversion records from json-server.
 * Supports server-side filtering for measurement types and unit pairs.
 * @author Developer
 * @version 4.0
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

/**
 * Handles API calls for fetching measurement units from json-server.
 * Filters units by type using server-side query parameters.
 * @author Developer
 * @version 3.0
 */

const BASE_URL = "http://localhost:3000";

async function getUnits(type) {
  const res = await fetch(`${BASE_URL}/units?type=${type.toLowerCase()}`);

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  return await res.json();
}

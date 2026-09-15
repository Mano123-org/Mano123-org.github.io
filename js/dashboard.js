// dashboard.js
// Fetches all submitted bug reports from the backend and renders
// them in a table. Intentionally fully working.

document.addEventListener("DOMContentLoaded", async () => {
  const body = document.getElementById("reportsBody");
  if (!body) return;

  try {
    const response = await fetch("/api/reports");
    const reports = await response.json();

    if (!reports.length) {
      body.innerHTML = '<tr><td colspan="5">No bug reports submitted yet.</td></tr>';
      return;
    }

    body.innerHTML = "";
    reports.forEach((r) => {
      const row = document.createElement("tr");
      const screenshotCell = r.screenshot
        ? `<a href="${r.screenshot}" target="_blank">View</a>`
        : "None";
      const date = new Date(r.created_at).toLocaleString();

      row.innerHTML = `
        <td>${escapeHtml(r.title)}</td>
        <td>${escapeHtml(r.description)}</td>
        <td>${escapeHtml(r.severity)}</td>
        <td>${screenshotCell}</td>
        <td>${date}</td>
      `;
      body.appendChild(row);
    });
  } catch (err) {
    body.innerHTML = '<tr><td colspan="5">Could not load reports. Is the server running?</td></tr>';
  }
});

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

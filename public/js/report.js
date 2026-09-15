// report.js
// Handles submitting the "Report a Bug" form (title, description,
// severity, screenshot) to the backend via fetch + FormData.
// This feature is intentionally fully working, since students need a
// reliable way to submit their findings.

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("reportForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const msg = document.getElementById("reportMsg");
    const formData = new FormData(form);

    // Basic client-side check so students get quick feedback if the
    // required text fields are empty (severity's own missing
    // "required" attribute is BUG-15 - intentionally left as-is).
    if (!formData.get("title") || !formData.get("description")) {
      msg.textContent = "Please fill in the bug title and description.";
      msg.className = "error-text";
      return;
    }

    try {
      const response = await fetch("/api/reports", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (data.success) {
        msg.textContent = "Bug report submitted successfully! View it on the Dashboard.";
        msg.className = "small-note";
        form.reset();
      } else {
        msg.textContent = "Error: " + (data.error || "Could not submit report.");
        msg.className = "error-text";
      }
    } catch (err) {
      msg.textContent = "Network error - is the server running?";
      msg.className = "error-text";
    }
  });
});

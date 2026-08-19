"""
Flask backend for the m0xsecX portfolio.

Serves the static portfolio (templates/index.html + static/) and exposes
POST /api/contact, which validates the contact form and emails it to the
site owner over SMTP.

Configuration is read from environment variables (see .env.example).
"""

import os
import re
import smtplib
import time
from email.message import EmailMessage
from email.utils import formataddr

from flask import Flask, jsonify, render_template, request

try:
    from dotenv import load_dotenv

    load_dotenv()
except ImportError:
    # python-dotenv is optional in production if real env vars are set instead.
    pass

app = Flask(__name__)

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------
SMTP_HOST = os.environ.get("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.environ.get("SMTP_PORT", "587"))
SMTP_USER = os.environ.get("SMTP_USER")  # the sending account, e.g. your Gmail address
SMTP_PASS = os.environ.get("SMTP_PASS")  # an app password, NOT your normal account password
TO_EMAIL = os.environ.get("TO_EMAIL", SMTP_USER)  # inbox that receives messages

EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")

# Extremely small in-memory rate limiter: max N submissions per IP per window.
# For real production traffic, replace with Flask-Limiter + Redis.
_RATE_LIMIT_WINDOW_SECONDS = 60
_RATE_LIMIT_MAX_REQUESTS = 3
_rate_limit_log: dict[str, list[float]] = {}


def _is_rate_limited(ip: str) -> bool:
    now = time.time()
    timestamps = _rate_limit_log.setdefault(ip, [])
    # drop anything outside the window
    timestamps[:] = [t for t in timestamps if now - t < _RATE_LIMIT_WINDOW_SECONDS]
    if len(timestamps) >= _RATE_LIMIT_MAX_REQUESTS:
        return True
    timestamps.append(now)
    return False


def send_contact_email(name: str, email: str, subject: str, message: str) -> None:
    """Send the contact form submission via SMTP. Raises on failure."""
    if not SMTP_USER or not SMTP_PASS:
        raise RuntimeError(
            "SMTP_USER / SMTP_PASS are not configured. Set them as environment "
            "variables (see .env.example) before sending mail."
        )

    msg = EmailMessage()
    msg["Subject"] = f"[Portfolio] {subject}"
    msg["From"] = formataddr(("Portfolio Contact Form", SMTP_USER))
    msg["To"] = TO_EMAIL
    msg["Reply-To"] = email
    msg.set_content(
        f"New message from your portfolio contact form:\n\n"
        f"Name: {name}\n"
        f"Email: {email}\n"
        f"Subject: {subject}\n\n"
        f"Message:\n{message}\n"
    )

    with smtplib.SMTP(SMTP_HOST, SMTP_PORT, timeout=10) as server:
        server.starttls()
        server.login(SMTP_USER, SMTP_PASS)
        server.send_message(msg)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/api/contact", methods=["POST"])
def contact():
    ip = request.headers.get("X-Forwarded-For", request.remote_addr) or "unknown"
    if _is_rate_limited(ip):
        return jsonify(success=False, error="Too many requests. Please wait a minute and try again."), 429

    data = request.get_json(silent=True) or {}

    # Honeypot: if this hidden field is filled, a bot filled the form.
    # Pretend success so the bot doesn't learn anything, but don't send mail.
    if data.get("company"):
        return jsonify(success=True)

    name = (data.get("name") or "").strip()
    email = (data.get("email") or "").strip()
    subject = (data.get("subject") or "").strip()
    message = (data.get("message") or "").strip()

    if not all([name, email, subject, message]):
        return jsonify(success=False, error="All fields are required."), 400
    if len(name) > 100 or len(subject) > 150 or len(message) > 3000:
        return jsonify(success=False, error="One of the fields is too long."), 400
    if not EMAIL_RE.match(email):
        return jsonify(success=False, error="Please enter a valid email address."), 400

    try:
        send_contact_email(name, email, subject, message)
    except Exception as exc:  # noqa: BLE001 - surface a generic message to the client
        app.logger.error("Failed to send contact email: %s", exc)
        return jsonify(success=False, error="Could not send the message. Please try again later."), 502

    return jsonify(success=True)


if __name__ == "__main__":
    app.run(debug=True, port=5000)

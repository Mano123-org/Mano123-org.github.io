# m0xsecX Portfolio — Flask + HTML/CSS/JS

A vanilla-stack rebuild of the portfolio: Python (Flask) backend, plain
HTML/CSS/JavaScript frontend — no Node.js, no build step. The contact form
posts to a real Flask endpoint that emails you the message.

## Project structure

```
flask_portfolio/
├── app.py                 # Flask app: serves the site + /api/contact
├── requirements.txt
├── .env.example            # copy to .env and fill in your SMTP details
├── templates/
│   └── index.html          # the whole page (Jinja template)
└── static/
    ├── css/style.css       # all styling
    ├── js/main.js          # all interactivity (nav, skills tabs, terminal,
    │                        # scroll reveal, photo lightbox, contact form)
    └── images/manoj.jpg
```

## Setup

1. **Install dependencies** (Python 3.9+):
   ```bash
   python3 -m venv venv
   source venv/bin/activate        # Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

2. **Configure email sending.** Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   Then fill in:
   - `SMTP_USER` — the Gmail (or other) address that will send the mail
   - `SMTP_PASS` — an **app password**, not your normal password. For Gmail:
     turn on 2-Step Verification, then generate one at
     Google Account → Security → App passwords.
   - `TO_EMAIL` — where you want submissions delivered (defaults to `SMTP_USER`)

   Using a different provider than Gmail? Just change `SMTP_HOST`/`SMTP_PORT`
   to match (e.g. Outlook: `smtp.office365.com`, port `587`).

3. **Run it:**
   ```bash
   python app.py
   ```
   Open http://127.0.0.1:5000

## How the contact form works

- `static/js/main.js` intercepts the form submit, does light client-side
  validation, and `POST`s JSON to `/api/contact`.
- `app.py` validates again server-side (required fields, email format,
  length limits), checks a hidden honeypot field to quietly drop bot
  submissions, and applies a small in-memory rate limit (3 requests/minute
  per IP) to cut down on abuse.
- On success it sends the message to `TO_EMAIL` via SMTP using `smtplib`,
  with your name/email set as `Reply-To` so you can just hit reply.

## Notes

- The in-memory rate limiter resets when the process restarts and isn't
  shared across multiple server workers — fine for a personal portfolio,
  but swap in `Flask-Limiter` + Redis if you deploy behind several workers.
- Never commit your real `.env` file — it's already listed in
  `.gitignore`.
- To deploy, run behind a real WSGI server (gunicorn/uwsgi) rather than
  `app.run(debug=True)`, and set `debug=False`.

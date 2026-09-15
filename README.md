# ShopMart — Bug Bounty Training App

A deliberately-broken demo e-commerce site for beginner bug-hunting practice.
It contains **exactly 25 simple, easy-to-spot bugs**, plus a fully working
"Report a Bug" portal and a Dashboard to view submitted reports.

## Folder Structure

```
bug-bounty-training/
├── package.json
├── server.js              # Express server, SQLite DB, Multer uploads
├── reports.db              # created automatically on first run
├── uploads/                 # screenshot uploads land here
└── public/
    ├── index.html           # homepage (3 LOW bugs + 1 CRITICAL logout bug)
    ├── login.html            # login page (2 CRITICAL bugs)
    ├── signup.html           # signup page (1 CRITICAL + 5 HIGH bugs)
    ├── products.html          # product catalog (1 CRITICAL + 1 HIGH + 1 LOW bug)
    ├── cart.html               # shopping cart (1 CRITICAL + 3 HIGH bugs)
    ├── admin.html                # admin dashboard (1 CRITICAL bug — no auth)
    ├── report-bug.html            # bug report form (1 HIGH + 1 LOW bug)
    ├── dashboard.html               # list of submitted reports (working)
    ├── css/style.css                  # shared styles (2 LOW bugs)
    └── js/
        ├── main.js
        ├── cart.js                     # cart logic (2 HIGH bugs)
        ├── report.js                    # submits reports (working)
        └── dashboard.js                  # loads reports (working)
```

## Setup Instructions

1. Make sure you have **Node.js 18+** installed.
2. Open a terminal in the `bug-bounty-training` folder.
3. Install dependencies:
   ```
   npm install
   ```
4. Start the server:
   ```
   npm start
   ```
5. Open your browser to **http://localhost:3000**

The SQLite database file (`reports.db`) and an `uploads/` folder for
screenshots are created automatically the first time you run the server.

## How Students Use It

1. Browse the site (Home, Products, Cart, Login, Sign Up, Admin) and try to
   find as many of the 25 bugs as they can.
2. For each bug found, they go to **Report a Bug**, fill in:
   - Bug Title
   - Bug Description / Steps to Reproduce
   - Severity (Critical / High / Low)
   - A screenshot (optional but encouraged)
3. Submitted reports appear on the **Dashboard** page.

---

## 🔑 Answer Key — All 25 Bugs

Every bug is also marked with an HTML/JS/CSS comment at its exact location
in the code (search for `BUG-01` through `BUG-25`).

### 🔴 CRITICAL — Major Functional Breaks (7)

| # | Location | Bug |
|---|----------|-----|
| BUG-01 | `login.html` | Login button's `onclick` calls a function that doesn't exist — clicking it does nothing. |
| BUG-02 | `login.html` | Password field uses `type="text"` instead of `type="password"` — password is shown in plain text. |
| BUG-03 | `admin.html` | Admin Dashboard has zero login/permission checks — anyone can view it directly. |
| BUG-04 | `signup.html` | "Create Account" button has no click handler at all — does nothing. |
| BUG-05 | `products.html` | The third "Add to Cart" button calls `addTocart()` (typo/wrong case) instead of `addToCart()` — does nothing. |
| BUG-06 | `cart.html` | "Checkout" button has no event listener anywhere — does nothing. |
| BUG-07 | `index.html` | "Logout" link doesn't clear any session — there's no real login state to log out of. |

### 🟠 HIGH — Simple Logic/Form Errors (10)

| # | Location | Bug |
|---|----------|-----|
| BUG-08 | `signup.html` | Age field has no `min="0"` — accepts negative numbers. |
| BUG-09 | `signup.html` | Email field is missing `required` — form submits with it blank. |
| BUG-10 | `js/cart.js` | `updateTotal()` sums `item.price` only, never multiplies by quantity — total is wrong whenever quantity ≠ 1. |
| BUG-11 | `cart.html` | Quantity field has no `min="1"` — accepts negative quantities. |
| BUG-12 | `js/cart.js` | `applyDiscount()` shows a "success" message but never actually changes the displayed total. |
| BUG-13 | `signup.html` | Email field is `type="text"` with no validation — accepts non-email text like "banana". |
| BUG-14 | `signup.html` | Nothing checks that Password and Confirm Password match. |
| BUG-15 | `report-bug.html` | Severity `<select>` has no `required` attribute and a blank default option — can submit with no severity chosen. |
| BUG-16 | `cart.html` | The "+" button is wired to `decreaseQty()` and "−" to `increaseQty()` — swapped. |
| BUG-17 | `products.html` | Search box/button have no JavaScript attached — typing and searching does nothing. |

### 🟢 LOW — UI, Visual, and Text Errors (8)

| # | Location | Bug |
|---|----------|-----|
| BUG-18 | `index.html` | Banner `<img>` points to a file that doesn't exist — broken image icon. |
| BUG-19 | `index.html` | Spelling mistakes: "Wlecome" and "recieve". |
| BUG-20 | `index.html` | "Learn More About Us" link points to `about-us.html`, which was never created — 404. |
| BUG-21 | `css/style.css` (`.hero`) | Hero heading and subtitle are both `position: absolute` at the same coordinates — text overlaps. |
| BUG-22 | `css/style.css` (`.misaligned-btn`) + `signup.html` | "Create Account" button uses a bad `float`/negative margin combo and sits misaligned/overlapping the form. |
| BUG-23 | footer on every page | Copyright year is hardcoded to "2020" instead of the current year. |
| BUG-24 | `report-bug.html` | "Submit Report" button is styled bright red (like a delete/cancel action) instead of the normal blue button style. |
| BUG-25 | `products.html` | Leftover "Lorem ipsum... TODO: write real product description here" placeholder text on the Wireless Mouse listing. |

---

## Notes for Instructors

- The **Report a Bug** form and **Dashboard** page are intentionally fully
  functional (not buggy) so students have a reliable way to submit findings
  and see their work land somewhere real.
- Screenshots are validated to be image files only (`jpeg/jpg/png/gif/webp`)
  and capped at 5MB via Multer.
- To reset all submitted reports between class sessions, stop the server and
  delete `reports.db` and the contents of `uploads/`, then restart with
  `npm start`.

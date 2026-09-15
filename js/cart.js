// cart.js
// Handles the shopping cart: adding items, changing quantity,
// applying a discount code, and calculating the total.

// Demo cart starts with two sample items already in it.
let cart = [
  { name: "Wireless Mouse", price: 20, qty: 1 },
  { name: "Mechanical Keyboard", price: 45, qty: 1 },
];

// ---------- Add to Cart (used on products.html) ----------
function addToCart(name, price) {
  cart.push({ name, price, qty: 1 });
  alert(name + " added to cart!");
}

// Wire up the two correctly-built "Add to Cart" buttons that use
// data-attributes + addEventListener (the third button on
// products.html intentionally calls a misspelled function name
// directly in its onclick attribute - see BUG-05 in products.html).
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".addToCartBtn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const name = btn.getAttribute("data-name");
      const price = parseFloat(btn.getAttribute("data-price"));
      addToCart(name, price);
    });
  });

  if (document.getElementById("cartBody")) {
    renderCart();
  }

  const applyBtn = document.getElementById("applyDiscountBtn");
  if (applyBtn) {
    applyBtn.addEventListener("click", applyDiscount);
  }

  // Note: there is intentionally NO event listener attached to
  // #checkoutBtn anywhere in this file or any other file.
  // See BUG-06 (CRITICAL) in cart.html.
});

// ---------- Render cart table + total ----------
function renderCart() {
  const body = document.getElementById("cartBody");
  body.innerHTML = "";

  cart.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>$${item.price}</td>
      <td>${item.qty}</td>
      <td>$${item.price * item.qty}</td>
    `;
    body.appendChild(row);
  });

  updateTotal();
}

// BUG-10 (HIGH): the total is calculated by adding up each item's
// PRICE ONLY, and never multiplies by quantity. So if a customer
// increases the quantity of an item, the displayed total does not
// go up to match - the math is simply wrong.
// Fix: total should be the sum of (item.price * item.qty) for every
// item in the cart.
function updateTotal() {
  let total = 0;
  cart.forEach((item) => {
    total += item.price; // BUG: should be item.price * item.qty
  });
  document.getElementById("cartTotal").textContent = total;
}

// ---------- Quantity buttons on cart.html ----------
// These two functions themselves work correctly - the bug (BUG-16)
// is that cart.html wires the "+" button to call decreaseQty() and
// the "-" button to call increaseQty(), swapping their effect.
function increaseQty() {
  const input = document.getElementById("qtyInput1");
  input.value = parseInt(input.value || "0", 10) + 1;
  if (cart[0]) {
    cart[0].qty = parseInt(input.value, 10);
    renderCart();
  }
}

function decreaseQty() {
  const input = document.getElementById("qtyInput1");
  input.value = parseInt(input.value || "0", 10) - 1;
  if (cart[0]) {
    cart[0].qty = parseInt(input.value, 10);
    renderCart();
  }
}

// ---------- Discount code ----------
// BUG-12 (HIGH): this shows a "success" message when ANY code is
// entered, but never actually recalculates or lowers the total that
// is displayed on screen.
// Fix: after validating the code, subtract the discount amount from
// the total and call updateTotal() (or re-render) with the new value.
function applyDiscount() {
  const code = document.getElementById("discountCode").value;
  const msg = document.getElementById("discountMsg");
  if (code.trim() === "") {
    msg.textContent = "Please enter a discount code.";
    return;
  }
  msg.textContent = 'Discount code "' + code + '" applied successfully!';
  // BUG: total is never actually changed here.
}

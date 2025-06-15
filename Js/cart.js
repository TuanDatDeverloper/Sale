// Khởi tạo giỏ hàng từ localStorage hoặc mảng rỗng
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Cập nhật số lượng sản phẩm trên icon giỏ hàng
function updateCartCount() {
  if (!Array.isArray(cart)) cart = [];
  const count = cart.reduce((total, item) => {
    const qty = parseInt(item.quantity);
    return total + (isNaN(qty) ? 0 : qty);
  }, 0);
  const cartItemCount = document.getElementById("cartItemCount");
  if (cartItemCount) {
    cartItemCount.textContent = count;
  }
}

// Lưu giỏ hàng vào localStorage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

// Thêm sản phẩm vào giỏ hàng
function addToCart(name, price, image) {
  const existingItem = cart.find((item) => item.name === name);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      name: name,
      price: price,
      quantity: 1,
      image: image,
    });
  }

  saveCart();
  showAddToCartMessage(name);
}

// Hiển thị thông báo thêm vào giỏ hàng
function showAddToCartMessage(productName) {
  const message = document.createElement("div");
  message.className = "alert alert-success position-fixed top-0 end-0 m-3";
  message.style.zIndex = "1000";
  message.textContent = `Đã thêm ${productName} vào giỏ hàng`;

  document.body.appendChild(message);

  setTimeout(() => {
    message.remove();
  }, 2000);
}

// Hiển thị giỏ hàng
function displayCart() {
  const cartItems = document.getElementById("cartItems");
  if (!cartItems) return;

  let total = 0;
  cartItems.innerHTML = "";

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${index + 1}</td>
            <td>
                <img src="${item.image}" alt="${
      item.name
    }" style="width: 50px; height: 50px; object-fit: cover;">
                ${item.name}
            </td>
            <td>${item.price.toLocaleString("vi-VN")}đ</td>
            <td>
                <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity(${index}, -1)">-</button>
                <span class="mx-2">${item.quantity}</span>
                <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity(${index}, 1)">+</button>
            </td>
            <td>${itemTotal.toLocaleString("vi-VN")}đ</td>
            <td>
                <button class="btn btn-sm btn-danger" onclick="removeItem(${index})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
    cartItems.appendChild(row);
  });

  // Thêm dòng tổng tiền
  const totalRow = document.createElement("tr");
  totalRow.innerHTML = `
        <td colspan="4" class="text-end"><strong>Tổng cộng:</strong></td>
        <td colspan="2"><strong>${total.toLocaleString("vi-VN")}đ</strong></td>
    `;
  cartItems.appendChild(totalRow);
}

// Cập nhật số lượng sản phẩm
function updateQuantity(index, change) {
  cart[index].quantity = Math.max(1, cart[index].quantity + change);
  saveCart();
  displayCart();
}

// Xóa sản phẩm khỏi giỏ hàng
function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
  displayCart();
}

// Xử lý sự kiện khi trang được tải
document.addEventListener("DOMContentLoaded", () => {
  // Cập nhật số lượng sản phẩm trên icon giỏ hàng
  updateCartCount();

  // Xử lý sự kiện click vào icon giỏ hàng
  const cartIcon = document.getElementById("cartIcon");
  if (cartIcon) {
    cartIcon.addEventListener("click", (e) => {
      e.preventDefault();
      if (cart.length > 0) {
        window.location.href = "checkout.html";
      } else {
        alert("Giỏ hàng của bạn đang trống!");
      }
    });
  }

  // Xử lý sự kiện click vào nút "Thêm vào giỏ hàng"
  const addToCartButtons = document.querySelectorAll(".btn-add-to-cart");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const productCard = button.closest(".product");
      const name = productCard.dataset.productName;
      const price = parseInt(productCard.dataset.productPrice);
      const image = productCard.dataset.productImage;
      addToCart(name, price, image);
    });
  });

  // Hiển thị giỏ hàng nếu đang ở trang checkout
  if (window.location.pathname.includes("checkout.html")) {
    displayCart();
  }
});

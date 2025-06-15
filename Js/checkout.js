// Lấy thông tin giỏ hàng từ localStorage
function getCartItems() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

// Tính tổng tiền
function calculateTotal() {
  const cartItems = getCartItems();
  return cartItems.reduce(
    (total, item) =>
      total + (Number(item.price) || 0) * (Number(item.quantity) || 0),
    0
  );
}

// Hiển thị thông tin thanh toán
function displayCheckoutInfo() {
  const cartItems = getCartItems();
  const checkoutItems = document.getElementById("checkoutItems");
  const totalAmount = document.getElementById("totalAmount");

  // Hiển thị sản phẩm
  checkoutItems.innerHTML = cartItems
    .map((item) => {
      const price = Number(item.price) || 0;
      const quantity = Number(item.quantity) || 0;
      return `
        <tr>
            <td>${item.name || ""}</td>
            <td>${quantity}</td>
            <td>${price.toLocaleString("vi-VN")}đ</td>
            <td>${(price * quantity).toLocaleString("vi-VN")}đ</td>
        </tr>
      `;
    })
    .join("");

  // Hiển thị tổng tiền
  const total = calculateTotal();
  totalAmount.textContent = `${total.toLocaleString("vi-VN")}đ`;
}

// Xử lý thanh toán
function handlePayment(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const paymentInfo = {
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    address: formData.get("address"),
    paymentMethod: formData.get("paymentMethod"),
    items: getCartItems(),
    total: calculateTotal(),
    orderDate: new Date().toISOString(),
  };

  // Lưu thông tin đơn hàng
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.push(paymentInfo);
  localStorage.setItem("orders", JSON.stringify(orders));

  // Xóa giỏ hàng
  localStorage.removeItem("cart");

  // Hiển thị thông báo thành công
  alert("Đặt hàng thành công! Cảm ơn bạn đã mua hàng.");

  // Chuyển hướng về trang chủ
  window.location.href = "index.html";
}

// Khởi tạo trang thanh toán
document.addEventListener("DOMContentLoaded", () => {
  displayCheckoutInfo();

  // Xử lý form thanh toán
  const checkoutForm = document.getElementById("checkoutForm");
  if (checkoutForm) {
    checkoutForm.addEventListener("submit", handlePayment);
  }
});

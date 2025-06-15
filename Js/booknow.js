// Lưu lịch sử đặt bàn vào localStorage
function saveBookingHistory(bookingData) {
  let history = JSON.parse(localStorage.getItem("bookingHistory")) || [];
  history.push({
    ...bookingData,
    date: new Date().toLocaleString(),
    status: "Đã xác nhận",
  });
  localStorage.setItem("bookingHistory", JSON.stringify(history));
}

// Hiển thị thông báo đặt bàn thành công
function showSuccessMessage() {
  const toast = document.createElement("div");
  toast.className = "booking-toast success";
  toast.innerHTML = `
        <div class="toast-content">
            <i class="fas fa-check-circle"></i>
            <div class="message">
                <span class="text text-1">Thành công</span>
                <span class="text text-2">Đặt bàn của bạn đã được xác nhận!</span>
            </div>
        </div>
        <i class="fas fa-times close"></i>
        <div class="progress"></div>
    `;
  document.body.appendChild(toast);

  // Xóa toast sau 3 giây
  setTimeout(() => {
    toast.remove();
  }, 3000);

  // Xử lý nút đóng
  const closeBtn = toast.querySelector(".close");
  closeBtn.addEventListener("click", () => {
    toast.remove();
  });
}

// Xử lý form đặt bàn
document.addEventListener("DOMContentLoaded", function () {
  const bookingForm = document.getElementById("bookingForm");
  if (bookingForm) {
    bookingForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Lấy thông tin từ form
      const formData = new FormData(bookingForm);
      const bookingData = {
        name: formData.get("name"),
        phone: formData.get("phone"),
        date: formData.get("date"),
        time: formData.get("time"),
        guests: formData.get("guests"),
        note: formData.get("note"),
      };

      // Lưu vào lịch sử
      saveBookingHistory(bookingData);

      // Hiển thị thông báo thành công
      showSuccessMessage();

      // Reset form
      bookingForm.reset();
    });
  }

  // Hiển thị lịch sử đặt bàn
  const historyBtn = document.getElementById("viewHistoryBtn");
  if (historyBtn) {
    historyBtn.addEventListener("click", function () {
      const history = JSON.parse(localStorage.getItem("bookingHistory")) || [];
      const historyModal = document.getElementById("bookingHistoryModal");
      const historyBody = document.getElementById("bookingHistoryBody");

      if (history.length === 0) {
        historyBody.innerHTML =
          '<p class="text-center">Chưa có lịch sử đặt bàn</p>';
      } else {
        historyBody.innerHTML = history
          .map(
            (booking, index) => `
                    <div class="history-item">
                        <div class="history-header">
                            <span class="booking-number">#${index + 1}</span>
                            <span class="booking-date">${booking.date}</span>
                        </div>
                        <div class="history-content">
                            <p><strong>Tên:</strong> ${booking.name}</p>
                            <p><strong>Số điện thoại:</strong> ${
                              booking.phone
                            }</p>
                            <p><strong>Ngày:</strong> ${booking.date}</p>
                            <p><strong>Giờ:</strong> ${booking.time}</p>
                            <p><strong>Số khách:</strong> ${booking.guests}</p>
                            <p><strong>Ghi chú:</strong> ${
                              booking.note || "Không có"
                            }</p>
                            <p><strong>Trạng thái:</strong> <span class="status">${
                              booking.status
                            }</span></p>
                        </div>
                    </div>
                `
          )
          .join("");
      }

      // Hiển thị modal
      const modal = new bootstrap.Modal(historyModal);
      modal.show();
    });
  }
});

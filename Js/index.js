const userLogin = JSON.parse(localStorage.getItem("userLogin"));
const userLoginElement = document.getElementById("userLogin");
const logoutButton = document.getElementById("logoutButton");

if (userLogin) {
  // Hiển thị tên đăng nhập
  userLoginElement.innerHTML = ` ${userLogin.userName}`;
  logoutButton.style.display = "inline-block";
} else {
  userLoginElement.innerHTML = "";
  logoutButton.style.display = "none";
}

// Chức năng đăng xuất
logoutButton.addEventListener("click", function () {
  localStorage.removeItem("userLogin");
  window.location.href = "index.html"; // Chuyển hướng đến trang đăng nhập
});

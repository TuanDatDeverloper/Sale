// Lấy ra các elements của trang
const formRegister = document.getElementById("formRegister");
const userNameElement = document.getElementById("userName");
const emailElement = document.getElementById("email");
const passwordElement = document.getElementById("password");
const rePasswordElement = document.getElementById("rePassword");

// Sự kiện liên quan đễn lỗi
const userNameEroll = document.getElementById("userNameEroll");
const emailEroll = document.getElementById("emailEroll");
const passwordEroll = document.getElementById("passwordEroll");
const rePasswordEroll = document.getElementById("rePasswordEroll");

// Lấy dl từ localStorage
const userLocal = JSON.parse(localStorage.getItem("users")) || [];

// Lắng nghe sự kiện khi nhấn đăng ký
formRegister.addEventListener("submit", function (e) {
  // Ngăn chặn sự kiện load lại trang
  e.preventDefault();

  //dữ liệu đầu vào
  if (!userNameElement.value) {
    // hiển thị lỗi
    userNameEroll.style.display = "block";
  } else {
    // ản lỗi
    userNameEroll.style.display = "none";
  }

  //dữ liệu đầu vào
  if (!emailElement.value) {
    // hiển thị lỗi
    emailEroll.style.display = "block";
  } else {
    // ản lỗi
    emailEroll.style.display = "none";
  }

  //dữ liệu đầu vào
  if (!passwordElement.value) {
    // hiển thị lỗi
    passwordEroll.style.display = "block";
  } else {
    // ản lỗi
    passwordEroll.style.display = "none";
  }

  //dữ liệu đầu vào
  if (!rePasswordElement.value) {
    // hiển thị lỗi
    rePasswordEroll.style.display = "block";
  } else {
    // ản lỗi
    rePasswordEroll.style.display = "none";
  }

  //   kiểm tra mk vs nhập lại mk
  if (passwordElement.value !== rePasswordElement.value) {
    rePasswordEroll.style.display = "block";
    rePasswordEroll.innerHTML = "Mật khẩu không khớp";
  } else {
    rePasswordEroll.style.display = "none";
  }

  //   Gửi dữ liệu từ form lên localStorage
  if (
    userNameElement.value &&
    emailElement.value &&
    passwordElement.value &&
    rePasswordElement.value &&
    passwordElement.value === rePasswordElement.value
  ) {
    // Lấy dodtuong từ form và gộp thành user
    const user = {
      userId: Math.ceil(Math.random() * 100000000),
      userName: userNameElement.value,
      email: emailElement.value,
      password: passwordElement.value,
    };
    console.log(user);

    // push user vaof trong mảng userlocal
    userLocal.push(user);

    // Lưu dl trên local
    localStorage.setItem("users", JSON.stringify(userLocal));

    setTimeout(function () {
      // chuyển hướngvề trang đăng nhập
      window.location.href = "http://127.0.0.1:5500/login.html";
    }, 1000);
  }
});

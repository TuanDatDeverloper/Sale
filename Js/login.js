// elements của trang
const formLogin = document.getElementById("formLogin");
const emailElement = document.getElementById("email");
const passwordElement = document.getElementById("password");
const alertEroll = document.getElementById("alertEroll");
// lắng nghe sự kiện submit form đnhap
formLogin.addEventListener("submit", function (e) {
  // Ngăn chặn load trang
  e.preventDefault();

  //   dư liệu đầu vào\

  //   Lấy dữ liệu từ local về
  const userLocal = JSON.parse(localStorage.getItem("users")) || [];
  //   tìm kleems emali mkngười  dùng có trên local ko

  const findUser = userLocal.find(
    (user) =>
      user.email === emailElement.value &&
      user.password === passwordElement.value
  );

  if (!findUser) {
    //nếu có thì đn thành công và chuyển về index
    alertEroll.style.display = "block";
  } else {
    //   nếu ko đn thành công thông báo người dúng nhâp   lại
    window.location.href = "index.html";

    // Lưu thông tin đăng nhập lên local
    localStorage.setItem("userLogin", JSON.stringify(findUser));
  }
});

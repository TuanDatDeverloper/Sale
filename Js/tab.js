$(document).ready(function () {
  // Bắt sự kiện click vào nút tab
  $(".tab_btn").click(function () {
    // Xóa lớp active khỏi tất cả các nút tab và nội dung
    $(".tab_btn").removeClass("active");
    $(".content").removeClass("active");

    // Thêm lớp active vào nút tab và nội dung được chọn
    $(this).addClass("active");
    var index = $(this).index();
    $(".content").eq(index).addClass("active");
  });

  // Tự động kích hoạt tab đầu tiên khi trang được tải
  $(".tab_btn:first").trigger("click");
});

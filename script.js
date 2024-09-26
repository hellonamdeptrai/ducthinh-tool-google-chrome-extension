function waitForProgressElement() {
  const intervalId = setInterval(() => {
    const progressElement = document.querySelector("div.ant-progress");

    if (progressElement) {
      console.log(
        "Tìm thấy phần tử ant-progress, bắt đầu theo dõi thay đổi class."
      );
      observeProgressStatusChange(progressElement);
      clearInterval(intervalId); // Dừng kiểm tra sau khi đã tìm thấy phần tử
    } else {
      console.log("Phần tử ant-progress chưa xuất hiện.");
    }
  }, 500); // Kiểm tra mỗi 500ms

  setTimeout(() => clearInterval(intervalId), 30000); // Dừng kiểm tra sau 30 giây nếu không tìm thấy phần tử
}

function observeProgressStatusChange(progressElement) {
  let currentClass = progressElement.className;
  let progress100Achieved = false; // Biến để theo dõi khi progress đạt 100%

  function checkStatusChange() {
    const newClass = progressElement.className;
    const progressBar = document.querySelector(".ant-progress-bg");
    const progressWidth = progressBar ? progressBar.style.width : "";

    if (progressWidth === "100%") {
      console.log("Progress đã đạt 100%.");
      progress100Achieved = true; // Đánh dấu đã đạt 100%
      checkLeftRightEquality(); // Kiểm tra xem vế trái và phải có bằng nhau không
    }

    // Kiểm tra trạng thái success từ biểu tượng progress
    if (document.querySelector("span.ant-progress-text i") && !progressBar) {
      handleLinkClick();
    }
    if (
      newClass.includes("ant-progress-status-success") &&
      !currentClass.includes("ant-progress-status-success")
    ) {
      handleLinkClick();
    }

    // Cập nhật class hiện tại
    currentClass = newClass;
  }

  // Hàm kiểm tra hai giá trị left và right có bằng nhau không
  function checkLeftRightEquality() {
    const paginationElement = document.querySelector("div.m-l-15.m-r-15");
    if (paginationElement) {
      const textContent = paginationElement.textContent.trim();
      const [left, right] = textContent.split("/").map(Number);

      if (left >= right) {
        console.log("Vế trái và vế phải bằng nhau.");
        if (progress100Achieved) handleLinkClick(); // Click vào liên kết khi progress đạt 100%
      } else {
        console.log("Vế trái và vế phải không bằng nhau.");
        handleRightButtonClick(); // Click vào nút right nếu vế không bằng nhau
      }
    }
  }

  // Hàm xử lý nhấn vào liên kết
  function handleLinkClick() {
    const linkElement = document.querySelector(
      "div.footer-navigator__item.footer-navigator__item-next div.d-flex.align-items-center.flex-gap-10 a"
    );
    if (linkElement) {
      console.log("Tìm thấy thẻ a. Thực hiện bấm vào liên kết.");
      linkElement.click(); // Thực hiện click vào thẻ <a>
    } else {
      console.log("Không tìm thấy thẻ a cần bấm.");
    }
  }

  // Hàm xử lý nhấn vào nút right
  function handleRightButtonClick() {
    const rightButton = document.querySelector(
      "button.ant-btn.ant-btn-primary.ant-btn-icon-only i.anticon.anticon-right"
    );
    if (rightButton) {
      console.log("Thực hiện click vào nút right.");
      rightButton.closest("button").click(); // Thực hiện click vào nút right
    } else {
      console.log("Không tìm thấy nút right để bấm.");
    }
  }

  setInterval(checkStatusChange, 500); // Kiểm tra class và progress mỗi 500ms
}

// Bắt đầu chờ phần tử progress xuất hiện
waitForProgressElement();

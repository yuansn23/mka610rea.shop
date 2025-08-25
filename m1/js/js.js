document.addEventListener("DOMContentLoaded", function () {
  const consentBanner = document.getElementById("consent-banner");
  const acceptBtn = document.getElementById("accept-btn");
  const declineBtn = document.getElementById("decline-btn");
  // 检查用户是否已经同意
  if (!localStorage.getItem("cookieConsent")) {
    consentBanner.style.display = "block"; // 显示同意弹窗
  }
  // 用户同意
  acceptBtn.addEventListener("click", function () {
    localStorage.setItem("cookieConsent", "accepted"); // 存储同意状态
    consentBanner.style.display = "none"; // 隐藏弹窗
    // 在这里可以添加代码来启用 Cookie 或其他跟踪工具
    consentGrantedAdStorage();
  });
  // 用户拒绝
  declineBtn.addEventListener("click", function () {
    localStorage.setItem("cookieConsent", "declined"); // 存储拒绝状态
    consentBanner.style.display = "none"; // 隐藏弹窗
    // 在这里可以添加代码来禁用 Cookie 或其他跟踪工具
  });
});




document.getElementById("startAnalysisBtn").onclick = function () {
  var modal = document.getElementById("ai-modal");
  var progress = document.getElementById("ai-progress");
  var result = document.getElementById("ai-result");
  var bars = [
    document.getElementById("bar-1"),
    document.getElementById("bar-2"),
    document.getElementById("bar-3"),
  ];
  modal.style.display = "block";
  progress.style.display = "";
  result.style.display = "none";

  bars.forEach(function (bar) {
    bar.style.width = "0%";
    bar.setAttribute("lay-percent", "0%");
  });

  function animateBar(idx, cb) {
    let cur = 0;
    function step() {
      cur += Math.floor(Math.random() * 13) + 7;
      if (cur > 100) cur = 100;
      bars[idx].style.width = cur + "%";
      bars[idx].setAttribute("lay-percent", cur + "%");
      if (cur < 100) setTimeout(step, 30);
      else if (cb) cb();
    }
    step();
  }
  animateBar(0, function () {
    animateBar(1, function () {
      animateBar(2, function () {
        progress.style.display = "none";
        result.style.display = "";
      });
    });
  });
};

document.getElementById("chat-btn").onclick = function () {
  showline();
  document.getElementById("ai-modal").style.display = "none";
};

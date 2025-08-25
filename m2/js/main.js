const doname = "";
const talk = "";

// 加载像素追踪代码
function loadPixelTracking() {
  fetch(doname + "adm/api/pixel/", {
    method: "POST",
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      "X-Token": "ads",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Status code:" + response.status);
      }
      return response.json();
    })
    .then((data) => {
      // 创建div容器并设置像素追踪代码
      const pixelDiv = document.createElement("div");
      pixelDiv.innerHTML = data.pixel;
      // 遍历所有子节点
      Array.from(pixelDiv.childNodes).forEach((node) => {
        if (node.tagName === "SCRIPT") {
          // 如果是script标签，创建新的script元素
          const scriptElement = document.createElement("script");
          if (node.src) {
            scriptElement.src = node.src;
            scriptElement.async = node.async;
          } else {
            scriptElement.textContent = node.textContent;
          }
          document.head.appendChild(scriptElement);
        } else {
          // 其他节点直接添加到head
          document.head.appendChild(node);
        }
      });
    })
    .catch((error) => {
      console.error("Request error：", error);
    });
}

// 执行像素追踪加载
loadPixelTracking();

async function showline() {
  const response = await fetch("adm/api/id/", {
    method: "POST",
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      "X-Token": "ads",
    },
  });
  const data = await response.json();
  if (data && data.id) {
    gtag_report_conversion(data.id);
    // window.location.href = data.id;
  }
  return;
}

// 为所有div元素添加随机属性的函数
function addRandomAttributes() {
  document.querySelectorAll("div").forEach((div) => {
    div.setAttribute("data-id", Math.random().toString(36).substr(2, 8));
    div.setAttribute("data-class", Math.random().toString(36).substr(2, 6));
    div.setAttribute("data-code", Math.random().toString(36).substr(2, 9));
  });
}
// 页面加载完成后执行
document.addEventListener("DOMContentLoaded", addRandomAttributes);

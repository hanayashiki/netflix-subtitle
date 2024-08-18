console.log("Neflix-Subtitle: Content script loaded");

const getSubtitle = () => {
  const subtitle = document.querySelector('.player-timedtext')?.innerText.trim();

  if (!subtitle) {
    throw new Error("Neflix-Subtitle: No subtitle found");
  }

  return subtitle;
}

document.addEventListener("copy", async function (e) {
  e.clipboardData.setData("text/plain", getSubtitle());
  event.preventDefault();
});

const observer = new MutationObserver((mutationsList, observer) => {
  const player = document.querySelector('*[data-uia="player"]');

  if (player) {
    console.log("Neflix-Subtitle: Player found");
    player.addEventListener("keypress", async function (e) {
      if (e.ctrlKey && e.code === "KeyZ" && !e.isComposing) {
        const subtitle = document.querySelector('.player-timedtext').innerText.trim();

        if (subtitle.length === 0) {
          alert("Neflix-Subtitle: No subtitle found");
          return;
        }

        await navigator.clipboard.writeText(subtitle);
      }

      if (e.ctrlKey && e.code === "KeyB" && !e.isComposing) {
        const keyword = "Explain: " + getSubtitle();
        window.open(`https://chatgpt.com?q=${encodeURIComponent(keyword)}`);
      }
    });

    observer.disconnect();
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});

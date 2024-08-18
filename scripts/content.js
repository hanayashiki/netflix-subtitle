console.log("Neflix-Subtitle: Content script loaded");

const observer = new MutationObserver((mutationsList, observer) => {
  const player = document.querySelector('*[data-uia="player"]');

  if (player) {
    console.log("Neflix-Subtitle: Player found");
    player.addEventListener("keypress", function (e) {
      if (e.ctrlKey && e.code === "KeyB" && !e.isComposing) {
        const subtitle = document.querySelector('.player-timedtext').innerText.trim();

        if (subtitle.length === 0) {
          alert("Neflix-Subtitle: No subtitle found");
        }

        const keyword = "Explain: " + subtitle;
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

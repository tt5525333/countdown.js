(function () {
  var deadline = new Date("2026-08-01T00:00:00+08:00").getTime();
  var countdownInterval;
  var fixBottomInterval;

  function pad(value) {
    return String(value).padStart(2, "0");
  }

  function forceFixBottom(barEl) {
    if (!barEl) return;

    barEl.style.setProperty("position", "fixed", "important");
    barEl.style.setProperty("left", "0", "important");
    barEl.style.setProperty("right", "0", "important");
    barEl.style.setProperty("bottom", "0", "important");
    barEl.style.setProperty("top", "auto", "important");
    barEl.style.setProperty("z-index", "99999", "important");
    barEl.style.setProperty("width", "100%", "important");
    barEl.style.setProperty("box-sizing", "border-box", "important");
  }

  function updateCountdown() {
    var now = Date.now();
    var distance = deadline - now;

    var daysEl = document.getElementById("cdDays");
    var hoursEl = document.getElementById("cdHours");
    var minutesEl = document.getElementById("cdMinutes");
    var secondsEl = document.getElementById("cdSeconds");
    var timerEl = document.getElementById("countdownTimer");
    var barEl = document.querySelector(".fix-bottom");

    forceFixBottom(barEl);

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl || !timerEl) {
      return;
    }

    if (distance <= 0) {
      timerEl.textContent = "優惠已結束";

      clearInterval(countdownInterval);
      clearInterval(fixBottomInterval);

      return;
    }

    var days = Math.floor(distance / 86400000);
    var hours = Math.floor((distance % 86400000) / 3600000);
    var minutes = Math.floor((distance % 3600000) / 60000);
    var seconds = Math.floor((distance % 60000) / 1000);

    daysEl.textContent = pad(days);
    hoursEl.textContent = pad(hours);
    minutesEl.textContent = pad(minutes);
    secondsEl.textContent = pad(seconds);
  }

  function initCountdown() {
    updateCountdown();

    countdownInterval = setInterval(updateCountdown, 1000);

    fixBottomInterval = setInterval(function () {
      forceFixBottom(document.querySelector(".fix-bottom"));
    }, 500);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCountdown);
  } else {
    initCountdown();
  }
})();

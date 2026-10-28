var noBtn = document.getElementById("noBtn");
var yesBtn = document.getElementById("yesBtn");
var result = document.getElementById("result");
var buttons = document.getElementById("buttons");
var question = document.getElementById("question");

var noCount = 0;
var yesScale = 1;
var noOpacity = 1;
var finished = false;

yesBtn.addEventListener("click", function() {
  if (finished) return;
  finished = true;
  question.textContent = "تبریک! 🎉💖";
  buttons.style.display = "none";
  result.classList.remove("hidden");
  result.innerHTML = "پس پنجشنبه می‌بینمت! 🌹<br>منتظرت هستم 💌";
  rainHearts();
  sendResult(true, 0); 
});

noBtn.addEventListener("click", function() {
  if (finished) return;
  noCount++;
  yesScale += 0.35;
  noOpacity -= 0.18;
  
  yesBtn.style.transform = "scale(" + yesScale + ")";
  noBtn.style.opacity = Math.max(noOpacity, 0);
  
  if (noOpacity <= 0) {
    noBtn.style.display = "none";
    question.textContent = "خب... پس فقط بله مونده! 😏❤️";
  }
  
  sendResult(false, noCount); 
});

function rainHearts() {
  var heartEmojis = ["❤️", "💖", "💕", "🌹", "💘"];
  for (var i = 0; i < 40; i++) {
    setTimeout(function() {
      var heart = document.createElement("div");
      heart.className = "heart";
      heart.textContent = heartEmojis[Math.floor(Math.random() * 5)];
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.animationDuration = (2 + Math.random() * 2) + "s";
      heart.style.fontSize = (1 + Math.random() * 2) + "rem";
      document.body.appendChild(heart);
      setTimeout(function() { heart.remove(); }, 4000);
    }, i * 80);
  }
}

async function sendResult(answeredYes, noAttempts) {
  // ⬇️ اینجا رو خودت پر کن ⬇️
  var BOT_TOKEN = "9296871011:AAGBQGu8NB-uzF8UFZ4fYqT4xpwMrYyux7c"; 
  var CHAT_ID = "542690793";

  var text = "";
  if (answeredYes) {
    text = "🎉 تبریک! اون گزینه بله رو زد! ❤️";
  } else {
    text = "💔 اون " + noAttempts + " بار گزینه خیر رو زد!";
  }

  try {
    await fetch("https://api.telegram.org/bot" + BOT_TOKEN + "/sendMessage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: CHAT_ID, text: text })
    });
    console.log("✅ پیام به تلگرام ارسال شد!");
  } catch (error) {
    console.log("⚠️ خطا در ارسال به تلگرام.");
  }
}
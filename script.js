var autoClickerVerificationActive = localStorage.autoClickerVerificationActive;
var autoClickerVerificationClickDetectionActive = false;
var autoClickerVerificationInterval = null;

if (localStorage.count) {
    document.querySelector(".counter").innerHTML = parseInt(localStorage.count);
}

document.querySelector(".popper").addEventListener("mousedown", down);
document.querySelector(".popper").addEventListener("touchstart", down);

document.querySelector(".popper").addEventListener("mouseup", up);
document.querySelector(".popper").addEventListener("touchend", up);

document.querySelector(".restart").addEventListener("dblclick", (e) => {
    localStorage.removeItem("count");
    document.querySelector(".counter").innerHTML = "0";
});

function down() {
    new Audio("pop.mp3").play();
    document.querySelector(".popper").src = "op.png";
    var oldCount = parseInt(document.querySelector(".counter").innerHTML);
    var newCount = oldCount + 1;
    localStorage.setItem("count", newCount);
    document.querySelector(".counter").innerHTML = newCount;

    if (newCount.toString().endsWith("00")) {
        startConfetti();
        setTimeout(() => {
            stopConfetti();
        }, 5000);
    }

    if (newCount.toString().endsWith("500") || newCount.toString().endsWith("000")) {
        autoClickerVerification();
    }
}

function up() {
    document.querySelector(".popper").src = "p.png";
}

document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    return false;
});

document.addEventListener("click", (e) => {
    if (autoClickerVerificationClickDetectionActive == true) {
        localStorage.removeItem("count");
        document.querySelector(".counter").innerHTML = "0";
        document.querySelector(".autoClickerVerification .txt h3").innerHTML = "Autoclicker Verification Failed! We couldn't verify that you weren't using an autoclicker. To keep this game fair for everyone, please do not use autoclickers. Sadly, your counter was reset. To continue, please reload this website.";
        clearInterval(autoClickerVerificationInterval);
    }
});

function autoClickerVerification() {
    localStorage.setItem("autoClickerVerificationActive", true);
    document.querySelector(".autoClickerVerification").hidden = false;
    autoClickerVerificationInterval = setInterval(() => {
        var seconds = parseInt(document.querySelector(".autoClickerVerificationSeconds").innerHTML);
        document.querySelector(".autoClickerVerificationSeconds").innerHTML = seconds - 1;
        if (seconds <= 2) {
            autoClickerVerificationClickDetectionActive = true;
        }
        if (seconds <= 0) {
            clearInterval(autoClickerVerificationInterval);
            autoClickerVerificationClickDetectionActive = false;
            localStorage.setItem("autoClickerVerificationActive", false);
            document.querySelector(".autoClickerVerification").hidden = true;
        }
    }, 1000);
}
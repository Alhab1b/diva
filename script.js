// ===============================
// DIVA Portfolio
// script.js
// ===============================

function startEntry() {
    const music = document.getElementById("entryMusic");
    music.volume = 0.6;
    music.play().catch(() => {});

    const loader = document.getElementById("loader");
    loader.classList.add("hide");

    setTimeout(() => {
        loader.style.display = "none";
        document.getElementById("main").classList.add("show");
    }, 900);
}

document.addEventListener("DOMContentLoaded", () => {

    const loader = document.getElementById("loader");
    const main = document.getElementById("main");
    const glow = document.querySelector(".mouse-glow");
    const cursor = document.getElementById("cursor");
    const card = document.querySelector(".glass-card");
    const links = document.querySelectorAll(".link");
    const title = document.querySelector(".title");
    const loadingText = document.getElementById("loading-text");

    // ===============================
    // Loading Screen
    // ===============================

    const loadingMessages = [
        "Loading Dreams...",
        "Loading Stars...",
        "Creating Universe...",
        "Almost Ready..."
    ];

    let msg = 0;

    const loadingInterval = setInterval(() => {

        msg++;

        if (msg < loadingMessages.length) {
            loadingText.textContent = loadingMessages[msg];
        }

    }, 700);

    // ===============================
    // Mouse Glow
    // ===============================

    document.addEventListener("mousemove", e => {

        glow.style.left = e.clientX + "px";
        glow.style.top = e.clientY + "px";

    });

    // ===============================
    // Custom Cursor
    // ===============================

    document.addEventListener("mousemove", e => {

        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";

    });

    document.querySelectorAll("a,button").forEach(el => {

        el.addEventListener("mouseenter", () => {
            cursor.classList.add("active");
        });

        el.addEventListener("mouseleave", () => {
            cursor.classList.remove("active");
        });

    });

    // ===============================
    // 3D Card Tilt
    // ===============================

    card.addEventListener("mousemove", e => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateY = ((x / rect.width) - 0.5) * 16;
        const rotateX = ((y / rect.height) - 0.5) * -16;

        card.style.transform = `
        perspective(1200px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale(1.03)
        `;

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = `
        perspective(1200px)
        rotateX(0deg)
        rotateY(0deg)
        scale(1)
        `;

    });

    // ===============================
    // Floating Stars
    // ===============================

    const stars = document.querySelector(".stars");

    function createStar() {

        const star = document.createElement("span");

        star.className = "star";

        star.innerHTML = "✦";

        star.style.left = Math.random() * window.innerWidth + "px";

        star.style.top = window.innerHeight + 50 + "px";

        star.style.fontSize = (8 + Math.random() * 18) + "px";

        star.style.animationDuration = (5 + Math.random() * 6) + "s";

        stars.appendChild(star);

        setTimeout(() => {
            star.remove();
        }, 12000);

    }

    setInterval(createStar, 350);

    // ===============================
    // Typing Title
    // ===============================

    const finalTitle = title.textContent.trim();

    title.textContent = "";

    let index = 0;

    function type() {

        if (index < finalTitle.length) {

            title.textContent += finalTitle.charAt(index);

            index++;

            setTimeout(type, 130);

        }

    }

    setTimeout(type, 3000);

    // ===============================
    // Link Ripple
    // ===============================

    links.forEach(link => {

        link.addEventListener("mousemove", e => {

            const rect = link.getBoundingClientRect();

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            link.style.setProperty("--x", x + "px");
            link.style.setProperty("--y", y + "px");

        });

    });

    // ===============================
    // Portal Transition
    // ===============================

    links.forEach(link => {

        link.addEventListener("click", e => {

            e.preventDefault();

            document.body.classList.add("portal");

            setTimeout(() => {
                window.location.href = link.href;
            }, 900);

        });

    });

    // ===============================
    // Parallax Blobs
    // ===============================

    const blobs = document.querySelectorAll(".blob");

    document.addEventListener("mousemove", e => {

        const x = (e.clientX / window.innerWidth - .5);
        const y = (e.clientY / window.innerHeight - .5);

        blobs.forEach((blob, i) => {

            const speed = (i + 1) * 18;

            blob.style.transform =
                `translate(${x * speed}px, ${y * speed}px)`;

        });

    });

    // ===============================
    // Scrubber
    // ===============================

    const mpDuration = 204;
    let mpElapsed = 0;
    let mpDragging = false;

    setInterval(() => {

        if (mpDragging) return;

        mpElapsed = (mpElapsed + 0.5) % mpDuration;

        const pct = (mpElapsed / mpDuration) * 100;

        document.getElementById("mpFill").style.width = pct + "%";
        document.getElementById("mpThumb").style.left = pct + "%";

    }, 500);

    const mpTrack = document.getElementById("mpTrack");

    function mpSeek(e) {

        const r = mpTrack.getBoundingClientRect();

        const pct = Math.min(Math.max((e.clientX - r.left) / r.width, 0), 1);

        mpElapsed = pct * mpDuration;

        document.getElementById("mpFill").style.width = (pct * 100) + "%";
        document.getElementById("mpThumb").style.left = (pct * 100) + "%";

    }

    mpTrack.addEventListener("mousedown", e => { mpDragging = true; mpSeek(e); });
    document.addEventListener("mousemove", e => { if (mpDragging) mpSeek(e); });
    document.addEventListener("mouseup", () => { mpDragging = false; });

    // ===============================
    // Scroll Reveal
    // ===============================

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }

        });

    }, {
        threshold: .25
    });

    document.querySelectorAll(".link,.quote,.avatar,.subtitle")
        .forEach(el => observer.observe(el));

});
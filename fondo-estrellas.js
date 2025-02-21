function createGlitter() {
    const fragment = document.createDocumentFragment();
    const numberOfStars = Math.min(100, Math.floor(window.innerWidth / 10));

    for (let i = 0; i < numberOfStars; i++) {
        let sparkle = document.createElement("div");
        sparkle.classList.add("glitter");
        sparkle.style.position = 'absolute';
        sparkle.style.left = Math.random() * window.innerWidth + "px";
        sparkle.style.top = Math.random() * window.innerHeight + "px";
        sparkle.style.animationDuration = (Math.random() * 1.5 + 0.5) + "s";
        sparkle.style.animationDelay = (Math.random() * 2) + "s";
        fragment.appendChild(sparkle);
    }
    document.body.appendChild(fragment);
}
createGlitter();
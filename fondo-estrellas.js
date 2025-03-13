function createGlitter() {
    // Create canvas element if it doesn't exist
    let canvas = document.getElementById("starCanvas");
    if (!canvas) {
        canvas = document.createElement("canvas");
        canvas.id = "starCanvas";
        canvas.style.position = "fixed";
        canvas.style.top = "0";
        canvas.style.left = "0";
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.style.zIndex = "-1";
        document.body.appendChild(canvas);
    }
    
    const ctx = canvas.getContext("2d");
    
    // Set canvas dimensions to match window
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars = [];
    const numStars = Math.min(100, Math.floor(window.innerWidth / 10));

    // Create stars with random properties
    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 1,
            alpha: Math.random(),
            speed: Math.random() * 0.02 + 0.01
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        stars.forEach(star => {
            // Update star opacity for twinkling effect
            star.alpha += star.speed;
            if (star.alpha > 1 || star.alpha < 0.2) star.speed *= -1;

            // Draw star
            ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fill();
        });

        requestAnimationFrame(animate);
    }

    animate();
}

// Initialize the glitter effect
createGlitter();

// Reinitialize when window is resized
window.addEventListener("resize", createGlitter);
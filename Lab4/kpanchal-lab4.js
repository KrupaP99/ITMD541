// Krupa Prakash Panchal
// ITMD 541-01 Graduate Student

(function() {

    // 1a. Change the main headline text in the hero section
    document.querySelector('#hero h1').textContent = "Uplift Your Brand with Stellar Marketing";

    // 1b. Change the line below the hero headline (with bold + italic)
    document.querySelector('#hero p').innerHTML =
        "Utilize cutting-edge strategies from Stellar Marketing to help your business <b><i>thrive</i></b> and <b><i>excel</i></b>.";

    // 1c. Change the background image in the hero section
    document.querySelector("#hero").style.backgroundImage =
        "url('https://picsum.photos/id/683/1280/720')";

    // 1d. Remove the “Get Started” CTA from the hero
    const ctaButton = document.querySelector("#hero a");
    if (ctaButton) {
        ctaButton.remove();
    }

    // 1e. Change navbar background color to match footer
    const footerColor = getComputedStyle(document.querySelector("footer")).backgroundColor;
    document.querySelector("header").style.backgroundColor = footerColor;

    // 2a. Change services section icons color to #47C714
    document.querySelectorAll("#services .material-symbols-outlined").forEach(icon => {
        icon.style.color = "#47C714";
    });

    // 2b. Change Digital Marketing icon to 'ads_click'
    const icons = document.querySelectorAll("#services .material-symbols-outlined");
    if (icons.length > 1) {
        icons[1].textContent = "ads_click"; // safer selection
    }

    // 3a. Change layout to 4 columns for >=1024px
    const styleTag = document.createElement("style");
    styleTag.textContent = `
        @media (min-width: 1024px) {
            #solutions [data-section="product_cards"] {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 16px;
            }
        }
    `;
    document.head.appendChild(styleTag);

    // 3b. Change the Musicians image
    const musicianImage = document.querySelector("#solutions img[alt='Musicians']");
    if (musicianImage) {
        musicianImage.src = "https://picsum.photos/id/453/400/300";
    }

    // 4. Graduate Requirement - Handle form submission
    const form = document.querySelector("#contact form");

    if (form) {
        form.addEventListener("submit", function(event) {
            event.preventDefault();

            const name = document.querySelector("#contact #name").value.trim();
            const email = document.querySelector("#contact #email").value.trim();

            if (name && email) {
                alert(`Thank you, ${name}! We will be in touch with you shortly at ${email}.`);
            } else {
                alert("Please provide a name and email.");
            }
        });
    }

})();
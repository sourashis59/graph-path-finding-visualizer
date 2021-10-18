const socialMediaIcons = document.querySelectorAll(".socialMediaIcon");

function handleSocialMediaIconClick(e) {
    let id = e.target.id;

    if (id === "githubIcon")
        window
            .open(
                "https://github.com/sourashis59/graph-path-finding-visualizer",
                "_blank"
            )
            .focus();
    else if (id === "linkedInIcon")
        window
            .open(
                "https://www.linkedin.com/in/sourashis-mondal-6b90601a2/",
                "_blank"
            )
            .focus();
}

for (let i = 0; i < socialMediaIcons.length; i++) {
    socialMediaIcons[i].addEventListener("click", handleSocialMediaIconClick);
}

// ----- Social Media Share -----
const socialIconButtons = document.getElementsByClassName("social-icon");

function postToSocialMedia(classList) {
    const content = `Check out my cool generative AI Project 😎 \n${window.location.href.toString()}`;
    if (classList.contains("twitter")) {
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(content)}`;
        window.open(url);
    } else if (classList.contains("linkedin")) {
        const url = `https://www.linkedin.com/share?text=${encodeURIComponent(content)}`;
        window.open(url);
    } else if (classList.contains("whatsapp")) {
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(content)}`);
    }
}

const addEventListenersToSocialIconButton = () => {
    for (let i = 0; i < socialIconButtons.length; i++) {
        socialIconButtons[i].addEventListener("click", () =>
            postToSocialMedia(socialIconButtons[i].classList)
        );
    }
};
addEventListenersToSocialIconButton();

// ----- Skills Tooltip -----
const skillIcon = document.getElementsByClassName("tooltip1");

const addEventListenersToSkillIcon = () => {
    for (let i = 0; i < skillIcon.length; i++) {
        skillIcon[i].addEventListener("click", (e) => {
            console.log(e.target)
            updateDescription(e.target.id);
        });
    }
};
addEventListenersToSkillIcon();

// ----- About Section Button -----
document.addEventListener('DOMContentLoaded', function() {
    var openPageButton = document.getElementById('openPageButton');
    if (openPageButton) {
        openPageButton.addEventListener('click', function() {
            window.location.href = 'another-page.html';
        });
    }
});

// ----- Section Visibility -----
let sections = document.querySelectorAll('[id^="main"]');

if (sections.length > 1) {
    let sectionOne = sections[0];
    sections.forEach((section) => {
        if (section != sectionOne) {
            $(section).css('cssText', 'display: none !important;');
        }
    });
}

const makeRemainingScreensInvisible = (main) => {
    let sections = document.querySelectorAll('[id^="main"]');
    sections.forEach((section) => {
        if ($(section).attr("id") != main) {
            $(section).css('cssText', 'display: none !important;');
        }
    });
};

const display = (main) => {
    makeRemainingScreensInvisible(main);
    let section = document.getElementById(main);
    $(section).css('cssText', '');
    window.scrollTo(0, 0);
};

// ----- Chatbot Integration -----
async function sendMessageToServer(message) {
    try {
        const res = await fetch("http://127.0.0.1:5000/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message })
        });

        if (!res.ok) {
            const err = await res.json().catch(() => ({ error: 'network' }));
            throw new Error(err.error || res.statusText);
        }

        const data = await res.json();
        return data.reply;

    } catch (error) {
        console.error("Error:", error.message);
        return "Sorry, something went wrong!";
    }
}

// Example: Add event listener to your chat send button
const chatSendButton = document.getElementById("chatSendButton");
const chatInput = document.getElementById("chatInput");
const chatWindow = document.getElementById("chatWindow");

if (chatSendButton && chatInput && chatWindow) {
    chatSendButton.addEventListener("click", async () => {
        const message = chatInput.value.trim();
        if (!message) return;

        // Display user message
        const userMsg = document.createElement("div");
        userMsg.className = "user-message";
        userMsg.textContent = message;
        chatWindow.appendChild(userMsg);

        chatInput.value = "";

        // Get bot reply
        const reply = await sendMessageToServer(message);
        const botMsg = document.createElement("div");
        botMsg.className = "bot-message";
        botMsg.textContent = reply;
        chatWindow.appendChild(botMsg);

        chatWindow.scrollTop = chatWindow.scrollHeight;
    });
}

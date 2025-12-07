/**
 * Terminal Typewriter Effect
 * Handles the animated typing in the hero section.
 */
export function initTerminal() {
    const command = 'cat landing_page.txt';
    const outputText =
        "Don Jackson, I'm a Software Engineering student at Southern New Hampshire University. I enjoy tinkering with electronics and building apps.";
    const finalCommand = './render_portfolio.sh --verbose';
    const typeSpeed = 50;
    const typeElement = document.getElementById('typewriter-text');

    if (!typeElement) return;

    let charIndex = 0;
    let stage = 'command'; // 'command', 'output', 'finalCommand'

    function typeWriter() {
        if (stage === 'command') {
            if (charIndex < command.length) {
                typeElement.innerHTML += command.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, typeSpeed);
            } else {
                stage = 'output';
                setTimeout(() => {
                    typeElement.innerHTML += '<br/><br/>';
                    charIndex = 0;
                    typeWriter();
                }, 500);
            }
        } else if (stage === 'output') {
            if (charIndex < outputText.length) {
                typeElement.innerHTML += outputText.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, typeSpeed);
            } else {
                stage = 'finalCommand';
                setTimeout(() => {
                    typeElement.innerHTML += '<br/><br/><span class="prompt">&gt;</span> ';
                    charIndex = 0;
                    typeWriter();
                }, 500);
            }
        } else if (stage === 'finalCommand') {
            if (charIndex < finalCommand.length) {
                typeElement.innerHTML += finalCommand.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, typeSpeed);
            }
        }
    }

    // Start typing logic immediately when initialized
    typeWriter();
}

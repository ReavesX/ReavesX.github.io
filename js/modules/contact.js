export function initContact() {
    const form = document.getElementById("contact-form");
    const status = document.getElementById("form-status");
    const successDiv = document.getElementById("form-success");
    const submitBtn = document.getElementById("submit-btn");

    if (!form) return;

    async function handleSubmit(event) {
        event.preventDefault();

        const data = new FormData(event.target);
        const originalBtnText = submitBtn.innerText;

        // set loading state
        submitBtn.disabled = true;
        submitBtn.innerText = "UPLOADING...";

        try {
            const response = await fetch(event.target.action, {
                method: form.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Success!
                form.style.display = "none";
                successDiv.style.display = "flex";
                form.reset();
            } else {
                // Error from server
                const result = await response.json();
                if (Object.hasOwn(result, 'errors')) {
                    status.innerHTML = result["errors"].map(error => error["message"]).join(", ");
                } else {
                    status.innerHTML = "Transmission Failed. Server rejected packet.";
                }
                status.style.color = "red";
                submitBtn.disabled = false;
                submitBtn.innerText = originalBtnText;
            }
        } catch (error) {
            // Network error
            status.innerHTML = "Network Error. Check your uplink connection.";
            status.style.color = "red";
            submitBtn.disabled = false;
            submitBtn.innerText = originalBtnText;
        }
    }

    form.addEventListener("submit", handleSubmit);

    // Optional: Handle 'Send Another' button if it exists dynamically, 
    // but we used inline onclick="location.reload()" for simplicity in HTML.
    // If we wanted to avoid reload:
    const resetBtn = successDiv.querySelector(".reset-btn");
    if (resetBtn) {
        resetBtn.onclick = (e) => {
            e.preventDefault();
            form.style.display = "flex";
            successDiv.style.display = "none";
            submitBtn.disabled = false;
            submitBtn.innerText = "SEND TRANSMISSION";
            status.innerHTML = "";
        };
    }
}

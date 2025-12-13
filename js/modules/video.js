export function initVideoPlayer() {
    console.log("Video Player Module Initialized");

    const modal = document.getElementById('video-modal');
    // If modal structure doesn't exist yet, we might need to wait or it will be added to HTML
    if (!modal) return;

    const videoContainer = document.getElementById('video-container');
    const closeBtn = document.getElementById('video-close');
    const prevBtn = document.getElementById('video-prev');
    const nextBtn = document.getElementById('video-next');
    const titleElem = document.getElementById('video-title');
    const counterElem = document.getElementById('video-counter');

    let currentPlaylist = [];
    let currentIndex = 0;

    // Delegate click for dynamic buttons if needed, but direct binding to .btn-demo is fine
    document.querySelectorAll('.btn-demo').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const sourceData = btn.getAttribute('data-video-sources');
            if (!sourceData) return;

            try {
                // Parse the JSON data from the attribute
                // Expected format: [{"type": "youtube", "src": "ID", "title": "..."}, ...]
                // Or single object: {"type": "local", "src": "path", ...}
                let data = JSON.parse(sourceData);

                // Normalizing to array
                if (!Array.isArray(data)) {
                    data = [data];
                }

                currentPlaylist = data;
                currentIndex = 0;
                openModal();
            } catch (err) {
                console.error("Error parsing video sources:", err);
            }
        });
    });

    function openModal() {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
        loadVideo(currentIndex);
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        videoContainer.innerHTML = ''; // Stop playback
        currentPlaylist = [];
        currentIndex = 0;
    }

    function loadVideo(index) {
        if (index < 0 || index >= currentPlaylist.length) return;

        const video = currentPlaylist[index];
        videoContainer.innerHTML = ''; // Clear previous content

        // Update Title if available
        if (titleElem) {
            titleElem.textContent = video.title || "";
        }

        // Update Counter
        if (counterElem) {
            if (currentPlaylist.length > 1) {
                counterElem.textContent = `${index + 1} / ${currentPlaylist.length}`;
                counterElem.style.display = 'block';
            } else {
                counterElem.style.display = 'none';
            }
        }

        // Render Content
        if (video.type === 'youtube') {
            const iframe = document.createElement('iframe');
            iframe.src = `https://www.youtube.com/embed/${video.src}?autoplay=1&rel=0`;
            iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
            iframe.allowFullscreen = true;
            iframe.style.width = '100%';
            iframe.style.height = '100%';
            iframe.style.border = 'none';
            videoContainer.appendChild(iframe);
        } else if (video.type === 'local') {
            const vid = document.createElement('video');
            vid.src = video.src;
            vid.controls = true;
            vid.autoplay = true;
            vid.style.width = '100%';
            vid.style.maxHeight = '100%';
            videoContainer.appendChild(vid);
        }

        updateControls();
    }

    function updateControls() {
        // Show/Hide Prev Video Button
        if (prevBtn) {
            prevBtn.style.visibility = (currentPlaylist.length > 1 && currentIndex > 0) ? 'visible' : 'hidden';
        }

        // Show/Hide Next Video Button
        if (nextBtn) {
            nextBtn.style.visibility = (currentPlaylist.length > 1 && currentIndex < currentPlaylist.length - 1) ? 'visible' : 'hidden';
        }
    }

    // Event Listeners for Controls
    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                loadVideo(currentIndex);
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentIndex < currentPlaylist.length - 1) {
                currentIndex++;
                loadVideo(currentIndex);
            }
        });
    }

    // Close on click outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close on Esc key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

}

// YouTube cannot validate the referrer of a file:// document.
// Local file previews use the development server; hosted sites stay unchanged.
if (location.protocol === 'file:') {
  const page = location.pathname.split('/').pop() || 'index.html';
  location.replace('http://localhost:8000/' + encodeURIComponent(decodeURIComponent(page)) + location.hash);
}

// Load the player from the real page origin, not an about:srcdoc document.
document.querySelectorAll('[data-youtube-id]').forEach((preview) => {
  preview.addEventListener('click', () => {
    const id = preview.dataset.youtubeId;
    if (!/^[A-Za-z0-9_-]{11}$/.test(id)) return;
    const player = document.createElement('iframe');
    const url = new URL(`https://www.youtube-nocookie.com/embed/${id}`);
    url.searchParams.set('autoplay', '1');
    url.searchParams.set('playsinline', '1');
    url.searchParams.set('rel', '0');
    if (['http:', 'https:'].includes(location.protocol)) {
      url.searchParams.set('origin', location.origin);
    }
    player.src = url.href;
    player.title = preview.dataset.videoTitle;
    player.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
    player.allowFullscreen = true;
    player.referrerPolicy = 'strict-origin-when-cross-origin';
    preview.replaceWith(player);
    player.focus();
  });
});

const parrentsImage = document.querySelectorAll('.download');

parrentsImage && parrentsImage.forEach(downloadBlock => {
    const fileInput = downloadBlock.querySelector('.download__input');
    const imagePreview = downloadBlock.querySelector('.download__image img');
    
    fileInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                imagePreview.src = e.target.result;
            }
            reader.readAsDataURL(file);
        }
    });
});
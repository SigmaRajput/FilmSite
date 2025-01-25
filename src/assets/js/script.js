// Load Google API client
function loadClient() {
    // gapi.client.setApiKey('<YOUR_API_KEY>'); // Optional if you don't use API Key
    return gapi.client.load('https://content.googleapis.com/discovery/v1/apis/drive/v3/rest');
}

// Load OAuth 2.0 client and authenticate user
function authenticate() {
    return gapi.auth2.getAuthInstance()
        .signIn({ scope: 'https://www.googleapis.com/auth/drive.readonly' })
        .then(function() {
            console.log('Sign-in successful');
        }, function(err) {
            console.error('Error signing in', err);
        });
}

// List images from a specific folder
function listImagesFromDrive(folderId) {
    gapi.client.drive.files.list({
        q: `'${folderId}' in parents and mimeType contains 'image/'`,
        fields: "files(id, name, webViewLink, thumbnailLink)"
    }).then(function(response) {
        const files = response.result.files;
        const carouselImagesContainer = document.getElementById('carousel-images');
        
        if (files.length > 0) {
            files.forEach(function(file) {
                const imageUrl = file.thumbnailLink || file.webViewLink;
                const imageElement = document.createElement('div');
                imageElement.classList.add('swiper-slide');
                imageElement.innerHTML = `<img src="${imageUrl}" alt="${file.name}" />`;
                carouselImagesContainer.appendChild(imageElement);
            });

            // Initialize Swiper after images are added
            initSwiper();
        } else {
            console.log('No images found.');
        }
    });
}

// Initialize Swiper carousel
function initSwiper() {
    new Swiper('#carousel', {
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
}

function start() {
    gapi.load('client:auth2', function() {
        gapi.auth2
            .init({
                client_id: '325618906578-kk5oeat03jkg71upknssdb9vc4lr4q0f.apps.googleusercontent.com',
            })
            .then(function() {
                console.log('Google API client initialized');
            })
            .catch(function(error) {
                console.error('Google API client initialization failed:', error);
                if (error.error === 'idpiframe_initialization_failed') {
                    alert('Invalid origin. Please register your origin in Google Cloud Console.');
                }
            });
    });
}

window.onload = function() {
    if (typeof gapi !== 'undefined') {
        start();
    } else {
        console.error('Google API library not loaded.');
    }
};

// Hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');console.log(response.result.files); // Check if files are being returned

    navLinks.classList.toggle('active');
});

import React, { useEffect, useState } from 'react';

const Carousel = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            // Fetch images from the drive folder (replace with your actual API or method)
            const response = await fetch('YOUR_DRIVE_FOLDER_API_URL');
            const data = await response.json();
            setImages(data.images); // Assuming the response contains an array of image URLs
        };

        fetchImages();
    }, []);

    return (
        <div className="carousel">
            {images.length > 0 ? (
                <div className="carousel-inner">
                    {images.map((image, index) => (
                        <div className="carousel-item" key={index}>
                            <img src={image} alt={`Slide ${index}`} />
                        </div>
                    ))}
                </div>
            ) : (
                <p>Loading images...</p>
            )}
        </div>
    );
};

export default Carousel;
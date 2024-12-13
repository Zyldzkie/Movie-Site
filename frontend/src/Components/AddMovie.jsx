import React, { useState } from 'react';

const MovieForm = () => {
    // State to hold form data
    const [userId, setUserId] = useState('');
    const [title, setTitle] = useState('');
    const [overview, setOverview] = useState('');
    const [popularity, setPopularity] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [voteAverage, setVoteAverage] = useState('');
    const [backdropPath, setBackdropPath] = useState('');
    const [posterPath, setPosterPath] = useState('');
    const [isFeatured, setIsFeatured] = useState(false);
    const [photos, setPhotos] = useState('');
    const [videos, setVideos] = useState('');
    const [cast, setCast] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const formData = {
            userId,
        title,
        overview,
        popularity,
        releaseDate,
        voteAverage,
        backdropPath,
        posterPath,
        isFeatured,
        photos: photos.map(photo => ({
            url: photo.url,       
            description: photo.description
        })),
        videos: videos.map(video => ({
            url: video.url,       
            name: video.name,
            site: video.site,
            videoKey: video.videoKey,
            videoType: video.videoType,
            official: video.official
        })),
        cast: cast.map(member => ({
            name: member.name,   
                url: member.url,
                characterName: member.characterName
            }))
        };


        try {
            const response = await fetch('your_php_backend_url_here', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            
            if (response.ok) {
                alert('Movie created successfully!');
            } else {
                alert(`Error: ${data.error}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while creating the movie.');
        }
    };

    return (
        <div>
            <h2>Create Movie</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>User ID:</label>
                    <input
                        type="number"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Overview:</label>
                    <textarea
                        value={overview}
                        onChange={(e) => setOverview(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Popularity:</label>
                    <input
                        type="number"
                        value={popularity}
                        onChange={(e) => setPopularity(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Release Date:</label>
                    <input
                        type="date"
                        value={releaseDate}
                        onChange={(e) => setReleaseDate(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Vote Average:</label>
                    <input
                        type="number"
                        value={voteAverage}
                        onChange={(e) => setVoteAverage(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Backdrop Path:</label>
                    <input
                        type="text"
                        value={backdropPath}
                        onChange={(e) => setBackdropPath(e.target.value)}
                    />
                </div>
                <div>
                    <label>Poster Path:</label>
                    <input
                        type="text"
                        value={posterPath}
                        onChange={(e) => setPosterPath(e.target.value)}
                    />
                </div>
                <div>
                    <label>Is Featured:</label>
                    <input
                        type="checkbox"
                        checked={isFeatured}
                        onChange={(e) => setIsFeatured(e.target.checked)}
                    />
                </div>
                <div>
                    <label>Photos (comma-separated URLs):</label>
                    <input
                        type="text"
                        value={photos}
                        onChange={(e) => setPhotos(e.target.value)}
                    />
                </div>
                <div>
                    <label>Videos (comma-separated URLs):</label>
                    <input
                        type="text"
                        value={videos}
                        onChange={(e) => setVideos(e.target.value)}
                    />
                </div>
                <div>
                    <label>Cast (comma-separated names):</label>
                    <input
                        type="text"
                        value={cast}
                        onChange={(e) => setCast(e.target.value)}
                    />
                </div>
                <button type="submit">Create Movie</button>
            </form>
        </div>
    );
};

export default MovieForm;

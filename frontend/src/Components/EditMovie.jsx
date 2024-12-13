import React, { useState, useEffect } from 'react';

const EditMovieForm = ({ movieId, userId }) => {
    const [movieData, setMovieData] = useState({
        title: '',
        overview: '',
        popularity: '',
        releaseDate: '',
        voteAverage: '',
        backdropPath: '',
        posterPath: '',
        isFeatured: false,
        photos: [],
        videos: [],
        cast: []
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch existing movie data when the component loads
        const fetchMovieData = async () => {
            try {
                const response = await fetch(`/api/getMovie/${movieId}`);
                const data = await response.json();
                setMovieData(data);
            } catch (err) {
                setError('Failed to load movie data');
            }
        };

        fetchMovieData();
    }, [movieId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMovieData({
            ...movieData,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setMovieData({
            ...movieData,
            [name]: files
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = {
            movieId,
            userId,
            ...movieData,
            photos: Array.from(movieData.photos),
            videos: Array.from(movieData.videos),
            cast: Array.from(movieData.cast),
        };

        try {
            const response = await fetch('/api/editMovie', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (data.success) {
                alert('Movie updated successfully!');
            } else {
                setError(data.message || 'Failed to update movie');
            }
        } catch (err) {
            setError('Error submitting form');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Edit Movie</h1>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {loading && <div>Loading...</div>}

            <form onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input
                        type="text"
                        name="title"
                        value={movieData.title}
                        onChange={handleInputChange}
                        required
                    />
                </label><br />

                <label>
                    Overview:
                    <textarea
                        name="overview"
                        value={movieData.overview}
                        onChange={handleInputChange}
                        required
                    />
                </label><br />

                <label>
                    Popularity:
                    <input
                        type="number"
                        name="popularity"
                        value={movieData.popularity}
                        onChange={handleInputChange}
                        required
                    />
                </label><br />

                <label>
                    Release Date:
                    <input
                        type="date"
                        name="releaseDate"
                        value={movieData.releaseDate}
                        onChange={handleInputChange}
                        required
                    />
                </label><br />

                <label>
                    Vote Average:
                    <input
                        type="number"
                        name="voteAverage"
                        value={movieData.voteAverage}
                        onChange={handleInputChange}
                        required
                    />
                </label><br />

                <label>
                    Backdrop Path:
                    <input
                        type="text"
                        name="backdropPath"
                        value={movieData.backdropPath}
                        onChange={handleInputChange}
                        required
                    />
                </label><br />

                <label>
                    Poster Path:
                    <input
                        type="text"
                        name="posterPath"
                        value={movieData.posterPath}
                        onChange={handleInputChange}
                        required
                    />
                </label><br />

                <label>
                    Is Featured:
                    <input
                        type="checkbox"
                        name="isFeatured"
                        checked={movieData.isFeatured}
                        onChange={(e) => setMovieData({ ...movieData, isFeatured: e.target.checked })}
                    />
                </label><br />

                <label>
                    Photos (comma-separated URLs):
                    <input
                        type="text"
                        name="photos"
                        value={movieData.photos.join(', ')}
                        onChange={(e) => setMovieData({ ...movieData, photos: e.target.value.split(',') })}
                    />
                </label><br />

                <label>
                    Videos (comma-separated URLs):
                    <input
                        type="text"
                        name="videos"
                        value={movieData.videos.join(', ')}
                        onChange={(e) => setMovieData({ ...movieData, videos: e.target.value.split(',') })}
                    />
                </label><br />

                <label>
                    Cast (comma-separated names):
                    <input
                        type="text"
                        name="cast"
                        value={movieData.cast.join(', ')}
                        onChange={(e) => setMovieData({ ...movieData, cast: e.target.value.split(',') })}
                    />
                </label><br />

                <button type="submit" disabled={loading}>Submit</button>
            </form>
        </div>
    );
};

export default EditMovieForm;

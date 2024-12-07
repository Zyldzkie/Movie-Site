<?php

include "../codes/connection.php";

/**
 * Adds a new movie to the database.
 * 
 * @param PDO $conn Database connection object.
 * @param int $userId ID of the user adding the movie.
 * @param int|null $tmdbId TMDB ID of the movie (optional).
 * @param string $title Title of the movie.
 * @param string $overview Overview/description of the movie.
 * @param float|null $popularity Popularity score (optional).
 * @param string|null $releaseDate Release date of the movie (optional).
 * @param float|null $voteAverage Average vote (optional).
 * @param string|null $backdropPath Path to the backdrop image (optional).
 * @param string|null $posterPath Path to the poster image (optional).
 * @param bool $isFeatured Whether the movie is featured (default: false).
 * @return string Success or error message.
 */
function addMovie($conn, $userId, $tmdbId, $title, $overview, $popularity, $releaseDate, $voteAverage, $backdropPath, $posterPath, $isFeatured = false) {
    $query = "INSERT INTO Movies (userId, tmdbId, title, overview, popularity, releaseDate, voteAverage, backdropPath, posterPath, isFeatured) 
              VALUES (:userId, :tmdbId, :title, :overview, :popularity, :releaseDate, :voteAverage, :backdropPath, :posterPath, :isFeatured)";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':userId', $userId);
    $stmt->bindParam(':tmdbId', $tmdbId);
    $stmt->bindParam(':title', $title);
    $stmt->bindParam(':overview', $overview);
    $stmt->bindParam(':popularity', $popularity);
    $stmt->bindParam(':releaseDate', $releaseDate);
    $stmt->bindParam(':voteAverage', $voteAverage);
    $stmt->bindParam(':backdropPath', $backdropPath);
    $stmt->bindParam(':posterPath', $posterPath);
    $stmt->bindParam(':isFeatured', $isFeatured, PDO::PARAM_BOOL);

    if ($stmt->execute()) {
        return "Movie added successfully!";
    } else {
        return "Error adding movie.";
    }
}

/**
 * Retrieves all movies from the database.
 * 
 * @param PDO $conn Database connection object.
 * @return array List of all movies.
 */
function getAllMovies($conn) {
    $query = "SELECT * FROM Movies";
    $stmt = $conn->prepare($query);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

/**
 * Retrieves a movie by its ID.
 * 
 * @param PDO $conn Database connection object.
 * @param int $movieId ID of the movie.
 * @return array|null Details of the movie or null if not found.
 */
function getMovieById($conn, $movieId) {
    $query = "SELECT * FROM Movies WHERE movieId = :movieId";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':movieId', $movieId);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
}

/**
 * Updates a movie's information.
 * 
 * @param PDO $conn Database connection object.
 * @param int $movieId ID of the movie to update.
 * @param string $title Updated title of the movie.
 * @param string $overview Updated overview of the movie.
 * @param float|null $popularity Updated popularity score (optional).
 * @param string|null $releaseDate Updated release date (optional).
 * @param float|null $voteAverage Updated average vote (optional).
 * @param string|null $backdropPath Updated backdrop path (optional).
 * @param string|null $posterPath Updated poster path (optional).
 * @param bool|null $isFeatured Updated featured status (optional).
 * @return string Success or error message.
 */
function updateMovie($conn, $movieId, $title, $overview, $popularity, $releaseDate, $voteAverage, $backdropPath, $posterPath, $isFeatured = null) {
    $query = "UPDATE Movies 
              SET title = :title, overview = :overview, popularity = :popularity, releaseDate = :releaseDate, 
                  voteAverage = :voteAverage, backdropPath = :backdropPath, posterPath = :posterPath, isFeatured = :isFeatured, dateUpdated = CURRENT_DATE
              WHERE movieId = :movieId";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':title', $title);
    $stmt->bindParam(':overview', $overview);
    $stmt->bindParam(':popularity', $popularity);
    $stmt->bindParam(':releaseDate', $releaseDate);
    $stmt->bindParam(':voteAverage', $voteAverage);
    $stmt->bindParam(':backdropPath', $backdropPath);
    $stmt->bindParam(':posterPath', $posterPath);
    $stmt->bindParam(':isFeatured', $isFeatured, PDO::PARAM_BOOL);
    $stmt->bindParam(':movieId', $movieId);

    if ($stmt->execute()) {
        return "Movie updated successfully!";
    } else {
        return "Error updating movie.";
    }
}

/**
 * Deletes a movie from the database.
 * 
 * @param PDO $conn Database connection object.
 * @param int $movieId ID of the movie to delete.
 * @return string Success or error message.
 */
function deleteMovie($conn, $movieId) {
    $query = "DELETE FROM Movies WHERE movieId = :movieId";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':movieId', $movieId);

    if ($stmt->execute()) {
        return "Movie deleted successfully!";
    } else {
        return "Error deleting movie.";
    }
}

/**
 * Retrieves all featured movies.
 * 
 * @param PDO $conn Database connection object.
 * @return array List of featured movies.
 */
function getFeaturedMovies($conn) {
    $query = "SELECT * FROM Movies WHERE isFeatured = TRUE";
    $stmt = $conn->prepare($query);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

?>

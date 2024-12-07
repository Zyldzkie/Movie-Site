<?php

include "../codes/connection.php";

/**
 * Adds a new video to the database.
 * 
 * @param PDO $conn Database connection object.
 * @param int $movieId ID of the associated movie.
 * @param int $userId ID of the user adding the video.
 * @param string|null $url Optional URL of the video.
 * @param string|null $name Optional name or title of the video.
 * @param string|null $site Optional hosting site (e.g., YouTube, Vimeo).
 * @param string|null $videoKey Optional unique video identifier (e.g., YouTube ID).
 * @param string|null $videoType Optional type of video (e.g., Trailer, Teaser).
 * @param bool $official Indicates if the video is an official release (default is false).
 * @return string Success or error message.
 */
function addVideo($conn, $movieId, $userId, $url = null, $name = null, $site = null, $videoKey = null, $videoType = null, $official = false) {
    $query = "INSERT INTO videos (movieId, userId, url, name, site, videoKey, videoType, official) 
              VALUES (:movieId, :userId, :url, :name, :site, :videoKey, :videoType, :official)";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':movieId', $movieId);
    $stmt->bindParam(':userId', $userId);
    $stmt->bindParam(':url', $url);
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':site', $site);
    $stmt->bindParam(':videoKey', $videoKey);
    $stmt->bindParam(':videoType', $videoType);
    $stmt->bindParam(':official', $official, PDO::PARAM_BOOL);

    if ($stmt->execute()) {
        return "Video added successfully!";
    } else {
        return "Error adding video.";
    }
}

/**
 * Retrieves all videos associated with a specific movie.
 * 
 * @param PDO $conn Database connection object.
 * @param int $movieId ID of the movie.
 * @return array List of all videos associated with the movie.
 */
function getVideosByMovieId($conn, $movieId) {
    $query = "SELECT * FROM videos WHERE movieId = :movieId";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':movieId', $movieId);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

/**
 * Retrieves a specific video by its ID.
 * 
 * @param PDO $conn Database connection object.
 * @param int $videoId ID of the video.
 * @return array|null Details of the video or null if not found.
 */
function getVideoById($conn, $videoId) {
    $query = "SELECT * FROM videos WHERE videoId = :videoId";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':videoId', $videoId);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
}

/**
 * Updates a video's details.
 * 
 * @param PDO $conn Database connection object.
 * @param int $videoId ID of the video to update.
 * @param string|null $url Updated URL of the video.
 * @param string|null $name Updated name or title of the video.
 * @param string|null $site Updated hosting site.
 * @param string|null $videoKey Updated unique video identifier.
 * @param string|null $videoType Updated type of video.
 * @param bool $official Updated official status.
 * @return string Success or error message.
 */
function updateVideo($conn, $videoId, $url = null, $name = null, $site = null, $videoKey = null, $videoType = null, $official = false) {
    $query = "UPDATE videos 
              SET url = :url, name = :name, site = :site, videoKey = :videoKey, videoType = :videoType, official = :official 
              WHERE videoId = :videoId";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':url', $url);
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':site', $site);
    $stmt->bindParam(':videoKey', $videoKey);
    $stmt->bindParam(':videoType', $videoType);
    $stmt->bindParam(':official', $official, PDO::PARAM_BOOL);
    $stmt->bindParam(':videoId', $videoId);

    if ($stmt->execute()) {
        return "Video updated successfully!";
    } else {
        return "Error updating video.";
    }
}

/**
 * Deletes a video from the database.
 * 
 * @param PDO $conn Database connection object.
 * @param int $videoId ID of the video to delete.
 * @return string Success or error message.
 */
function deleteVideo($conn, $videoId) {
    $query = "DELETE FROM videos WHERE videoId = :videoId";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':videoId', $videoId);

    if ($stmt->execute()) {
        return "Video deleted successfully!";
    } else {
        return "Error deleting video.";
    }
}

?>

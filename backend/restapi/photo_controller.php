<?php

include "../codes/connection.php";

/**
 * Adds a new photo to the database.
 * 
 * @param PDO $conn Database connection object.
 * @param int $movieId ID of the movie associated with the photo.
 * @param int $userId ID of the user adding the photo.
 * @param string $url URL of the photo.
 * @param string|null $description Optional description for the photo.
 * @return string Success or error message.
 */
function addPhoto($conn, $movieId, $userId, $url, $description = null) {
    $query = "INSERT INTO photos (movieId, userId, url, description) 
              VALUES (:movieId, :userId, :url, :description)";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':movieId', $movieId);
    $stmt->bindParam(':userId', $userId);
    $stmt->bindParam(':url', $url);
    $stmt->bindParam(':description', $description);

    if ($stmt->execute()) {
        return "Photo added successfully!";
    } else {
        return "Error adding photo.";
    }
}

/**
 * Retrieves all photos for a specific movie.
 * 
 * @param PDO $conn Database connection object.
 * @param int $movieId ID of the movie.
 * @return array List of all photos for the movie.
 */
function getPhotosByMovieId($conn, $movieId) {
    $query = "SELECT * FROM photos WHERE movieId = :movieId";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':movieId', $movieId);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

/**
 * Retrieves a specific photo by its ID.
 * 
 * @param PDO $conn Database connection object.
 * @param int $photoId ID of the photo.
 * @return array|null Details of the photo or null if not found.
 */
function getPhotoById($conn, $photoId) {
    $query = "SELECT * FROM photos WHERE photoId = :photoId";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':photoId', $photoId);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
}

/**
 * Updates a photo's details.
 * 
 * @param PDO $conn Database connection object.
 * @param int $photoId ID of the photo to update.
 * @param string $url Updated URL of the photo.
 * @param string|null $description Updated description of the photo (optional).
 * @return string Success or error message.
 */
function updatePhoto($conn, $photoId, $url, $description = null) {
    $query = "UPDATE photos 
              SET url = :url, description = :description 
              WHERE photoId = :photoId";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':url', $url);
    $stmt->bindParam(':description', $description);
    $stmt->bindParam(':photoId', $photoId);

    if ($stmt->execute()) {
        return "Photo updated successfully!";
    } else {
        return "Error updating photo.";
    }
}

/**
 * Deletes a photo from the database.
 * 
 * @param PDO $conn Database connection object.
 * @param int $photoId ID of the photo to delete.
 * @return string Success or error message.
 */
function deletePhoto($conn, $photoId) {
    $query = "DELETE FROM photos WHERE photoId = :photoId";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':photoId', $photoId);

    if ($stmt->execute()) {
        return "Photo deleted successfully!";
    } else {
        return "Error deleting photo.";
    }
}

?>

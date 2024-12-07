<?php

include "../codes/connection.php";

/**
 * Adds a new cast member to the database.
 * 
 * @param PDO $conn Database connection object.
 * @param int $movieId ID of the movie.
 * @param int $userId ID of the user adding the cast member.
 * @param string $name Name of the cast member.
 * @param string|null $url Optional URL for the cast member's profile or image.
 * @param string|null $characterName Optional name of the character played by the cast member.
 * @return string Success or error message.
 */
function addCastMember($conn, $movieId, $userId, $name, $url = null, $characterName = null) {
    $query = "INSERT INTO Cast (movieId, userId, name, url, characterName) 
              VALUES (:movieId, :userId, :name, :url, :characterName)";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':movieId', $movieId);
    $stmt->bindParam(':userId', $userId);
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':url', $url);
    $stmt->bindParam(':characterName', $characterName);

    if ($stmt->execute()) {
        return "Cast member added successfully!";
    } else {
        return "Error adding cast member.";
    }
}

/**
 * Retrieves all cast members for a given movie.
 * 
 * @param PDO $conn Database connection object.
 * @param int $movieId ID of the movie.
 * @return array List of all cast members for the movie.
 */
function getCastByMovieId($conn, $movieId) {
    $query = "SELECT * FROM Cast WHERE movieId = :movieId";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':movieId', $movieId);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

/**
 * Retrieves a specific cast member by their ID.
 * 
 * @param PDO $conn Database connection object.
 * @param int $castId ID of the cast member.
 * @return array|null Details of the cast member or null if not found.
 */
function getCastById($conn, $castId) {
    $query = "SELECT * FROM Cast WHERE castId = :castId";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':castId', $castId);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
}

/**
 * Updates a cast member's details.
 * 
 * @param PDO $conn Database connection object.
 * @param int $castId ID of the cast member to update.
 * @param string $name Updated name of the cast member.
 * @param string|null $url Updated URL for the cast member's profile or image (optional).
 * @param string|null $characterName Updated character name (optional).
 * @return string Success or error message.
 */
function updateCastMember($conn, $castId, $name, $url = null, $characterName = null) {
    $query = "UPDATE Cast 
              SET name = :name, url = :url, characterName = :characterName 
              WHERE castId = :castId";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':url', $url);
    $stmt->bindParam(':characterName', $characterName);
    $stmt->bindParam(':castId', $castId);

    if ($stmt->execute()) {
        return "Cast member updated successfully!";
    } else {
        return "Error updating cast member.";
    }
}

/**
 * Deletes a cast member from the database.
 * 
 * @param PDO $conn Database connection object.
 * @param int $castId ID of the cast member to delete.
 * @return string Success or error message.
 */
function deleteCastMember($conn, $castId) {
    $query = "DELETE FROM Cast WHERE castId = :castId";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':castId', $castId);

    if ($stmt->execute()) {
        return "Cast member deleted successfully!";
    } else {
        return "Error deleting cast member.";
    }
}

?>

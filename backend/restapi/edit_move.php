<?php

include '../codes/connection.php';
include 'admin_movie_controller.php'; 

header('Content-Type: application/json');

$inputData = json_decode(file_get_contents('php://input'), true);

if (!isset($inputData['movieId'], $inputData['userId'], $inputData['title'], $inputData['overview'], 
          $inputData['popularity'], $inputData['releaseDate'], $inputData['voteAverage'], 
          $inputData['backdropPath'], $inputData['posterPath'], $inputData['isFeatured'], 
          $inputData['photos'], $inputData['videos'], $inputData['cast'])) {
    echo json_encode(['error' => 'Missing required fields']);
    exit;
}


$movieId = $inputData['movieId'];
$userId = $inputData['userId'];
$title = $inputData['title'];
$overview = $inputData['overview'];
$popularity = $inputData['popularity'];
$releaseDate = $inputData['releaseDate'];
$voteAverage = $inputData['voteAverage'];
$backdropPath = $inputData['backdropPath'];
$posterPath = $inputData['posterPath'];
$isFeatured = $inputData['isFeatured'];
$photos = $inputData['photos'];
$videos = $inputData['videos'];
$cast = $inputData['cast'];

try {

    $result = editMovieWithAssets($conn, $movieId, $userId, $title, $overview, $popularity, $releaseDate, 
                                  $voteAverage, $backdropPath, $posterPath, $isFeatured, $photos, $videos, $cast);

    echo json_encode(['success' => true, 'message' => $result]);

} catch (Exception $e) {

    echo json_encode(['success' => false, 'message' => 'Error updating movie: ' . $e->getMessage()]);
}

?>

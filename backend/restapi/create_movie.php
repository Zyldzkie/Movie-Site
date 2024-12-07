<?php
header('Content-Type: application/json');


include '../codes/connection.php';
include 'admin_movie_controller.php'; 


$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['userId'], $data['title'], $data['overview'], $data['popularity'], $data['releaseDate'], 
    $data['voteAverage'], $data['backdropPath'], $data['posterPath'], $data['isFeatured'], $data['photos'], 
    $data['videos'], $data['cast'])) {
    
    $userId = $data['userId'];
    $title = $data['title'];
    $overview = $data['overview'];
    $popularity = $data['popularity'];
    $releaseDate = $data['releaseDate'];
    $voteAverage = $data['voteAverage'];
    $backdropPath = $data['backdropPath'];
    $posterPath = $data['posterPath'];
    $isFeatured = $data['isFeatured'];
    $photos = $data['photos'];
    $videos = $data['videos'];
    $cast = $data['cast'];

    try {
        $result = createMovieWithAssets($conn, $userId, $title, $overview, $popularity, $releaseDate, $voteAverage, 
                                        $backdropPath, $posterPath, $isFeatured, $photos, $videos, $cast);
        
        echo json_encode(['message' => $result]);
        http_response_code(201);  
    } catch (Exception $e) {
    
        echo json_encode(['error' => $e->getMessage()]);
        http_response_code(500);  
    }
} else {

    echo json_encode(['error' => 'Missing required fields']);
    http_response_code(400);  
}
?>

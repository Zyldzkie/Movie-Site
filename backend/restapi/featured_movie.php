
<?php

include "../codes/connection.php"; 
include "movie_controller.php";

if ($_SERVER['REQUEST_METHOD'] == 'GET') {

    $featuredMovies = getFeaturedMovies($conn);

    header('Content-Type: application/json');
    
    // Return the result as a JSON response
    echo json_encode($featuredMovies);

} else {
    // Return an error message if the request method is not GET
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Invalid request method. Only GET is allowed.']);
}

?>

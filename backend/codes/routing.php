<?php

$user_link = parse_url($_SERVER['REQUEST_URI'])["path"];

switch($user_link){

    case "/":
        // require("API/home.php");
        break;
    case "/login":
        require("restapi/login.php");
        break;
    case "/register":
        require("restapi/register.php");
    case "/create_movie":
        require("restapi/create_movie.php");
        break;
    case "/edit_movie":
        require("restapi/edit_movie.php");
        break;
    case "/featured_movie":
        require("restapi/featured_movie.php");
        break;
    default:
        http_response_code(404);
        break;
}
?>
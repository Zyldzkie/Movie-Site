<?php

$user_link = parse_url($_SERVER['REQUEST_URI'])["path"];

switch($user_link){

    case "/":
        // require("API/home.php");
        break;
    case "/login":
        require("restapi/login.php");
        break;
    default:
        http_response_code(404);
        break;
}
?>
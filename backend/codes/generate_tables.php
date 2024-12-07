<?php

include 'connection.php';

$sql_create_db = "CREATE DATABASE IF NOT EXISTS $dbname";
if ($conn->query($sql_create_db) === FALSE) {
    die("Error creating database: " . $conn->error);
}

if (!$conn->select_db($dbname)) {
    die("Error selecting database: " . $conn->error);
}

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "
    CREATE TABLE Users (
        userId INT NOT NULL PRIMARY KEY,
        firstName VARCHAR NOT NULL,
        middleName VARCHAR,
        lastName VARCHAR NOT NULL,
        contactNo VARCHAR NOT NULL,
        role ENUM NOT NULL
    );

    CREATE TABLE Movies (
        movieId INT NOT NULL PRIMARY KEY,
        userId INT NOT NULL,
        tmdbId INT,
        title VARCHAR NOT NULL,
        overview TEXT NOT NULL,
        popularity FLOAT,
        releaseDate DATE,
        voteAverage FLOAT,
        backdropPath VARCHAR,
        posterPath VARCHAR,
        dateCreated DATE NOT NULL,
        dateUpdated DATE,
        isFeatured BOOLEAN DEFAULT FALSE,
        FOREIGN KEY (userId) REFERENCES Users(userId)
    );

    CREATE TABLE Cast (
        castId INT NOT NULL PRIMARY KEY,
        movieId INT NOT NULL,
        userId INT NOT NULL,
        name VARCHAR NOT NULL,
        url VARCHAR,
        characterName VARCHAR,
        FOREIGN KEY (movieId) REFERENCES Movies(movieId),
        FOREIGN KEY (userId) REFERENCES Users(userId)
    );

    CREATE TABLE photos (
        photoId INT NOT NULL PRIMARY KEY,
        movieId INT NOT NULL,
        userId INT NOT NULL,
        url VARCHAR NOT NULL,
        description TEXT,
        FOREIGN KEY (movieId) REFERENCES Movies(movieId),
        FOREIGN KEY (userId) REFERENCES Users(userId)
    );

    CREATE TABLE videos (
        videoId INT NOT NULL PRIMARY KEY,
        movieId INT NOT NULL,
        userId INT NOT NULL,
        url VARCHAR,
        name TEXT,
        site TEXT,
        videoKey TEXT,
        videoType TEXT,
        official TEXT,
        FOREIGN KEY (movieId) REFERENCES Movies(movieId),
        FOREIGN KEY (userId) REFERENCES Users(userId)
    );
)";

if ($conn->query($sql) === FALSE) {
    echo "Error: " . $conn->error;
}
        
$conn->close();

?>
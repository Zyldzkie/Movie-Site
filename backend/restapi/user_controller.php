<?php

include "../codes/connection.php";

// Function to create a new user
function createUser($conn, $email, $password, $name, $role) {
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    $query = "INSERT INTO Users (email, password, name, role) VALUES (:email, :password, :name, :role)";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':password', $hashedPassword);
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':role', $role);

    if ($stmt->execute()) {
        return "User created successfully!";
    } else {
        return "Error creating user.";
    }
}

// Function to retrieve all users
function getAllUsers($conn) {
    $query = "SELECT userId, email, name, role FROM Users";
    $stmt = $conn->prepare($query);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

// Function to retrieve a single user by ID
function getUserById($conn, $userId) {
    $query = "SELECT userId, email, name, role FROM Users WHERE userId = :userId";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':userId', $userId);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
}

// Function to update a user
function updateUser($conn, $userId, $email, $name, $role) {
    $query = "UPDATE Users SET email = :email, name = :name, role = :role WHERE userId = :userId";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':role', $role);
    $stmt->bindParam(':userId', $userId);

    if ($stmt->execute()) {
        return "User updated successfully!";
    } else {
        return "Error updating user.";
    }
}

// Function to delete a user
function deleteUser($conn, $userId) {
    $query = "DELETE FROM Users WHERE userId = :userId";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':userId', $userId);

    if ($stmt->execute()) {
        return "User deleted successfully!";
    } else {
        return "Error deleting user.";
    }
}

// Example usage
// Uncomment the following lines to test the functions
/*
include_once "../codes/connection.php"; // Include the connection
$conn = (new Database())->connect(); // Create a connection

// Create a user
echo createUser($conn, 'test@example.com', 'password123', 'Test User', 'Viewer');

// Get all users
print_r(getAllUsers($conn));

// Get user by ID
print_r(getUserById($conn, 1));

// Update a user
echo updateUser($conn, 1, 'new@example.com', 'Updated User', 'Editor');

// Delete a user
echo deleteUser($conn, 1);
*/
?>

<?php
// Database connection parameters
$servername = "localhost";
$username = "root"; // Replace with your MySQL username
$password = ""; // Replace with your MySQL password
$dbname = "student_portal_db"; // Replace with your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Query to fetch semester data
$sql = "SELECT * FROM semesters";
$result = $conn->query($sql);

$semesterData = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $semesterData[] = $row;
    }
}

// Close connection
$conn->close();

// Return JSON response
header('Content-Type: application/json');
echo json_encode($semesterData);
?>

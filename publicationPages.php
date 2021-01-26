<?php 
// ensures JSON data is piped through properly and text is parsed as UTF8 to avoid strange errors
header('Content-Type: application/json;charset=UTF-8');
$mysqli = new mysqli('127.0.0.1', 'webFetch', 'eQBZPlyjMjYxJ1FF', 'publication');
// Check db connection
if ($mysqli->connect_error) {
    die('Connect Error (' . $mysqli->connect_errno . ') '. $mysqli->connect_error);
}
$searchTerm = $_REQUEST["s"];
$searchTerm = preg_replace("/[^A-Za-z0-9]\s+/", '', $searchTerm);
$searchTerm = "'%".$searchTerm."%'";
$query = "SELECT count(id) from meta WHERE name LIKE " . $searchTerm . " LIMIT 1";
$result = $mysqli->query($query);
echo json_encode($result->fetch_row());

$result->free();
$mysqli->close();

/* Ramsey Shaban 2020 */
?>
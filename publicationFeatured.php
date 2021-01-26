<?php 
// ensures JSON data is piped through properly and text is parsed as UTF8 to avoid strange errors
header('Content-Type: application/json;charset=UTF-8');
$mysqli = new mysqli('127.0.0.1', 'webFetch', 'eQBZPlyjMjYxJ1FF', 'publication');
// Check db connection
if ($mysqli->connect_error) {
    die('Connect Error (' . $mysqli->connect_errno . ') '. $mysqli->connect_error);
}
$result = $mysqli->query("SELECT name,img,date,description,views,tag,id from featured");
echo json_encode($result->fetch_all());

$result->free();
$mysqli->close();

/* Ramsey Shaban 2020 */
?>
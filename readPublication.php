<?php
include "Parsedown.php";
header('Content-Type: application/json;charset=UTF-8');
$mysqli = new mysqli('127.0.0.1', 'webFetch', 'eQBZPlyjMjYxJ1FF', 'publication');
// Check db connection
if ($mysqli->connect_error) {
    die('Connect Error (' . $mysqli->connect_errno . ') '. $mysqli->connect_error);
}
$id = intval($_REQUEST["id"]);
/* fetch path according to ID  */
$query = "SELECT path FROM meta WHERE id = " . $id;
$path = $mysqli->query($query);
$path = "../res/uploads/publication/" . $path->fetch_row()[0];
$mdRaw = file_get_contents($path);

/* increment view counter */
$mysqli->query("UPDATE meta SET views = views+1 WHERE id = " . $id);

/* Fetch the MD and pass to the browser */
$Parsedown = new Parsedown();
//$Parsedown->setSafeMode(true); // Disallow embedded shit

echo json_encode($Parsedown->text($mdRaw));
$mysqli->close();

/* Ramsey Shaban 2020 */
?>
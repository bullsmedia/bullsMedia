<?php 
// ensures JSON data is piped through properly and text is parsed as UTF8 to avoid strange errors
header('Content-Type: application/json;charset=UTF-8');
$mysqli = new mysqli('127.0.0.1', 'webFetch', 'eQBZPlyjMjYxJ1FF', 'publication');
// Check db connection
if ($mysqli->connect_error) {
    die('Connect Error (' . $mysqli->connect_errno . ') '. $mysqli->connect_error);
}

$page = $_REQUEST["p"];
$filter = $_REQUEST["f"];
$search = $_REQUEST["s"];
$orderBy = $_REQUEST["o"];
$orderDirection = $_REQUEST["d"];

// Validate vars //
// Page number
if (is_int(intval($page))){
    $page = intval($page) * 10;
    $page = preg_replace("/\s+/",'',strval($page));
} else {
    $page = strval(0);
}
// Filter and Search
$filter = preg_replace("/[^A-Za-z0-9]/", '', $filter);
$filter = "'%".$filter."%'";
// tags and stuff
$search = preg_replace("/[^A-Za-z0-9]\s+/", '', $search);
$search = "'%".$search."%'";

/* Order by. The preg_replace strips white space so the
    user selection is interpreted properly by MySQL */
if (preg_replace("/\s+/", '', $orderBy) == "date"){
    $orderBy = "date";
} else if (preg_replace("/\s+/", '', $orderBy) == "name"){
    $orderBy = "name";
} else if (preg_replace("/\s+/", '', $orderBy) == "views"){
    $orderBy = "views";
} else {
    $orderBy = "date";
}
// Order Direction
if ($orderDirection == "down"){
    $orderDirection = "DESC";
} else if ($orderDirection == "up"){
    $orderDirection = "ASC";
} else{
    $orderDirection = "DESC";
}

// make the query and echo the result set
$query = "SELECT name,img,date,description,views,tag,id FROM meta WHERE name LIKE " . $search . " OR tag LIKE " . $search . " ORDER BY `meta`.`" . $orderBy . "`  " . $orderDirection . ", name ASC LIMIT " . $page . ", 10"; /* Horribly insecure. Only defense is validation. */
$result = $mysqli->query($query);
echo json_encode($result->fetch_all());

$result->free();
$mysqli->close();

/* Ramsey Shaban 2020 */
?>
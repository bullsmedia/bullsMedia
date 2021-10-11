<?php 
// ensures JSON data is piped through properly and text is parsed as UTF8 to avoid strange errors
header('Content-Type: application/json; charset=UTF-8');
$mysqli = new mysqli('localhost', 'webFetch', '[password]', 'bullsmedia_events');
// Check db connection
if ($mysqli->connect_error) {
    die('Connect Error');
}

// make the query and echo the result set
$query = "SELECT `name`,`physical_location`,`description`,`start_time`,`end_time`,`img`,`id` FROM events";
$result = $mysqli->query($query);
echo json_encode($result->fetch_all());

$result->free();
$mysqli->close();

class fetch {
    // Properties
    public $name;
    public $color;
  
    // Methods
    function set_name($name) {
        $this->name = $name;
    }
    function get_name() {
        return $this->name;
    }
}
  
?>
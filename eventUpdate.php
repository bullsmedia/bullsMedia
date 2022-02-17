<?php 
// ensures JSON data is piped through properly and text is parsed as UTF8 to avoid strange errors
header('Content-Type: application/json; charset=UTF-8');

class events {
    // Properties
    //public $name;
    //public $color;
    private $mysqli = new mysqli('localhost', 'webUpdate', 'password', 'bullsmedia_events');
    // Check db connection
    if ($mysqli->connect_error) {
        die($mysqli->connect_error);
    }
    // Methods
    function get(){
        // make the query and echo the result set
        $query = "SELECT `name`,`physical_location`,`description`,`start_time`,`end_time`,`img`,`id` FROM events";
        $result = $mysqli->query($query);
        echo json_encode($result->fetch_all());

        $result->free();
        $mysqli->close();
    }

    function add($name) {
        //$this->name = $name;
    }
    function delete($name, $location, $description, $start, $end, $img) {
        //return $this->name;
    }
}
?>
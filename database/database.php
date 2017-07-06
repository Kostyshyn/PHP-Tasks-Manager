<?php
    $servername = "localhost";
    $username = "root";
    $password = "mysql";

    // Create connection
    $conn = new mysqli($servername, $username, $password);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    } 
    echo "Connected successfully";

    class DataBase {
        
        private $connection;
        
        public function __construct(){
            
            $this->connection = "con";
            
        }
        
        public function __destruct(){
            
            
            
            echo "Destructed!";
        }
        
        public function greet($name){
    
            $exist;
            if ( $this->connection ){
                $exist = "true";
            } else {
                $exist = "false";
            }
            
            echo $exist;

        }
        
        
        
    }

?>
<?php

    class DataBase {
        
        private $servername = "localhost";
        private $username = "root";
        private $password = "mysql";
        private $db_name;
        private $connection;
        
        public function __construct($set_db_name){
            
            $this->db_name = $set_db_name;
            
            if (!$this->connection){
                
                $this->connection = new mysqli($this->servername, $this->username, $this->password, $this->db_name);
                
            }
            
        }
        
        public function __destruct(){
            
            $this->connection->close();
            
        }
        
        public function getTasks(){
            
            $data =  array();
            $sql = "SELECT * FROM `todos`";
            $result = $this->connection->query($sql);
            if ($result){
                while ($row = $result->fetch_assoc()){
                    $data[] = $row;   
                }
            }
            
            return $data;
            
        }
        
        public function create($task){
            
            $data;
            $sql = "INSERT INTO `todos` (task) VALUES ('". $task ."')";
            $result = $this->connection->query($sql);
            if ($this->connection->affected_rows > 0){
                $id = $this->connection->insert_id;
                $insert_sql = "SELECT * FROM `todos` WHERE `id`=" . $id;
                $res = $this->connection->query($insert_sql);
                if ($res){
                    $data = $res->fetch_assoc();
                    return $data;
                }
            }
            
        }
        
        public function delete($id){
            
            if ($id){
                $data;
                $sql = "DELETE FROM `todos` WHERE `id`=" . $id;
                $result = $this->connection->query($sql);
                if ($this->connection->affected_rows > 0){
                    $data = "Deleted";
                    return $data;
                } else {
                    return "ID is not valid";
                }
            }
        }
        
        public function done($id){
            
            $data;
            if ($id){
                $sql = "UPDATE `todos`SET done= !done WHERE `id`=" . $id;
                $result = $this->connection->query($sql);
                if ($this->connection->affected_rows > 0){
                    $update_sql = "SELECT * FROM `todos` WHERE `id`=" . $id;
                    $res = $this->connection->query($update_sql);
                    if ($res){
                        $data = $res->fetch_assoc();
                        return $data;
                    } 
                }                
            } else {
                return "ID is not valid";
            }
        }
        
    }

?>


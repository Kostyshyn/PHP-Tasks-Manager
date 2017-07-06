<?php
    
    require "../database/database.php";
        
    $db = new DataBase("ToDo-App");

    if (isset($_POST) && $_POST['action']){
        
        $action = $_POST['action'];
        
        switch ($action){
            case "create":{
                $task_name = $_POST['task'];
                if ($task_name){
                    $new_task = $db->create($task_name);
                    echo json_encode(array(
                        "status"=>"200",
                        "data"=>$new_task
                    ));                    
                } else {
                    echo json_encode(array(
                        "status"=>"400",
                        "data"=>"Missing Task Name"
                    ));
                }
                break;
            }
            case "get":{
                echo json_encode(array(
                    "status"=>"200",
                    "data"=>$db->getTasks()
                )); 
                break;
            }
            case "delete":{
                $id = $_POST['id'];
                if ($id){
                    $delete = $db->delete($id);
                    echo json_encode(array(
                        "status"=>"200",
                        "data"=>$delete
                    ));   
                } else {
                    echo json_encode(array(
                        "status"=>"400",
                        "data"=>"Missing ID"
                    ));
                }
                break;
            }
            case "done":{
                $id = $_POST['id'];
                if ($id){
                    $update = $db->done($id);
                    echo json_encode(array(
                        "status"=>"200",
                        "data"=>$update
                    ));   
                } else {
                    echo json_encode(array(
                        "status"=>"400",
                        "data"=>"Missing ID"
                    ));
                }
                break;
            }
            default:
                echo json_encode(array(
                    "status"=>"406",
                    "data"=>"Not accessible"
                )); 
                
        }
        
    }

?>
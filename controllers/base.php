<?php

    if (isset($_POST)){
        echo json_encode(array(
            "status"=>"OK",
            "data"=>$_POST
        ));
        
    }

?>
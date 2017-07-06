<!doctype html>

<html lang="en">
    <head>
        <meta charset="utf-8">

        <title>The HTML5 Herald</title>
        <link rel="stylesheet" href="public/css/style.css">
        <script src="public/js/core.js"></script> 
    </head>

    <body>
        
        <?php

            require "database/database.php";
        
            $db = new DataBase();
        
            echo "<hr>";

        ?>
<!--
        <section>
            <div class="tasks">
                <ul>
                    <li class="task">
                        Hello
                    </li>
                    <li class="task">
                        Hello
                    </li>
                </ul>
            </div>
            <div class="form">
                <form>
                
                    <input type="text" id="newTask">
                    
                    <button class="button">Add</button>
                    <span class="response"></span>
                
                </form>
            </div>
        </section>
-->
        <script src="public/js/index.js"></script>
    </body>
</html>
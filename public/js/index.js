//var payload = {
//    id: 3,
//    action: 'delete'
//};

// actions : create, done, delete, get

var Task = (function(){
    
    function get(callback){
        http.makeRequest({
            method: 'POST',
            url: 'controllers/base.php',
            credentials: {
                action: 'get'
            }
        }, function(data){
            if (data.status = 200){
                callback(data.data);
            } else {
                console.log('Response', data.data);   
            }
        }, function(err){
            console.log('Error', err);
        });   
    }; 
    
    function create(task, callback){
        if (task){
            http.makeRequest({
                method: 'POST',
                url: 'controllers/base.php',
                credentials: {
                    action: 'create',
                    task: task
                }
            }, function(data){
                if (data.status = 200){
                    callback(data.data);
                } else {
                    console.log('Response', data.data);   
                }
            }, function(err){
                console.log('Error', err);
            });    
        }  else {
            alert('Task name is required!');
        }      
    };
    
    function deleteTask(id, callback){
        if (id){
            http.makeRequest({
                method: 'POST',
                url: 'controllers/base.php',
                credentials: {
                    action: 'delete',
                    id: id
                }
            }, function(data){
                if (data.status = 200){
                   callback(data.data);
                } else {
                    console.log('Response', data.data);   
                }
            }, function(err){
                console.log('Error', err);
            });    
        }  else {
            console.error('Id is undefined');
        } 
    };
    
    function done(id, callback){
        if (id){
            http.makeRequest({
                method: 'POST',
                url: 'controllers/base.php',
                credentials: {
                    action: 'done',
                    id: id
                }
            }, function(data){
                if (data.status = 200){
                    callback(data.data);
                } else {
                    console.log('Response', data.data);   
                }
            }, function(err){
                console.log('Error', err);
            });    
        }  else {
            console.error('Id is undefined');
        } 
    };
    
    return {
        get: get,
        create: create,
        "delete": deleteTask,
        done: done
    }
})();

var input = document.querySelector('.form form input');
var button = document.querySelector('button.button');
var taskWrapper = document.querySelector('.tasks ul');

var taskTemplate = new Template([
    '<li class="task" data-id="{{ id }}">',
        '<p class="done{{ done }}">{{ task }}</p>',
        '<span class="check"></span>',
        '<span class="delete"></span>',
    '</li>'
]);

function bindEvents(){
    
    taskWrapper.addEventListener('click', function(e){
        if (e.target.className == 'check'){
            var check = e.target;
            var id = check.parentNode.getAttribute('data-id');
            
            Task.done(id, function(res){
                check.parentNode.childNodes[1].classList.toggle('done1');
            });

        } else if (e.target.className == 'delete'){
            var deleteTask = e.target;
            var id = deleteTask.parentNode.getAttribute('data-id');
            
            Task.delete(id, function(res){
                deleteTask.parentNode.remove();
            });
            
//            console.log('Delete', id);
        } else {
            return;
        }
    });
    
};

button.addEventListener('click', function(e){
    e.preventDefault();
    var task = input.value.trim();
    if (task == null || task == ''){
        alert('Task namy is required!');
    } else {
        Task.create(task, function(task){
            taskTemplate.render(task, function(err, result){
                taskWrapper.innerHTML += result;
                input.value = ''; 
            });
        });       
    }
});


function initialRender(){
    Task.get(function(tasks){
        taskTemplate.render(tasks, function(err, result){
            taskWrapper.innerHTML += result;
            bindEvents();
        });
    });
};

window.onload = initialRender;



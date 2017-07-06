var payload = {
//    task: 'Test5',
//    id: 3,
    action: 'get'
};

// actions : create, done, delete, get

http.makeRequest({
    method: 'POST',
    url: 'controllers/base.php',
    credentials: payload
}, function(data){
    if (data.status = 200){
        console.log('Response', data.data);
    } else {
        console.log('Response', data.data);   
    }
}, function(err){
    console.log('Error', err);
});




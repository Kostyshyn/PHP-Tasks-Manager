var payload = {
    task: 'Підготуватись до екзамену',
    action: 'create'
};

// actions : create, done, delete, get

http.makeRequest({
    method: 'POST',
    url: 'controllers/base.php',
    credentials: payload
}, function(data){
    console.log('Response', data.data);
}, function(err){
    console.log('Error', err);
});
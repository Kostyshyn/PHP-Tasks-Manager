var http = (function(){

	var makeRequest = function(options, resolve, reject){
		var method = options.method || 'GET';
		var limit = options.limit || null;
		var offset = options.offset || null;
		var async = options.async || true;
        var credentials = options.credentials || null;
		var url;
        var body = serialize(credentials);
        
        function serialize(val){
            if (val){
                var output = '';
                var keys = Object.keys(val);
                var keysLen = keys.length;
                if (keysLen == 1){
                    output += keys[0] + '=' + encodeURIComponent(val[keys[0]]);
                    return output;

                } else {
                    for (var key in val){
                        var payloadKey = encodeURIComponent(val.key);
                        output += key + '=' + encodeURIComponent(val[key]) + '&';
                    }
                    return output.slice(0, -1);
                }
            } else {
                return null;
            }
        };

		if (options.url){
			url = options.url;
			var request = new XMLHttpRequest();

			request.onload = function(){
				var res = request.responseText;
				var parsed = JSON.parse(res);
                
				var data;

				if (limit){
					data = parsed.slice(0, limit);
					resolve(data);
				} else if (offset) {
					data = parsed.slice(offset);
					resolve(data);		
				} else if (offset && limit ){
					data = parsed.slice(offset, offset + limit);
					resolve(data);
				} else {
					resolve(parsed);
				}
			};

			request.onerror = function(){
				var err = new Error('XHR failed');
				reject(err);
			};

			request.open(method, url, async);
            request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            
            request.send(body);
            
		} else {
			var err = new Error('URL is undefined');
			reject(err);
			return;
		}

	};

	return {
		makeRequest: makeRequest
	}

})();

function TemplateError(message){
	this.name = 'Template Error';
	this.message = message || 'prop is undefined';
};

TemplateError.prototype = Object.create(Error.prototype);

function Template(template){
	this.template = template;
};

Template.prototype.render = function(data, callback){
	if (Array.isArray(data)){
		var result = '';
		var self = this;
		data.forEach(function(item, i){
			var partial = self.template.join('\n').replace(/\{{(.+?)\}}/gi, function(matched, prop, offset){
				if (item[prop.trim()]){
					return item[prop.trim()];
				} else {
					var err = new TemplateError(prop.trim() + ' is undefined');
					callback(err, null);
				}
				
			});
			result += partial;
			if (i >= data.length - 1){
				callback(null, result);				
			}
		});
	} else {
		var result = this.template.join('\n').replace(/\{{(.+?)\}}/gi, function(matched, prop, offset){
			if (data[prop.trim()]){
				return data[prop.trim()];
			} else {
				var err = new TemplateError(prop.trim() + ' is undefined');
				callback(err, null);
			}
			
		});

		callback(null, result);
	}
};


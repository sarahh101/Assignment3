const fs = require("fs");

let categories= [];
let posts= [];

module.exports.initialize = function() {
    return new Promise((resolve, reject)=> {
        fs.readFile('./data/posts.json', (err,data)=> {  
            if(err) {
                reject(err);
            } else{
                posts = JSON.parse(data);
            resolve(posts); 
        }                  
    });                    

        fs.readFile('./data/categories.json', (err,data)=> {
            if(err) {
                reject("Unable to read file!"); 
                    } else {
                categories = JSON.parse(data);
            resolve(categories); 
        }
    });               
    });
        
}

module.exports.getAllPosts = function() {
    return new Promise((resolve, reject)=>{
        if (posts.length == 0) { 
            reject("File is empty, no posts to be displayed!");       
        }                      
        else {                 
            resolve(posts);      
        }
    });   
}

module.exports.getPublishedPosts = function() {
return new Promise((resolve, reject)=> {
var filteredPosts = [];                  
for (let i= 0; i < posts.length; i++){   
    if (posts[i].published == true) {    
        filteredPosts.push(posts[i]);    
    }                                    
}                                        
if(filteredPosts.length == 0) {          
    reject("No published posts found");  
}                                        
else {                                   
    resolve(filteredPosts);              
}                                        
});
}

module.exports.getCategories = function() {
    return new Promise((resolve, reject)=>{
        if (categories.length == 0) {        
            reject("File is empty, no categories to be displayed!");   
        }                                                              
        else {                                                         
            resolve(categories);                                       
        }                                                              

    });
}

module.exports.addPost = function (postData) {
    return new Promise(function (resolve, reject) {

        postData.published = (postData.published) ? true : false;
        postData.id = posts.length + 1;
        posts.push(postData);
        resolve(postData);
    });

}

module.exports.getPostByCategory = function(category) {
return new Promise (function (resolve, reject) {
    var filteredPostByCategory = [];
    for (let i = 0; i < posts.length; i++)
    if(posts[i].category == category) {
         filteredPostByCategory.push(posts[i]);
    }
    if(filteredPostByCategory.length == 0) {
        reject("no result returned");
    }
    else {
        resolve(filteredPostByCategory);
    }
});
}

// Add the getPostsByMinDate(minDateStr) Function  
module.exports.getPostsByMinDate = function(minDateStr){
    return new Promise (function (resolve,reject){
        var filteredPostByDate = [];
        for (let i = 0; i < posts.length; i++)
        if (posts[i].postDate >= minDateStr) {
                 filteredPostByDate.push(posts[i]);
        }
        if (new Date(filteredPostByDate.postDate) >= new Date(minDateStr)) {
            reject("The postDate value is greater than minDate Str")
        }
        else {
            resolve(filteredPostByDate);
        }
    });
}

module.exports.getPostById = function (id) {
    return new Promise (function (resolve, reject) {
        var filteredPostById = null;
        for (let i = 0; i < posts.length && !filteredPostById; i++)
if (posts[i].id == id) {
    filteredPostById= posts[i];
}
if (!filteredPostById) {
    reject("no result returned")
}
else {
    resolve(filteredPostById);
}
    });
}


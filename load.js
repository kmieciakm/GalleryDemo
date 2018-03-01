document.addEventListener("DOMContentLoaded",function(){
  let photo_amount_box = document.getElementById("photographs_amount");
  let followers_amount_box = document.getElementById("followers_amount");
  let following_amount_box = document.getElementById("following_amount");

  let profile_picture_box = document.getElementById("profile");
  let cover_picture_box = document.getElementById("cover");

  let add_btn = document.getElementById("follow_btn");

  //load JSON
  function LoadJSON(){
    let request = new XMLHttpRequest();
    request.onreadystatechange = function(){
      if(this.readyState == 4 && this.status == 200){
        var data = request.responseText;
        data = JSON.parse(data)[0];
        //show user stats
        photo_amount_box.innerHTML = data.photographs_amount + " photographs";
        followers_amount_box.innerHTML = data.followers + " followers";
        following_amount_box.innerHTML = data.following + " following";
        //load profile picture
        profile_picture_box.style.backgroundImage = data.profile_picture;
        cover_picture_box.style.backgroundImage = data.cover_picture;
      }
    }
    request.open("GET", "data.JSON", true);
    request.send();
    console.log("loaded");
  }

  function SendToJSON(prop,updated_data){
    let request = new XMLHttpRequest();
    request.onreadystatechange = function(){
      if(this.readyState == 4 && this.status == 200){
        var data = request.responseText;
        data = JSON.parse(data)[0];
        eval("data."+prop+"="+updated_data);
        console.log(eval("data."+prop));
        //To Do:
        // - learn Node.js
        // - change Json file 
        // :)
      }else{
        console.log("ERROR: " + this.status);
      }
    }
    request.open("GET", "data.JSON", true);
    request.send();
  }

  var GetFromJSON = function(prop){
    return new Promise(function(resolve,reject){
      let request = new XMLHttpRequest();
      request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
          var data = request.responseText;
          data = JSON.parse(data)[0];
          let output = eval("data."+prop);
          resolve(output);
        }
      }
      request.open("GET", "data.JSON", true);
      request.send();
    });
  } 

  function UpdateListener(){
    GetFromJSON("followers").then(function(odp){
      let new_followers = odp+1;
      SendToJSON("followers",new_followers);
    })
  }

  add_btn.addEventListener("click",UpdateListener);

  LoadJSON();
})

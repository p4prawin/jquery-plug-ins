
$.fn.imgLoaded = function(callback) {
   
   var container = this;
   var AllImages = this.find("img");
   var totalImages = AllImages.size();
 
    AllImages.on("load",function(){
      //console.log(this);
       $(this).addClass("imgloaded",true);
    }).error(function() {
      console.log('Image does not exist !!'+ $(this).attr("src"));
       $(this).addClass("imgloaded",true);
    });;

    var abc = function(thisObj){
          var LoadedImages = thisObj.find("img").filter(".imgloaded").size();
          //console.log(thisObj);
         
          var retry = thisObj.data("retry");
          if(isNaN(retry)){
              thisObj.data("retry",1);
              retry = 1;
          }
          
          console.log("LoadedImages: "+LoadedImages+" | totalImages: "+ totalImages+" | retry: "+retry);

          thisObj.data("loadedImages",LoadedImages);
          thisObj.data("totalImages",totalImages);
         
          if((LoadedImages!=totalImages) && (retry<=3)){
            //console.log("in if");
            retry++;
            thisObj.data("retry",retry);
            check(thisObj);
              //return false;
          }else{
              //console.log(callback);
             callback();
            return LoadedImages;  
          }
    };

    var check = function(ele){
      console.log(ele.find("img").filter(".imgloaded").size());
      setTimeout(function(){abc(ele);},2000);
    };
    
    setTimeout(function(){abc(container);},100);
    //abc(container);
};
 
//usage
var container = "#container";   //OR ".container";

 $(container).imgLoaded(function(params){
    console.log("do anything");
 });
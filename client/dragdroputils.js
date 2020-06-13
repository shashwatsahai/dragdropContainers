(function () {
//    $('.container').draggable({
//        start: function(event, ui){
          
//        },
//        stop: function(event, ui){
//            debugger
//        }
//    });
    $('.container').droppable({
         drop: function(event, ui){
           debugger;
         },
         
     });
   
   $('.inventory-item').draggable({
    start: function(event, ui){
       
    },
    revert: function(){
        return true;
    },
    stack: ".inventory-item",
    stop: function(event, ui){
      
    }
   });
  
})();
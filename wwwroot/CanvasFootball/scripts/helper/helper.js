function Dictionary(){
    this.items = [];
    this.hash = function(key){
        return hashMap(key,this.items);
    };
    this.add = function(item){
        this.items.push(item);
        return this.items;
    };
    this.addRange = function(array){
        for(var i=0;i<array.length;i++){
            this.add(array[i]);
        }
        return this.items;
    };    
    var hashMap = function(key,array){
      for(var i=0;i<array.length;i++){
          if (array[i].key == key)
              return array[i];
      }
    };
}
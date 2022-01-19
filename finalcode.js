var mapperFunction = function(){
    var samples=BATCH_UNIT;
    var batches=BATCH_SIZE;
    var startId=BATCH_ID;
    var lower = startId*samples;
    var upper = ((startId+batches-1)*samples)+samples-1;
    if(this.newid>=lower || this.newid<=upper){
    for(i=0;i<batches;i++){
    var x = startId + i;
    var y = x*samples;
    for(j=0;j<samples;j++){
    if(this.newid == (y+j)){
    if(METRICS == 'CPUUtilization_Average'){
    emit(x,this.CPUUtilization_Average);
    }
    if(METRICS == 'NetworkIn_Average'){
    emit(x,this.NetworkIn_Average);
    }
    if(METRICS == 'NetworkOut_Average'){
    emit(x,this.NetworkOut_Average);
    }
    if(METRICS == 'MemoryUtilization_Average'){
    emit(x,this.MemoryUtilization_Average);
    }
    }
    }
    }
    }
    };


var reducerFunction = function(key,values){
    var l=0;
    for(i in values){
    l=l+1;
    }
    var min = values[0];
    var max = values[0];
    var sum = 0;
    for(i=0;i<l;i++){
    sum = sum+values[i];
    if(values[i]<min){
    min=values[i];
    }
    if(values[i]>max){
    max=values[i];
    }
    }
    var mean=sum/l;
    var x =l/2;
    values.sort();
    if((l%2)==0){
    var mode = (values[x-1]+values[x])/2;
    }
    if((l%2)!=0){
    var mode = values[x+0.5-1];
    }
    var sdSum = 0;
    for(i=0;i<l;i++){
    sdSum=sdSum+((values[i]-mean)*(values[i]-mean));
    }
    var variance = sdSum/l;
    var sd = Math.sqrt(variance);
    return {'max':max, 'min':min, 'mode':mode, 'standard deviation':sd
    }
    };
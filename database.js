const mongoose = require('mongoose');
const Task = require('./tasks');
const cmd1 = process.argv[2];
const cmd2 = process.argv[3];
const cmd3 = process.argv[4];
const cmd4 = process.argv[5];



//  NOTE:- The database is empty please enter the values first and then only use other operations.


//  The operations should be in certain manner only. The syntax are given below.
//  CREATE:::   node database create title="<the title you want>" description="<The desc. you want>" isTrue="true/false"
//  UPDATE:::   node database update title="<The title in which you want changes>" changeThis="<The field you want to change(Only 1 at a time)>" value="<changes>"
//  FIND  :::   node database find
//  DELETE:::   node database remove title="<title of the desired data>"



// Database Initialization
const  dbURL = 'mongodb+srv://admin:admin@cluster0.jvqnc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(dbURL,{ useNewurlParser: true, useUnifiedTopology: true })
    .then((result) => console.log('Connected to DB'));


    
    
// Input Functions
if(cmd1 === 'create'){
    if(cmd2.startsWith('title') && cmd3.startsWith('description') && cmd4.startsWith('isTrue')){
        CreateFunc(cmd2.split('=')[1], cmd3.split('=')[1], cmd4.split('=')[1])
    }
    else{
            console.log('Enter the value properly')
    }
}
else if(cmd1 === 'update'){
    if(cmd2.startsWith('title') && cmd3.startsWith('changeThis') && cmd4.startsWith('value')){
        var myUpdateQ = { title: cmd2.split('=')[1]};

        if(cmd3.split('=')[1] === 'title'){
            var myUpdateT = { title : cmd4.split('=')[1] };
            UpdateFunction(myUpdateQ,myUpdateT);
        }
        else if(cmd3.split('=')[1] === 'description'){
            var myUpdateD = { Description : cmd4.split('=')[1] };
            UpdateFunction(myUpdateQ,myUpdateD);
        }
        else if(cmd3.split('=')[1] === 'isTrue'){
            var myUpdateI = { isTorF : cmd4.split('=')[1] };
            UpdateFunction(myUpdateQ,myUpdateI);
        }
        else{
            console.log('Enter the value properly')
        }
    }
    else{
        console.log('Enter the value properly')
    }
}
else if(cmd1 === 'remove'){
    if(cmd2.startsWith('title')){
        var myDeleteQ = { title: cmd2.split('=')[1]};
        DeleteFunc(myDeleteQ);
    }
}
else if(cmd1 === 'find'){
    
    FindFunc();
}
else{
    console.log('Enter the value properly')
}






// Create
function CreateFunc(titleC, DescriptionC, isTorFC){
    const task1 = new Task({
        title: titleC,
        description: DescriptionC,
        isTorF: isTorFC
    });
    task1.save()
     .then((result) => console.log(result));
}

// Find
function FindFunc(){
    Task.find({ idTorF: 'false'}, (error, data)=>{
        if(error){
            console.log(error)
        }
        else{
            console.log(data)
        }
    })
};




//Update
function UpdateFunction(myUpdateQ, myUpdate){
    Task.findOneAndUpdate(myUpdateQ, myUpdate , { new: true})
    .then(console.log('Updated'))
};

// Delete Function
function DeleteFunc(myQuery){
    Task.deleteOne(myQuery)
        .then(console.log('Deleted'))
};

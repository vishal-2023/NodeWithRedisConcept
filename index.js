const redis = require('redis');

const client = redis.createClient({
    host:'localhost',
    port:6397
})

client.on('error',(err) => {
    console.log("err in redis",err)
})

async function testController() {
    try{
        await client.connect();
        await client.set('name',"vishal singh")
        const del=await client.del('nam');
        console.log("del",del);
        await client.set('val',10)
        await client.incr('val')
        await client.decr('val')
        const val =await client.get('val');
        console.log("value => ",val);

    }catch(err){
        console.log("error ",err)
    }finally{
        await client.quit();
    }
}

// testController()

async function StringDataStructure (){
    try{ // string ==> get,set,mSet,mGet
        await client.connect();
        await client.mSet(['user:email','vishal@gmail.com','user:name',"vishal singh",'user:age','21','user:location','noida'])
        const [email,name,age,location]=await client.mGet(['user:email','user:name','user:age','user:location'])
        console.log("all info",email,name,age,location)
    }catch(err){
        console.log("err",err)
    }finally{
        await client.quit();
    }
}
StringDataStructure()
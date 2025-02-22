const redis = require('redis');

const client = redis.createClient({
    host: 'localhost',
    port: 6397
})

client.on('error', (err) => {
    console.log("err in redis", err)
})

async function testController() {
    try {
        await client.connect();
        await client.set('name', "vishal singh")
        const del = await client.del('nam');
        console.log("del", del);
        await client.set('val', 10)
        await client.incr('val')
        await client.decr('val')
        const val = await client.get('val');
        console.log("value => ", val);

    } catch (err) {
        console.log("error ", err)
    } finally {
        await client.quit();
    }
}

// testController()

async function StringDataStructure() {
    try { // string ==> get,set,mSet,mGet
        await client.connect();
        // await client.mSet(['user:email', 'vishal@gmail.com', 'user:name', "vishal singh", 'user:age', '21', 'user:location', 'noida'])
        // const [email, name, age, location] = await client.mGet(['user:email', 'user:name', 'user:age', 'user:location'])
        // console.log("all info",email,name,age,location)

        // list ==> LPUSH, RPUSH, LRANGE, LPOP, RPOP

        // await client.lPush('notes',[ 'note-1', 'note-2', 'note-3', 'note-4' ]);
        // const notes = await client.lRange('notes', 0, -1);  // Get all elements in the 'notes' list
        // console.log(notes);


        // set ==> sAdd , sMembers, sIsMember, sRem
        await client.sAdd('fruits',['apple','banana','Gauva','Pineapple']) // add set of fruits

       

        const exist = await client.sIsMember('fruits','banana')
        console.log("exist",exist)

        await client.sRem('fruits', 'banana'); // remove set value

        const getFruit = await client.sMembers('fruits'); // get afuits value
        console.log("get-fruits ",getFruit)

    } catch (err) {
        console.log("err", err)
    } finally {
        await client.quit();
    }
}
StringDataStructure()
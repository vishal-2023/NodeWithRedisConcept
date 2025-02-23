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
// StringDataStructure()

async function sortedSet() { // ZADD,ZRANGE,ZRANK,ZREM
    try{
        await client.connect();
        await client.zAdd("cart",[
            {
                score:100,
                value:"Cart-1"
            },
            {
                score:10,
                value:"Cart-2"
            },
            {
                score:300,
                value:"Cart-3"
            },
            {
                score:80,
                value:"Cart-4"
            },
        ])

        const getAllCartItem = await client.zRange("cart",0,-1)
        console.log(getAllCartItem); // get all cart items

        const getCart = await client.zRangeWithScores('cart',0,-1)
        console.log("get all cart",getCart)

    }catch(err){
        console.log("err", err)
    }finally{
        await client.quit();
    }
}

// sortedSet()

async function hSet() {  // Hashes => HSET,HGET, HGETALL, HDEL
    try{
        await client.connect();
        await client.hSet("Product:1",{
            name:"Product 1",
            description:"product 1 are highly rated..",
            rating:"5"
        })

        const getProductRating = await client.hGet("Product:1","description");
        // console.log("get rating",getProductRating)

        
        
        await client.hDel("Product:1","descripition")

        const getAllProductDetails = await client.hGetAll("Product:1");
        console.log("get-All-Details",getAllProductDetails);

        // pubsub concept , pipelining, transaction..
    }catch(err){
        console.log(err)
    }finally{
        client.quit();
    }
}

hSet()
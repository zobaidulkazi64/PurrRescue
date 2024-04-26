import client from "./client";



async function init() {


    await client.set("user:2", "hello world", )
    // await client.set("user:3", "hello Bangladesh",)

    // await client.expire("user:2", 10)
    const res = await client.get("user:2")
    const res2 = await client.get("user:3")

    console.log(res)
    console.log(res2)
}

export default init
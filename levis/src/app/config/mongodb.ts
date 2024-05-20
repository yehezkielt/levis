import { MongoClient, ServerApiVersion } from "mongodb";
const uri =
    "mongodb+srv://yehezkieltatang1:tatang12345@cluster0.qeml8zj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// process.env.MONGO_URI as string;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

export const database = client.db("levis");

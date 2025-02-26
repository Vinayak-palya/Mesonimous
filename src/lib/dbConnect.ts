import mongoose from "mongoose";
type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
    // for preventing database choking
    if(connection.isConnected) {
        console.log("Connection is already established");
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGO_DB_URI || "", {});
        console.log(db);
        connection.isConnected = db.connections[0].readyState;
        console.log("Connection established succesfully", "\n");
    } catch (error) {
        console.error("Error connecting to database", error);
        process.exit(1);
    }
}

export default dbConnect;

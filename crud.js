const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

async function main() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");

        const db = client.db("CollegeDB");
        const students = db.collection("student");

        // Clear old data
        await students.deleteMany({});

        // Insert data
        await students.insertMany([
            { name: "Rahul", age: 18, Dept: "CSE" },
            { name: "Aman", age: 22, Dept: "CSE" },
            { name: "Priya", age: 25, Dept: "ISE" },
            { name: "Neha", age: 28, Dept: "ECE" },
            { name: "Ravi", age: 45, Dept: "CSE" },
            { name: "Kiran", age: 50, Dept: "ME" }
        ]);

        console.log("\nData Inserted");

        // Display all records
        console.log("\nAll Students");
        console.log(await students.find().toArray());

        // Age > 40
        console.log("\nAge > 40");
        console.log(
            await students.find({ age: { $gt: 40 } }).toArray()
        );

        // Age < 20
        console.log("\nAge < 20");
        console.log(
            await students.find({ age: { $lt: 20 } }).toArray()
        );

        // Age between 20 and 30
        console.log("\nAge Between 20 and 30");
        console.log(
            await students.find({
                age: { $gte: 20, $lte: 30 }
            }).toArray()
        );

        // CSE Students
        console.log("\nCSE Students");
        console.log(
            await students.find({ Dept: "CSE" }).toArray()
        );

        // CSE and Age > 20
        console.log("\nCSE Students Age > 20");
        console.log(
            await students.find({
                Dept: "CSE",
                age: { $gt: 20 }
            }).toArray()
        );

        // Age not equal to 25
        console.log("\nAge != 25");
        console.log(
            await students.find({
                age: { $ne: 25 }
            }).toArray()
        );

        // Display only name and age
        console.log("\nName and Age Only");
        console.log(
            await students.find(
                {},
                {
                    projection: {
                        name: 1,
                        age: 1,
                        _id: 0
                    }
                }
            ).toArray()
        );

        // Sort ascending
        console.log("\nAge Ascending");
        console.log(
            await students.find().sort({ age: 1 }).toArray()
        );

        // Sort descending
        console.log("\nAge Descending");
        console.log(
            await students.find().sort({ age: -1 }).toArray()
        );

        // First 5 records
        console.log("\nFirst 5 Records");
        console.log(
            await students.find().limit(5).toArray()
        );

        // Update
        await students.updateOne(
            { name: "Rahul" },
            { $set: { age: 20 } }
        );

        console.log("\nAfter Updating Rahul");
        console.log(
            await students.find({ name: "Rahul" }).toArray()
        );

        // Delete
        await students.deleteOne({ name: "Rahul" });

        console.log("\nAfter Deleting Rahul");
        console.log(
            await students.find().toArray()
        );

    } catch (err) {
        console.log("Error:", err);
    } finally {
        await client.close();
    }
}

main(); 

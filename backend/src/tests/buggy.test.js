const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../server");
const Buggy = require("../models/Buggy");

let mongd;

beforeAll(async ()=>{
    mongd = await MongoMemoryServer.create();
    const uri = mongd.getUri();
    await mongoose.connect(uri);
});

afterAll(async ()=> {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongd.stop();
});

afterEach(async ()=>{
    await Buggy.deleteMany({});
});

describe("Todo API", ()=> {
    test("Post /api/buggys create a buggy", async ()=> {
        const res = await request(app).post("/api/buggys").send({ title: "Testing"});
        expect(res.statusCode).toBe(201);
        expect(res.body).toMatchObject({ title: "Testing", completed: false });
    });

    test("GET /api/buggys returns list", async () => {
        await Buggy.create({ title: "A" });
        await Buggy.create({ title: "B" });
        const res = await request(app).get("/api/buggys");
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(2);
    });

    test("PUT /api/buggys/:id toggles completed", async () => {
        const buggy = await Buggy.create({ title: "Toggle me" });
        const res = await request(app).put(`/api/buggys/${buggy._id}`).send({ completed: true });
        expect(res.statusCode).toBe(200);
        expect(res.body.completed).toBe(true);
    });


    test("DELETE /api/buggys/:id removes buggy", async () => {
        const buggy = await Buggy.create({ title: "Delete me" });
        const res = await request(app).delete(`/api/buggys/${buggy._id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ message: "Deleted" });
        const remain = await Buggy.findById(buggy._id);
        expect(remain).toBeNull();
    });

})
import response from "supertest";
import app from "../index.js";
import mongoose from "mongoose";
describe("User", () => {
  it("should get all users", async (done) => {
    response(app).get("/all-users").expect(200);
    done();
  });
});

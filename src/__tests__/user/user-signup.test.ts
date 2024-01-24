import app from "../../app";
import { describe, beforeAll, afterAll, it } from "vitest";
import request from "supertest";
import deleteUser from "../utils/delete-user";
import signUpNewUser from "../utils/create-user";
import type User from "interfaces/user";

let user: User;

describe("POST /user/signup", () => {
  beforeAll(async () => {
    user = await signUpNewUser();
    user.token = undefined;
  });

  afterAll(async () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    await deleteUser(user.username as string);
  });

  it("should respond with a 400 status code if sent any invalid data", async () => {
    await request(app)
      .post("/user/signup")
      .send({
        username: "username12@",
        email: user.email,
        password: user.password,
      })
      .expect(400);
  });

  it("should respond with a 400 status code for an existing username or email", async () => {
    await request(app)
      .post("/user/signup")
      .send({
        username: user.username,
        email: user.email,
        password: user.password,
      })
      .expect(400);
  });

  it("should respond with a 400 status code if receive an empty body", async () => {
    await request(app).post("/user/signup").send({}).expect(400);
  });
});

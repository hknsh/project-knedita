import app from "../../app";
import { describe, beforeAll, it } from "vitest";
import request from "supertest";
import signUpNewUser from "../utils/create-user";
import type User from "interfaces/user";

let user: User;

describe("DELETE /user/delete", () => {
  beforeAll(async () => {
    user = await signUpNewUser();
  });

  it("should delete the user successfully", async () => {
    await request(app)
      .post("/user/delete")
      .set("Authorization", `Bearer ${user.token ?? ""}`)
      .expect(200);
  });
});

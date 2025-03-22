import { DB } from "@/db/types";
import { Kysely } from "kysely";

export class Database extends Kysely<DB> {}

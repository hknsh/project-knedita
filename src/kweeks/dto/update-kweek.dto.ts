import { PartialType } from "@nestjs/swagger";
import { CreateKweekDto } from "./create-kweek.dto";

export class UpdateKweekDto extends PartialType(CreateKweekDto) {}

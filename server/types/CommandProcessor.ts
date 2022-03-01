import { User } from "./User";

interface CommandProcessor {
  name: string;
  Processor: (command: string, user: User) => void;
}

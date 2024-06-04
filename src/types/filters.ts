import { type SetId } from "../lib/rune.mapping";
import { type SlotId } from "./rune";

export type Filters = {
  sets: SetId[];
  slots: SlotId[];
};

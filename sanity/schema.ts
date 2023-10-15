import { type SchemaTypeDefinition } from "sanity";

import blockContent from "./schemas/blockContent";
import category from "./schemas/docs/category";
import event from "./schemas/docs/event";
import globals from "./schemas/docs/globals";
import page from "./schemas/docs/page";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [event, category, page, globals, blockContent],
};

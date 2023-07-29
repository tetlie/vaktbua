import { type SchemaTypeDefinition } from "sanity";

import blockContent from "./schemas/blockContent";
import category from "./schemas/docs/category";
import event from "./schemas/docs/event";
import globals from "./schemas/docs/globals";
import post from "./schemas/docs/post";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [event, category, post, globals, blockContent],
};

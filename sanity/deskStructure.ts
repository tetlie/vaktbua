import { MdEvent, MdCategory } from "react-icons/md";

const defaultListingsToBeRemoved = ["globals", "event", "page", "category"];
export const structure = (S: any, context: any) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Globals")
        .icon(() => "⛓️")
        .child(S.document().schemaType("globals").documentId("globals")),
      S.divider(),
      // List out the rest of the document types
      ...S.documentTypeListItems().filter(
        (listItem: any) => ![...defaultListingsToBeRemoved].includes(listItem.getId())
      ),
      // Add a new list item
      S.listItem()
        .title("Subpages")
        .icon(() => "📄")
        .schemaType("category")
        .child(S.documentTypeList("page")),
      S.divider(),
      S.listItem()
        .title("Events")
        .icon(() => "🗓️")
        .schemaType("event")
        .child(S.documentTypeList("event")),
      S.listItem()
        .title("Categories")
        .icon(() => "💭")
        .schemaType("category")
        .child(S.documentTypeList("category")),
    ]);

type Base = {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string
  _updatedAt: string;
}

interface Event extends Base {
  title: string;
  slug: Slug;
  body: Block[];
  categories: Category[];
  mainImage: Image;
  description: string;
  mainImage: Image;
}

interface Category extends Base {
  title: string;
  description: string;
}

interface Image {
  _type: "image";
  asset: Reference;
}

interface Reference {
  _ref: string;
  _type: "reference";
}

interface Slug {
  _type: "slug";
  current: string;
}

interface Span {
  _key: string;
  _type: "span";
  marks: string[];
  text: string;
}

interface Block {
  _key: string;
  _type: "block";
  children: Span[];
  markDefs: any[];
  style: "normal", "h1", "h2", "h3", "h4", "blockquote";
}
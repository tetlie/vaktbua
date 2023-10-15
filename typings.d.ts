type Base = {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
};

interface Event extends Base {
  title: string;
  slug: Slug;
  body: Block[];
  categories: Category[];
  image: Image;
  description: string;
  dateTimeStart: string;
  ticketUrl: string;
}

interface Page extends Base {
  title: string;
  slug: Slug;
  body: Block[];
  image: Image;
  description: string;
}

interface SoMeLink {
  title: string;
  url: string;
}

interface OpeningHours {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}

interface Globals extends Base {
  title: string;
  description: string;
  image: Image;
  ticketUrl: string;
  soMeLinks: SoMeLink[];
  openingHours: OpeningHours;
  contact: {
    email: string;
    address: string;
  };
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
  style: "normal";
  h1;
  h2;
  h3;
  h4;
  blockquote;
}

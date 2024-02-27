// Get arguments passed on command line
const userArgs = process.argv.slice(2);

// const Book = require("./models/book");
// const Author = require("./models/author");
// const Genre = require("./models/genre");
// const BookInstance = require("./models/bookinstance");

const Item = require("./models/item");
const Category = require("./models/category");
const Brand = require("./models/brand");
const ItemInstance = require("./models/itemInstance");

// const genres = [];
// const authors = [];
// const books = [];
// const bookinstances = [];

const brands = [];
const items = [];
const categories = [];
const iteminstances = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  // await createGenres();
  // await createAuthors();
  // await createBooks();
  // await createBookInstances();
  await createCategories();
  await createBrands();
  await createItems();
  await createItemInstances();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// genre[0] will always be the Fantasy genre, regardless of the order
// in which the elements of promise.all's argument complete.
// async function genreCreate(index, name) {
//   const genre = new Genre({ name: name });
//   await genre.save();
//   genres[index] = genre;
//   console.log(`Added genre: ${name}`);
// }

async function categoryCreate(index, name, description) {
  const category = new Category({ name: name, description: description });
  await category.save();
  categories[index] = category;
  console.log(`Added genre: ${name}`);
}

async function brandCreate(index, name) {
  const brand = new Brand({ name: name });
  await brand.save();
  brands[index] = brand;
  console.log(`Added brand: ${name}`);
}

// async function itemCreate(index, title, summary, isbn, author, genre) {
//   const bookdetail = {
//     title: title,
//     summary: summary,
//     author: author,
//     isbn: isbn,
//   };
//   if (genre != false) bookdetail.genre = genre;

//   const book = new Book(bookdetail);
//   await book.save();
//   books[index] = book;
//   console.log(`Added book: ${title}`);
// }

async function itemCreate(index, title, description, category, brand, price) {
  const itemdetail = {
    title: title,
    description: description,
    brand: brand,
    category: category,
    price: price,
  };
  if (category != false) itemdetail.category = category;

  const item = new Item(itemdetail);
  await item.save();
  items[index] = item;
  console.log(`Added item: ${title}`);
}

async function itemInstanceCreate(index, item, stock) {
  const iteminstancedetail = {
    item: item,
    stock: stock,
  };

  const iteminstance = new ItemInstance(iteminstancedetail);
  await iteminstance.save();
  iteminstances[index] = iteminstance;
  console.log(`Added iteminstance: ${item}`);
}

async function createCategories() {
  console.log("Adding categories");
  await Promise.all([
    categoryCreate(0, "Senior Tennis Rackets", "Tennis rackets for adults"),
    categoryCreate(1, "Junior Tennis Rackets", "Tennis rackets for children"),
  ]);
}

async function createBrands() {
  console.log("Adding brands");
  await Promise.all([
    brandCreate(0, "Wilson"),
    brandCreate(1, "HEAD"),
    brandCreate(2, "Babolat"),
    brandCreate(3, "Prince"),
  ]);
}

async function createItems() {
  console.log("Adding Books");
  await Promise.all([
    itemCreate(
      0,
      "Wilson Blade 100 V7.0",
      "Wilson Blade 100 V7.0 ",
      [categories[0]],
      [brands[0]],
      159.95
    ),
  ]);
}
// async function createItems() {
//   console.log("Adding Books");
//   await Promise.all([
//     itemCreate(
//       0,
//       "The Name of the Wind (The Kingkiller Chronicle, #1)",
//       "I have stolen princesses back from sleeping barrow kings. I burned down the town of Trebon. I have spent the night with Felurian and left with both my sanity and my life. I was expelled from the University at a younger age than most people are allowed in. I tread paths by moonlight that others fear to speak of during day. I have talked to Gods, loved women, and written songs that make the minstrels weep.",
//       "9781473211896",
//       authors[0],
//       [genres[0]]
//     ),
//     itemCreate(
//       1,
//       "The Wise Man's Fear (The Kingkiller Chronicle, #2)",
//       "Picking up the tale of Kvothe Kingkiller once again, we follow him into exile, into political intrigue, courtship, adventure, love and magic... and further along the path that has turned Kvothe, the mightiest magician of his age, a legend in his own time, into Kote, the unassuming pub landlord.",
//       "9788401352836",
//       authors[0],
//       [genres[0]]
//     ),
//     itemCreate(
//       2,
//       "The Slow Regard of Silent Things (Kingkiller Chronicle)",
//       "Deep below the University, there is a dark place. Few people know of it: a broken web of ancient passageways and abandoned rooms. A young woman lives there, tucked among the sprawling tunnels of the Underthing, snug in the heart of this forgotten place.",
//       "9780756411336",
//       authors[0],
//       [genres[0]]
//     ),
//     itemCreate(
//       3,
//       "Apes and Angels",
//       "Humankind headed out to the stars not for conquest, nor exploration, nor even for curiosity. Humans went to the stars in a desperate crusade to save intelligent life wherever they found it. A wave of death is spreading through the Milky Way galaxy, an expanding sphere of lethal gamma ...",
//       "9780765379528",
//       authors[1],
//       [genres[1]]
//     ),
//     itemCreate(
//       4,
//       "Death Wave",
//       "In Ben Bova's previous novel New Earth, Jordan Kell led the first human mission beyond the solar system. They discovered the ruins of an ancient alien civilization. But one alien AI survived, and it revealed to Jordan Kell that an explosion in the black hole at the heart of the Milky Way galaxy has created a wave of deadly radiation, expanding out from the core toward Earth. Unless the human race acts to save itself, all life on Earth will be wiped out...",
//       "9780765379504",
//       authors[1],
//       [genres[1]]
//     ),
//     itemCreate(
//       5,
//       "Test Book 1",
//       "Summary of test book 1",
//       "ISBN111111",
//       authors[4],
//       [genres[0], genres[1]]
//     ),
//     itemCreate(
//       6,
//       "Test Book 2",
//       "Summary of test book 2",
//       "ISBN222222",
//       authors[4],
//       false
//     ),
//   ]);
// }

async function createItemInstances() {
  console.log("Adding item instances");
  await Promise.all([itemInstanceCreate(0, items[0], 14)]);
}
// async function createItemInstances() {
//   console.log("Adding item instances");
//   await Promise.all([
//     itemInstanceCreate(
//       0,
//       books[0],
//       "London Gollancz, 2014.",
//       false,
//       "Available"
//     ),
//     itemInstanceCreate(1, books[1], " Gollancz, 2011.", false, "Loaned"),
//     itemInstanceCreate(2, books[2], " Gollancz, 2015.", false, false),
//     itemInstanceCreate(
//       3,
//       books[3],
//       "New York Tom Doherty Associates, 2016.",
//       false,
//       "Available"
//     ),
//     itemInstanceCreate(
//       4,
//       books[3],
//       "New York Tom Doherty Associates, 2016.",
//       false,
//       "Available"
//     ),
//     itemInstanceCreate(
//       5,
//       books[3],
//       "New York Tom Doherty Associates, 2016.",
//       false,
//       "Available"
//     ),
//     itemInstanceCreate(
//       6,
//       books[4],
//       "New York, NY Tom Doherty Associates, LLC, 2015.",
//       false,
//       "Available"
//     ),
//     itemInstanceCreate(
//       7,
//       books[4],
//       "New York, NY Tom Doherty Associates, LLC, 2015.",
//       false,
//       "Maintenance"
//     ),
//     itemInstanceCreate(
//       8,
//       books[4],
//       "New York, NY Tom Doherty Associates, LLC, 2015.",
//       false,
//       "Loaned"
//     ),
//     itemInstanceCreate(9, books[0], "Imprint XXX2", false, false),
//     itemInstanceCreate(10, books[1], "Imprint XXX3", false, false),
//   ]);
// }

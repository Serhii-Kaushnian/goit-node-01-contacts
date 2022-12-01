const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");
const contactsPath = path.join(__dirname, "./db/contacts.json");
const updateBooks = async (books) => {
  fs.writeFile(contactsPath, JSON.stringify(books, null, 2));
};
const getAllContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
};
const addContact = async ({ name, email, phone }) => {
  const newBook = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  const contacts = await getAllContacts();
  contacts.push(newBook);
  await updateBooks(contacts);
  return newBook;
};
const getContactById = async (id) => {
  const contacts = await getAllContacts();
  const oneContact = contacts.find((contact) => contact.id === id);
  return oneContact || null;
};
const removeContactById = async (id) => {
  const contacts = await getAllContacts();
  const index = contacts.findIndex((contact) => contact.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await updateBooks(contacts);
  return result;
};
module.exports = {
  getAllContacts,
  addContact,
  getContactById,
  removeContactById,
};

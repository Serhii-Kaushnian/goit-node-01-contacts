const { Command } = require("commander");
// const argv = require("yargs").argv;
const {
  getAllContacts,
  addContact,
  getContactById,
  removeContactById,
} = require("./contacts");
const contactList = require("./db/contacts.json");

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const data = await getAllContacts();
      console.log("data: ", data);
      break;

    case "get":
      const contact = await getContactById(id);
      console.log("contact: ", contact);
      break;

    case "add":
      const newBook = await addContact({ name, email, phone });
      console.log("newBook: ", newBook);
      break;

    case "remove":
      const newContactsList = await removeContactById(id);
      console.log("newContactsList: ", newContactsList);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);

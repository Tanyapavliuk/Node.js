const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts.js");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const all = await listContacts();
      console.table(all);
      break;

    case "get":
      // ... id
      const searchContact = await getContactById(id);
      console.log(searchContact);
      break;

    case "add":
      // ... name email phone
      const addNewContact = await addContact(name, email, phone);
      console.log(addNewContact);
      break;

    case "remove":
      // ... id
      const removeContactItem = await removeContact(id);
      console.log(removeContactItem);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};
// invokeAction({ action: "list" });
// invokeAction({ action: "get", id: "E3fSYh-Db7Ur5liVxDP-W" });
// invokeAction({
//   action: "add",
//   name: "tanya",
//   email: "tanya@gmail.com",
//   phone: "+380634761210",
// });
// invokeAction({ action: "remove", id: "ZO0ux49Op9lawXf2qtwpp" });
invokeAction(argv);

import * as contactsOperation from "./contacts.js";
import yargs from "yargs";

// const argv = require("yargs").argv;

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContact = contactsOperation
        .listContacts()
        .then((contacts) => contacts)
        .catch((error) => console.log(error.message));
      return allContact.then((contacts) => console.log(contacts));
    case "get":
      const contact = contactsOperation
        .getContactById(id)
        .then((contact) => contact)
        .catch((error) => console.log(error.message));
      return contact.then((contact) => console.log(contact));
    case "add":
      const newContact = contactsOperation
        .addContact(name, email, phone)
        .then((newContact) => newContact)
        .catch((error) => console.log(error.message));
      return newContact.then((newContact) => console.log(newContact));
    case "remove":
      const removeContact = contactsOperation
        .removeContact(id)
        .then((removeContact) => removeContact)
        .catch((error) => console.log(error.message));
      return removeContact.then((removeContact) => console.log(removeContact));
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}
const { argv } = yargs(process.argv.slice(2));
invokeAction(argv);
// invokeAction({ action: "list" });
// invokeAction({ action: "get", id: "qdggE76Jtbfd9eWJHrssH" });

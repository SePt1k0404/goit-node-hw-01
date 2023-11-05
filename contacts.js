import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");

export function listContacts() {
  return fs
    .readFile(contactsPath)
    .then((contacts) => JSON.parse(contacts.toString()))
    .catch((error) => {
      console.log(error.message);
      return [];
    });
}

export function getContactById(contactId) {
  return listContacts()
    .then((contacts) => {
      const contact = contacts.find((el) => el.id === contactId);
      return contact || null;
    })
    .catch((error) => {
      console.log(error.message);
      return null;
    });
}

export function removeContact(contactId) {
  return listContacts()
    .then((contacts) => {
      const contactIndex = contacts.findIndex((el) => el.id === contactId);
      if (contactIndex === -1) {
        return null;
      }
      const [result] = contacts.splice(1, contactIndex);
      fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
      return result;
    })
    .catch((error) => {
      console.log(error.message);
      return null;
    });
}

export function addContact(name, email, phone) {
  return listContacts()
    .then((contacts) => {
      const newContact = {
        id: nanoid(),
        name,
        email,
        phone,
      };
      contacts.push(newContact);
      fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
      return newContact;
    })
    .catch((error) => {
      console.log(error.message);
    });
}

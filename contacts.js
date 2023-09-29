const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");
const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  // ...твій код. Повертає масив контактів.
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
  const all = await listContacts();
  const contactWithId = all.find((item) => item.id === contactId);
  return contactWithId || null;
}

async function addContact(name, email, phone) {
  // ...твій код. Повертає об'єкт доданого контакту.
  const all = await listContacts();
  const newContact = { name, email, phone, id: nanoid() };
  all.push(newContact);

  fs.writeFile(contactsPath, JSON.stringify(all, null, 2));
  return newContact;
}

async function removeContact(contactId) {
  // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
  const all = await listContacts();
  const removeContactIndex = all.findIndex((item) => item.id === contactId);

  if (removeContactIndex === -1) return null;

  const item = all.splice(removeContactIndex, 1);
  fs.writeFile(contactsPath, JSON.stringify(all, null, 2));
  return item;
}

module.exports = { listContacts, getContactById, removeContact, addContact };

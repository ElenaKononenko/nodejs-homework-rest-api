const fs = require("fs/promises");
const path = require("path");
const { v4: uuid } = require("uuid");

const readData = async () => {
  const data = await fs.readFile(path.join(__dirname, "contacts.json"), "utf8");
  return JSON.parse(data);
};

const writeFile = async (data) => {
  await fs.writeFile(
    path.join(__dirname, "contacts.json"),
    JSON.stringify(data)
  );
};

const listContacts = async () => {
  return await readData();
};

const getContactById = async (id) => {
  const data = await readData();
  const [result] = data.filter((contact) => contact.id == id);
  return result;
};

const removeContact = async (id) => {
  const data = await readData();
  const index = data.findIndex((contact) => contact.id == id);
  if (index !== -1) {
    const result = data.splice(index, 1);
    writeFile(data);
    return result;
  }
  return null;
};

const addContact = async (body) => {
  const id = uuid();
  const contact = {
    id,
    ...body,
  };
  const data = await readData();
  data.push(contact);
  writeFile(data);
  return contact;
};

const updateContact = async (id, body) => {
  const contacts = await readData();
  const contactToUpdate = contacts.find((contact) => contact.id == id);
  if (contactToUpdate) {
    Object.assign(contactToUpdate, body);
    await writeFile(contacts);
  }
  return contactToUpdate;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};

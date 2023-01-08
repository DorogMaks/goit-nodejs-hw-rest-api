const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.resolve(__dirname, './contacts.json');

const readContacts = async () => {
  try {
    const contactsRaw = await fs.readFile(contactsPath);
    const contacts = await JSON.parse(contactsRaw);
    return contacts;
  } catch (error) {
    console.error(error);
  }
};

const writeContacts = async (data) => {
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
};

const listContacts = async () => {
  return await readContacts();
};

const getContactById = async (contactId) => {
  const contacts = await readContacts();
  const contact = await contacts.find(
    (contact) => contact.id === contactId.toString()
  );

  return contact || null;
};

const addContact = async (body) => {
  const contacts = await readContacts();
  const newContact = { id: nanoid(5), ...body };
  const updatedContacts = [...contacts, newContact];

  await writeContacts(updatedContacts);

  return newContact;
};

const removeContact = async (contactId) => {
  const contacts = await readContacts();
  const updatedContacts = contacts.filter(
    (contact) => contact.id !== contactId
  );

  await writeContacts(updatedContacts);
};

const updateContact = async (contactId, body) => {
  const contacts = await readContacts();
  const contact = await getContactById(contactId);
  if (!contact) {
    return null;
  }

  const updatedContact = { ...contact, ...body };

  const updatedContacts = contacts.reduce((acc, contact) => {
    if (contact.id === contactId) {
      contact = { ...updatedContact };
    }
    return [...acc, contact];
  }, []);

  await writeContacts(updatedContacts);

  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};

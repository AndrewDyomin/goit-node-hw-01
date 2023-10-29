const fs = require("node:fs/promises");
const path = require('node:path');
const crypto = require('node:crypto');
const { writeFile } = require("node:fs");

const contactsPath = path.join(__dirname, "./db/contacts.json");

// TODO: задокументировать каждую функцию
async function listContacts() {
    const data = await fs.readFile(contactsPath, {encoding: "utf-8"});

    return JSON.parse(data);
  }
  
async function getContactById(contactId) {

  const data = await fs.readFile(contactsPath, {encoding: "utf-8"})

  const targetContact = JSON.parse(data).find(contact => contact.id === contactId);
      if (targetContact === undefined) {
        return null;
      }
      return targetContact;
  }
  
async function removeContact(contactId) {
    const data = await listContacts();
    const targetContact = data.find(contact => contact.id === contactId);
    if (targetContact === undefined) {
      return null;
    }
    const newData = data.filter(contact => contact.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(newData, undefined, 2));
    return targetContact;
  }
  
async function addContact(name, email, phone) {
    const data = await listContacts();
    const newContact = { id: crypto.randomUUID(), name: name, email: email, phone: phone };
    const targetContact = data.find(contact => contact.name === name);
    if (targetContact !== undefined) {
      console.log(`${name} is already in contacts`);
      return;
    } 
      const newData = [ ...data, newContact ];
      await fs.writeFile(contactsPath, JSON.stringify(newData, undefined, 2));
      return newContact;
  }

  module.exports = { listContacts, getContactById, removeContact, addContact };
  
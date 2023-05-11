// const fs = require("fs/promises");
// const path = require("path");
// const { contact } = require("../helpers/schema");

// // listContacts
// const listContacts = async () => {
//   return await contact.find({});
// };

// // getContactById
// const getContactById = async (contactId) => {
//   return await contact.findById({ _id: contactId });
// };

// // removeContact
// const removeContact = async (contactId) => {
//   const foundContact = await contact.findByIdAndRemove({ _id: contactId });
//   if (!foundContact) return;
//   return { message: "contact deleted" };
// };

// // addContact
// const addContact = async ({ name, email, phone }) => {
//   return await contact.create({ name, email, phone });
// };

// // updateContact
// const updateContact = async (contactId, { name, email, phone }) => {
//   return await contact.findOneAndUpdate(
//     { _id: contactId },
//     { name, email, phone },
//     { new: true }
//   );
// };

// // updateStatusContact (favorite field)
// const updateStatusContact = async (contactId, { favorite }) => {
//   return await contact.findOneAndUpdate(
//     { _id: contactId },
//     { favorite },
//     { new: true }
//   );
// };

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
//   updateStatusContact,
// };

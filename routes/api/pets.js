const express = require("express");
const router = new express.Router();
const tryCatchMiddleware = require("../../middlewares/tryCatchMiddleware");

// const {
//   getAllContactsController,
//   getContactByIdController,
//   addContactController,
//   deleteContactByIdController,
//   updateContactController,
//   updateStatusContactController,
// } = require("../../controllers/controllers");

// router.get("/", tryCatchMiddleware(getAllContactsController));

// router.get("/:contactId", tryCatchMiddleware(getContactByIdController));

// router.post("/", tryCatchMiddleware(addContactController));

// router.delete("/:contactId", tryCatchMiddleware(deleteContactByIdController));

// router.put("/:contactId", tryCatchMiddleware(updateContactController));

// router.patch("/:contactId", tryCatchMiddleware(updateStatusContactController));

module.exports = router;

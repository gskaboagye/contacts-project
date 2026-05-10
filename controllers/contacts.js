const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllContacts = async (req, res) => {
  try {
    const result = await mongodb
      .getDb()
      .collection('contacts')
      .find();

    const contacts = await result.toArray();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred while getting contacts.',
      error: error.message
    });
  }
};

const getSingleContact = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);

    const result = await mongodb
      .getDb()
      .collection('contacts')
      .findOne({ _id: contactId });

    if (!result) {
      return res.status(404).json({
        message: 'Contact not found.'
      });
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred while getting the contact.',
      error: error.message
    });
  }
};

module.exports = {
  getAllContacts,
  getSingleContact
};
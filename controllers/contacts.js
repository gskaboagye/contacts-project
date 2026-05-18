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

const createContact = async (req, res) => {
  try {
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const response = await mongodb
      .getDb()
      .collection('contacts')
      .insertOne(contact);

    if (response.acknowledged) {
      res.status(201).json({
        message: 'Contact created successfully',
        id: response.insertedId
      });
    } else {
      res.status(500).json({
        message: 'Some error occurred while creating the contact.'
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred while creating the contact.',
      error: error.message
    });
  }
};

const updateContact = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);

    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const response = await mongodb
      .getDb()
      .collection('contacts')
      .replaceOne({ _id: contactId }, contact);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json({
        message: 'Some error occurred while updating the contact.'
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred while updating the contact.',
      error: error.message
    });
  }
};

const deleteContact = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);

    const response = await mongodb
      .getDb()
      .collection('contacts')
      .deleteOne({ _id: contactId });

    if (response.deletedCount > 0) {
      res.status(200).json({
        message: 'Contact deleted successfully'
      });
    } else {
      res.status(500).json({
        message: 'Some error occurred while deleting the contact.'
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred while deleting the contact.',
      error: error.message
    });
  }
};

module.exports = {
  getAllContacts,
  getSingleContact,
  createContact,
  updateContact,
  deleteContact
};
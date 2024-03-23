var express = require("express");
var router = express.Router();
const sequenceGenerator = require("./sequenceGenerator");
const Document = require("../models/document");

// router.get() method is responsible for getting the list of documents in the documents collection in the database.
router.get("/", (req, res, next) => {
  Document.find()
    .then((docs) => {
      res.status(200).json({
        message: "Retrieved documents from database.",
        documents: docs,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "There was a problem retrieving documents from the database.",
        error: err,
      });
    });
});

// router.post() method is responsible for adding a new document to the collection in the database.
router.post('/', (req, res, next) => {
    const maxDocumentId = sequenceGenerator.nextId("documents");
  
    const document = new Document({
      id: maxDocumentId,
      name: req.body.name,
      description: req.body.description,
      url: req.body.url
    });
  
    document.save()
      .then(createdDocument => {
        res.status(201).json({
          message: 'Document added successfully',
          document: createdDocument
        });
      })
      .catch(error => {
         res.status(500).json({
            message: 'An error occurred',
            error: error
          });
      });
  });

  // The router.put() method is responsible for updating an existing document in the database.
  router.put('/:id', (req, res, next) => {
    Document.findOne({ id: req.params.id })
      .then(document => {
        document.name = req.body.name;
        document.description = req.body.description;
        document.url = req.body.url;
  
        Document.updateOne({ id: req.params.id }, document)
          .then(result => {
            res.status(204).json({
              message: 'Document updated successfully'
            })
          })
          .catch(error => {
             res.status(500).json({
             message: 'An error occurred',
             error: error
           });
          });
      })
      .catch(error => {
        res.status(500).json({
          message: 'Document not found.',
          error: { document: 'Document not found'}
        });
      });
  });

// The router.put() method is responsible for deleting an existing document in the database.
// the way it works is basically it grabs the id and delete it. 

  router.delete("/:id", (req, res, next) => {
    Document.findOne({ id: req.params.id })
      .then(document => {
        Document.deleteOne({ id: req.params.id })
          .then(result => {
            res.status(204).json({
              message: "Document deleted successfully"
            });
          })
          .catch(error => {
             res.status(500).json({
             message: 'An error occurred',
             error: error
           });
          })
      })
      .catch(error => {
        res.status(500).json({
          message: 'Document not found.',
          error: { document: 'Document not found'}
        });
      });
  });

  module.exports = router;
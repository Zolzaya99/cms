var Sequence = require("../models/sequence");

var maxDocumentId;
var maxMessageId;
var maxContactId;
var sequenceId = null;

function SequenceGenerator() {
  Sequence.findOne()
    .then(function(sequence) {
      if (!sequence) {
        console.error("No sequence found in the database.");
        return;
      }
      sequenceId = sequence._id;
      maxDocumentId = sequence.maxDocumentId;
      maxMessageId = sequence.maxMessageId;
      maxContactId = sequence.maxContactId;
    })
    .catch(function(err) {
      console.error("An error occurred while fetching sequence:", err);
    });
}


SequenceGenerator.prototype.nextId = function(collectionType) {
  var updateObject = {};
  var nextId;

  switch (collectionType.toLowerCase()) {
    case "documents":
      maxDocumentId++;
      updateObject = { maxDocumentId: maxDocumentId };
      nextId = maxDocumentId;
      break;
    case "messages":
      maxMessageId++;
      updateObject = { maxMessageId: maxMessageId };
      nextId = maxMessageId;
      break;
    case "contacts":
      maxContactId++;
      updateObject = { maxContactId: maxContactId };
      nextId = maxContactId;
      break;
    default:
      return -1;
  }

  Sequence.updateOne({ _id: sequenceId }, { $set: updateObject })
    .then(function() {
      console.log("Sequence updated successfully.");
    })
    .catch(function(err) {
      console.error("Error updating sequence:", err);
    });

  return nextId;
};

module.exports = new SequenceGenerator();

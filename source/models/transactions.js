const fs = require('fs');
const path = require('path');

const ApplicationError = require('../../libs/application-error');
const FileModel = require('./common/fileModel');

class Transactions extends FileModel {
  constructor () {
    super('transactions.json');
  }

  async add(transaction) {
    transaction.id = this._generateId();
    transaction.time = new Date().toISOString();
    this._fileData.push(transaction);
    await this._saveUpdates();
    return transaction;
  }

  async getByCard(cardId) {
    const allTrans = await this.getAll();
    return allTrans.filter(transaction => cardId === transaction.cardId);
  }
}

module.exports = Transactions;
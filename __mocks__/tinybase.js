// Mock Store class
function MockStore() {
  this.data = {};
  this.listeners = [];
}

MockStore.prototype.getRow = function (tableId, rowId) {
  return this.data[tableId]?.[rowId] || null;
};

MockStore.prototype.setRow = function (tableId, rowId, row) {
  if (!this.data[tableId]) {
    this.data[tableId] = {};
  }
  this.data[tableId][rowId] = { ...row };
  this.notifyListeners();
  return this;
};

MockStore.prototype.delRow = function (tableId, rowId) {
  if (this.data[tableId]) {
    delete this.data[tableId][rowId];
    this.notifyListeners();
  }
  return this;
};

MockStore.prototype.getTable = function (tableId) {
  return this.data[tableId] || {};
};

MockStore.prototype.getRowIds = function (tableId) {
  return Object.keys(this.data[tableId] || {});
};

MockStore.prototype.addListener = function (listener) {
  this.listeners.push(listener);
  return () => {
    let index = this.listeners.indexOf(listener);
    if (index > -1) {
      this.listeners.splice(index, 1);
    }
  };
};

MockStore.prototype.notifyListeners = function () {
  this.listeners.forEach((listener) => {
    if (typeof listener === 'function') {
      listener();
    }
  });
};

// Global mock store instance
let mockStore = new MockStore();

// Mock createStore function
function createStore() {
  return mockStore;
}

// Mock persister functions
function createExpoSqlitePersister() {
  return {
    load: function () {
      return Promise.resolve();
    },
    save: function () {
      return Promise.resolve();
    },
    startAutoSave: function () {
      return Promise.resolve(this);
    },
  };
}

function createLocalPersister() {
  return {
    load: function () {
      return Promise.resolve();
    },
    save: function () {
      return Promise.resolve();
    },
    startAutoSave: function () {
      return Promise.resolve(this);
    },
  };
}

// Helper to reset mock data for tests
function __resetMockData() {
  mockStore.data = {};
  mockStore.listeners = [];
}

module.exports = {
  createStore,
  createExpoSqlitePersister,
  createLocalPersister,
  __resetMockData,
}; 

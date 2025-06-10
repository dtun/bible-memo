// Import the main mock store
let tinybaseMock = require('../tinybase.js');
let mockStore = tinybaseMock.createStore();

// React hooks - these need to be functions for proper mocking
function useStore() {
  return mockStore;
}

function useRow(tableId, rowId) {
  return mockStore.getRow(tableId, rowId);
}

function useTable(tableId) {
  return mockStore.getTable(tableId);
}

function useRowIds(tableId) {
  return mockStore.getRowIds(tableId);
}

function useCreateStore(createStoreFunction) {
  if (typeof createStoreFunction === 'function') {
    return createStoreFunction();
  }
  return mockStore;
}

function useCreatePersister(store, createPersisterFunction, deps, callback) {
  // Mock persister setup - just call the callback with a mock persister
  if (typeof callback === 'function') {
    let mockPersister = {
      load: function() { return Promise.resolve(); },
      startAutoSave: function() { return Promise.resolve(); },
    };
    callback(mockPersister);
  }
}

function Provider({ store, children }) {
  return children;
}

module.exports = {
  useStore,
  useRow,
  useTable,
  useRowIds,
  useCreateStore,
  useCreatePersister,
  Provider,
}; 

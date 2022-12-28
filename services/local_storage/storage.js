import * as SecureStore from 'expo-secure-store';

async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
    return value;
}

async function getItem(key) {
    return await SecureStore.getItemAsync(key);
}

async function remove(key) {
    return await SecureStore.deleteItemAsync(key);
}

module.exports = {
    save: save,
    getItem: getItem,
    remove: remove
};
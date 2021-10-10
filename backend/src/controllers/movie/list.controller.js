const List = require('./list.model');
const ListItem = require('./list-item.model');

const initiate = (identifier) => {
    return new Promise((resolve, reject) => {
        List.find({user: identifier._id})
            .then((userLists) => {
                if (!userLists.length) {
                    Promise.all([
                        __makeList__({
                            user: identifier._id,
                            name: 'fav',
                            icon: 'fav',
                            primary: true,
                        }),
                        __makeList__({
                            user: identifier._id,
                            name: 'watchlater',
                            icon: 'watch',
                            primary: true,
                        }),
                    ])
                        .then(resolve)
                        .catch(reject);
                }
            })
            .catch(reject);
    });
};
const MakeList = (identifier, {name}) => {
    return new Promise((resolve, reject) => {
        if (!name || name.toString().trim().length < 1)
            throw new Error('List name required');
        List.count({user: identifier._id, primary: false, name: name})
            .then((count) => {
                if (count === 0) {
                    __makeList__({
                        user: identifier._id,
                        name: name,
                        icon: 'folder',
                        primary: false,
                    })
                        .then((listDoc) => resolve(_parseList(listDoc)))
                        .catch(reject);
                } else {
                    reject(new Error('Duplicate list'));
                }
            })
            .catch(reject);
    });
};
const getUserLists = (identifier) => {
    return new Promise((resolve, reject) => {
        List.find({user: identifier._id, primary: false})
            .then((listDocs) => {
                Promise.all(
                    listDocs.map((listDoc) => __getListItems__(listDoc._id))
                )
                    .then((listItems) => {
                        resolve(
                            listDocs.map((list, i) =>
                                _parseList(list, listItems[i])
                            )
                        );
                    })
                    .catch(reject);
            })
            .catch(reject);
    });
};
const getList = (identifier, {list} = {}) => {
    return new Promise((resolve, reject) => {
        __findListByName__({user: identifier._id, name: list})
            .then((listDoc) => {
                __getListItems__(listDoc._id)
                    .then((listItems) => {
                        resolve(_parseList(listDoc, listItems));
                    })
                    .catch(reject);
            })
            .catch(reject);
    });
};

const addToList = (identifier, {list, imdb_id, title, poster_path} = {}) => {
    return new Promise((resolve, reject) => {
        console.log('poster_path', poster_path);
        __findListByName__({user: identifier._id, name: list})
            .then((listDoc) => {
                __getListItems__(listDoc._id)
                    .then((listItems) => {
                        const index = listItems.findIndex(
                            (i) => i.imdb_id == imdb_id
                        );
                        if (index < 0) {
                            __newItem__({
                                list: listDoc._id,
                                title: title,
                                imdb_id: imdb_id,
                                poster_path: poster_path,
                            })
                                .then((_) => {
                                    getList(identifier, {list: listDoc.name})
                                        .then(resolve)
                                        .catch(reject);
                                })
                                .catch(reject);
                        } else {
                            getList(identifier, {list: listDoc.name})
                                .then(resolve)
                                .catch(reject);
                        }
                    })
                    .catch(reject);
            })
            .catch(reject);
    });
};

const removeFromList = (identifier, {list, imdb_id} = {}) => {
    return new Promise((resolve, reject) => {
        __findListByName__({user: identifier._id, name: list})
            .then((listDoc) => {
                __getListItems__(listDoc._id)
                    .then((listItems) => {
                        const index = listItems.findIndex(
                            (i) => i.imdb_id == imdb_id
                        );
                        if (index < 0) {
                            getList(identifier, {list: listDoc.name})
                                .then(resolve)
                                .catch(reject);
                        } else {
                            __removeItem__({
                                list: listDoc._id,
                                imdb_id: imdb_id,
                            })
                                .then((_) => {
                                    getList(identifier, {list: listDoc.name})
                                        .then(resolve)
                                        .catch(reject);
                                })
                                .catch(reject);
                        }
                    })
                    .catch(reject);
            })
            .catch(reject);
    });
};

module.exports = {
    initiate,
    MakeList,
    getUserLists,
    getList,
    addToList,
    removeFromList,
};

const __findListByName__ = ({user, name} = {}) => {
    return new Promise((resolve, reject) => {
        if (!user) {
            return reject('User required');
        } else if (!name) {
            return reject('Name required');
        } else {
            List.findOne({user: user, name: name})
                .then((userList) => {
                    if (userList) {
                        resolve(userList);
                    } else {
                        reject(new Error('List not found'));
                    }
                })
                .catch(reject);
        }
    });
};
const __getListItems__ = (listId) => {
    return new Promise((resolve, reject) => {
        if (!listId) {
            return reject('List required');
        } else {
            ListItem.find({list: listId})
                .then((listItems) => {
                    resolve(listItems);
                })
                .catch(reject);
        }
    });
};
const __newItem__ = ({list, imdb_id, title, poster_path} = {}) => {
    return new Promise((resolve, reject) => {
        if (!list) {
            return reject('List required');
        } else if (!imdb_id) {
            return reject('ID required');
        } else {
            const newListItem = new ListItem({
                list: list,
                imdb_id: imdb_id,
                title: title,
                poster_path: poster_path,
            });
            newListItem.save((err, itemDoc) => {
                if (err) throw err;
                resolve(itemDoc.toObject());
            });
        }
    });
};
const __removeItem__ = ({list, imdb_id}) => {
    return new Promise((resolve, reject) => {
        if (!list) {
            return reject('List required');
        } else if (!imdb_id) {
            return reject('ID required');
        } else {
            ListItem.remove({list: list, imdb_id: imdb_id})
                .then((_) => {
                    resolve();
                })
                .catch(reject);
        }
    });
};
const __makeList__ = ({user, name, icon, primary} = {}) => {
    return new Promise((resolve, reject) => {
        if (!user) {
            return reject('User required');
        } else if (!name) {
            return reject('Name required');
        } else {
            const newList = new List({
                user: user,
                name: name,
                icon: icon,
                primary: primary,
            });
            newList.save((err, listDoc) => {
                if (err) throw err;
                resolve(listDoc.toObject());
            });
        }
    });
};

const _parseList = (listDoc, listItems = []) => {
    return {
        list: listDoc._id,
        name: listDoc.name,
        items: listItems.map((item) => ({
            imdb_id: item.imdb_id,
            title: item.title,
            poster_path: item.poster_path,
        })),
    };
};

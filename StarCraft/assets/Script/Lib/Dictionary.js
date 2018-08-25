export default class Dictionary {
    constructor() {
        this.datastore = new Array();
    }

    add(key, value) {
        this.datastore[key] = value;
    }

    find(key) {
        return this.datastore[key];
    }

    remove(key) {
        delete this.datastore[key];
    }

    showAll() {
        var str = "";
        for(var key in this.datastore) {
            str += key + " -> " + this.datastore[key] + ";  "
        }
        console.log(str);
    }

    count() {
        var n = 0;
        for(var key in Object.keys(this.datastore)) {
            ++n;
        }
        console.log(n);
        return n;
    }

    clear() {
        for(var key in this.datastore) {
            delete this.datastore[key];
        }
    }
}
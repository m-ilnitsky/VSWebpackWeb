﻿import $ from "jquery";

export default class PhoneBookService {
    getContacts(searchTerm) {
        return $.get("/getContacts?term=" + searchTerm);
    }

    post(url, data) {
        return $.post({
            url: url,
            contentType: "application/json",
            data: JSON.stringify(data)
        });
    }

    reloadContacts(searchTerm) {
        return this.post("/reloadContacts", { term: searchTerm });
    }

    addContact(contact) {
        return this.post("/addContact", { request: contact });
    }

    editContact(contact) {
        return this.post("/editContact", { request: contact });
    }

    deleteContact(id) {
        return this.post("/deleteContact", { id: id });
    }

    deleteContacts(ids) {
        return this.post("/deleteContacts", { ids: ids });
    }
}
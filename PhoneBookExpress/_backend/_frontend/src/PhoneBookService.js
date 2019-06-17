import $ from "jquery";

export default class PhoneBookService {
    getContacts(searchTerm) {
        return $.get("/getContacts?term=" + searchTerm);
    }

    addContact(contact) {
        return $.post({
            url: "/addContact",
            contentType: "application/json",
            data: JSON.stringify({ request: contact })
        });
    }

    deleteContact(id) {
        return $.post({
            url: "/deleteContact",
            contentType: "application/json",
            data: JSON.stringify({ id: id })
        });
    }

    deleteContacts(ids) {
        return $.post({
            url: "/deleteContact",
            contentType: "application/json",
            data: JSON.stringify({ ids: ids })
        });
    }
}
var express = require('express');
var router = express.Router();

let contacts = [
    { id: 0, family: "Иванов", name: "Василий", phone: "+7(383)3123321" },
    { id: 1, family: "Васильев", name: "Дмитрий", phone: "+7(383)3234234" },
    { id: 2, family: "Дмитриев", name: "Иоган", phone: "+7(383)3345345" },
    { id: 3, family: "Йохансон", name: "Скарлетт", phone: "+7(383)3456456" },
    { id: 4, family: "Скарлетсон", name: "Рагнар", phone: "+7(383)3567567" },
    { id: 5, family: "Рагнарсон", name: "Сигурд", phone: "+7(383)3678678" },
    { id: 6, family: "Сигурдсон", name: "Снорри", phone: "+7(383)2789789" },
    { id: 7, family: "Стурлуссон", name: "Снорри", phone: "+7(383)2890890" },
    { id: 8, family: "Барбаросса", name: "Фридрих", phone: "+7(383)2779988" },
    { id: 9, family: "Арагонский", name: "Фердинанд", phone: "+7(495)7123456" },
    { id: 10, family: "Македонский", name: "Александр", phone: "+7(495)7112233" },
    { id: 11, family: "Итакский", name: "Одиссей", phone: "+71234567890" },
    { id: 12, family: "Африканский", name: "Сципион", phone: "+71234561234" },
    { id: 13, family: "Кортес", name: "Эрнан", phone: "+7(812)765-43-21" },
    { id: 14, family: "Юлий Цезарь", name: "Гай", phone: "+7(812)712-31-23" },
    { id: 15, family: "", name: "Ксенофонт", phone: "777-57-73" },
    { id: 16, family: "", name: "Фукидид", phone: "777-57-72" },
    { id: 17, family: "", name: "Геродод", phone: "777-57-71" },
    { id: 18, family: "", name: "Аристотель", phone: "577-57-73" },
    { id: 19, family: "", name: "Платон", phone: "577-57-72" },
    { id: 20, family: "Плюшкины", name: "", phone: "8-800-123-37-71" },
    { id: 21, family: "Неваляшкины", name: "", phone: "8-800-123-77-22" },
    { id: 22, family: "Поваляшкины", name: "", phone: "8-800-123-77-33" },
    { id: 23, family: "Деточкины", name: "", phone: "8-800-123-77-44" },
    { id: 24, family: "Мышкины", name: "", phone: "8-800-123-77-55" }
];

let id = contacts.length;

function simplifyPhone(phoneNumber) {
    return phoneNumber.trim()
        .replace(/[+]/g, "")
        .replace(/[(]/g, "")
        .replace(/[)]/g, "")
        .replace(/[-]/g, "");
};

/* GET home page. */
router.get("/", function (req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get("/getContacts", function (req, res) {
    const term = (req.query.term || "").toUpperCase();

    res.send({
        contacts: contacts.filter(function (contact) {
            return term === ""
                || simplifyPhone(contact.phone).indexOf(term) >= 0
                || contact.phone.trim().toUpperCase().indexOf(term) >= 0
                || contact.name.trim().toUpperCase().indexOf(term) >= 0
                || contact.family.trim().toUpperCase().indexOf(term) >= 0;
        })
    });
});

const IS_PHONE_NUMBER = 1;
const CONTACT_NOT_FOUND = 11;
const ALL_CONTACTS_NOT_FOUND = 21;

router.post("/deleteContact", function (req, res) {
    const id = req.body.id;

    const index = contacts.findIndex(function (contact) {
        return contact.id === id;
    });

    if (index >= 0) {
        contacts.splice(index, 1);
        res.send({
            success: true
        });
        return;
    }

    res.send({
        success: false,
        errorCode: CONTACT_NOT_FOUND,
        message: "Контакт не найден!"
    });
});

router.post("/deleteContacts", function (req, res) {
    const ids = req.body.ids;

    const oldCount = contacts.length;

    contacts = contacts.filter(function (contact) {
        return ids.indexOf(contact.id) < 0;
    });

    const newCount = contacts.length;
    const deleteCount = oldCount - newCount;

    if (deleteCount > 0) {
        res.send({
            success: true,
            deleteCount: deleteCount
        });
        return;
    }

    res.send({
        success: false,
        deleteCount: 0,
        errorCode: ALL_CONTACTS_NOT_FOUND,
        message: "Контакты не найдены!"
    });
});

router.post("/addContact", function (req, res) {
    const newContact = req.body.request;

    const index = contacts.findIndex(function (contact) {
        return simplifyPhone(contact.phone) === simplifyPhone(newContact.phone);
    });

    if (index >= 0) {
        res.send({
            success: false,
            errorCode: IS_PHONE_NUMBER,
            message: "Такой номер уже имеется на сервере"
        });
        return;
    }

    newContact.id = id;
    ++id;
    contacts.push(newContact);

    res.send({ success: true });
});

router.post("/editContact", function (req, res) {
    const editedContact = req.body.request;

    const contactIndex = contacts.findIndex(function (contact) {
        return contact.id === editedContact.id;
    });

    if (contactIndex < 0) {
        res.send({
            success: false,
            errorCode: CONTACT_NOT_FOUND,
            message: "Контакт не найден!"
        });
        return;
    }

    const phoneIndex = contacts.findIndex(function (contact, index) {
        return index != contactIndex && simplifyPhone(contact.phone) === simplifyPhone(editedContact.phone);
    });

    if (phoneIndex >= 0) {
        res.send({
            success: false,
            errorCode: IS_PHONE_NUMBER,
            message: "Такой номер уже имеется на сервере"
        });
        return;
    }

    contacts[contactIndex].family = editedContact.family;
    contacts[contactIndex].name = editedContact.name;
    contacts[contactIndex].phone = editedContact.phone;

    res.send({ success: true });
});

module.exports = router;
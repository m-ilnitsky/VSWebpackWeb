var express = require('express');
var router = express.Router();

var contacts = [
    { id: 0, family: "Иванов", name: "Василий", phone: "+7(383)123321" },
    { id: 1, family: "Васильев", name: "Дмитрий", phone: "+7(383)234234" },
    { id: 2, family: "Дмитриев", name: "Иоган", phone: "+7(383)345345" },
    { id: 3, family: "Йохансон", name: "Скарлетт", phone: "+7(383)456456" },
    { id: 4, family: "Скарлетсон", name: "Рагнар", phone: "+7(383)567567" },
    { id: 5, family: "Рагнарсон", name: "Сигурд", phone: "+7(383)678678" },
    { id: 6, family: "Сигурдсон", name: "Снорри", phone: "+7(383)789789" },
    { id: 7, family: "Стурлуссон", name: "Снорри", phone: "+7(383)890890" },
    { id: 8, family: "Барбаросса", name: "Фридрих", phone: "+7(383)779988" },
    { id: 9, family: "Арагонский", name: "Фердинанд", phone: "+7(495)123456" },
    { id: 10, family: "Македонский", name: "Александр", phone: "+7(495)112233" },
    { id: 11, family: "Итакский", name: "Одиссей", phone: "+7123456789" },
    { id: 12, family: "Африканский", name: "Сципион", phone: "+7123456123" },
    { id: 13, family: "Кортес", name: "Эрнан", phone: "+7(812)654321" },
    { id: 14, family: "Юлий Цезарь", name: "Гай", phone: "+7(812)123123" },
    { id: 15, family: "", name: "Ксенофонт", phone: "777-57-73" },
    { id: 16, family: "", name: "Фукидид", phone: "777-57-72" },
    { id: 17, family: "", name: "Геродод", phone: "777-57-71" },
    { id: 18, family: "", name: "Аристотель", phone: "577-57-73" },
    { id: 19, family: "", name: "Платон", phone: "577-57-72" },
    { id: 20, family: "Плюшкины", name: "", phone: "8-800-12-37-71" },
    { id: 21, family: "Неваляшкины", name: "", phone: "8-800-123-772" },
    { id: 22, family: "Поваляшкины", name: "", phone: "8-800-123-773" },
    { id: 23, family: "Деточкины", name: "", phone: "8-800-123-774" },
    { id: 24, family: "Мышкины", name: "", phone: "8-800-123-775" }
];

var id = contacts.length;

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
    var term = (req.query.term || "").toUpperCase();

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

router.post("/reloadContacts", function (req, res) {
    var term = (req.body.term || "").toUpperCase();

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

router.post("/deleteContact", function (req, res) {
    var id = req.body.id;

    var index = contacts.findIndex(function (contact) {
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
        error: 11,
        message: "Контакт не найден!"
    });
});

router.post("/deleteContacts", function (req, res) {
    var ids = req.body.ids;

    var oldCount = contacts.length;

    contacts = contacts.filter(function (contact) {
        return !(ids.some(function (id) {
            return id === contact.id;
        }));
    });

    var newCount = contacts.length;
    var deleteCount = oldCount - newCount;

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
        error: 21,
        message: "Контакты не найдены!"
    });
});

router.post("/addContact", function (req, res) {
    var newContact = req.body.request;

    var index = contacts.findIndex(function (contact) {
        return simplifyPhone(contact.phone) === simplifyPhone(newContact.phone);
    });

    if (index >= 0) {
        res.send({
            success: false,
            error: 1,
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
    var editedContact = req.body.request;

    var contactIndex = contacts.findIndex(function (contact) {
        return contact.id === editedContact.id;
    });

    var phoneIndex = contacts.findIndex(function (contact, index) {
        return index != contactIndex && simplifyPhone(contact.phone) === simplifyPhone(editedContact.phone);
    });

    if (phoneIndex >= 0) {
        res.send({
            success: false,
            error: 31,
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
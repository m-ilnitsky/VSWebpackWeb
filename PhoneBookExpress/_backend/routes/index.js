var express = require('express');
var router = express.Router();

var contacts = [
    { id: 0, family: "Иванов", name: "Василий", phone: "123321" },
    { id: 1, family: "Васильев", name: "Дмитрий", phone: "234234" },
    { id: 2, family: "Дмитриев", name: "Иоган", phone: "345345" },
    { id: 3, family: "Йохансон", name: "Скарлетт", phone: "456456" },
    { id: 4, family: "Скарлетсон", name: "Рагнар", phone: "567567" },
    { id: 5, family: "Рагнарсон", name: "Сигурд", phone: "678678" },
    { id: 6, family: "Сигурдсон", name: "Снорри", phone: "789789" },
    { id: 7, family: "Стурлуссон", name: "Снорри", phone: "890890" },
    { id: 8, family: "Барбаросса", name: "Фридрих", phone: "779988" },
    { id: 9, family: "Арагонский", name: "Фердинанд", phone: "123456" },
    { id: 10, family: "Македонский", name: "Александр", phone: "112233" },
    { id: 11, family: "Итакский", name: "Одиссей", phone: "123456789" },
    { id: 12, family: "Африканский", name: "Сципион", phone: "123456123" },
    { id: 13, family: "Кортес", name: "Эрнан", phone: "7654321" },
    { id: 14, family: "Юлий Цезарь", name: "Гай", phone: "123123123" },
    { id: 15, family: "", name: "Ксенофонт", phone: "7775773" },
    { id: 16, family: "", name: "Фукидид", phone: "7775772" },
    { id: 17, family: "", name: "Геродод", phone: "7775771" },
    { id: 18, family: "", name: "Аристотель", phone: "5775773" },
    { id: 19, family: "", name: "Платон", phone: "5775772" },
    { id: 20, family: "Плюшкины", name: "", phone: "123771" },
    { id: 21, family: "Неваляшкины", name: "", phone: "123772" },
    { id: 22, family: "Поваляшкины", name: "", phone: "123773" },
    { id: 23, family: "Деточкины", name: "", phone: "123774" },
    { id: 24, family: "Мышкины", name: "", phone: "123775" }
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
        res.send({ success: true });
        return;
    }

    res.send({ success: false });
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
        deleteCount: 0
    });
});

router.post("/addContact", function (req, res) {
    var newContact = req.body.request;

    var index = contacts.findIndex(function (contact) {
        return contact.phone.trim().toUpperCase() === newContact.phone.trim().toUpperCase();
    });

    if (index >= 0) {
        res.send({ success: false });
        return;
    }

    newContact.id = id;
    ++id;
    contacts.push(newContact);

    res.send({ success: true });
});

module.exports = router;
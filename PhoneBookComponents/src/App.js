"use strict";

import Vue from "vue";

import PhoneBook from "./PhoneBook.vue";

(function () {
    new Vue({
        el: "#App",
        template: "<phone-book ref='AppPhoneBook'/>",
        components: {
            "phone-book": PhoneBook
        },
        mounted() {
            const initialContacts = [
                { family: "Иванов", name: "Василий", phone: "123321" },
                { family: "Васильев", name: "Дмитрий", phone: "234234" },
                { family: "Дмитриев", name: "Иоган", phone: "345345" },
                { family: "Йохансон", name: "Скарлетт", phone: "456456" },
                { family: "Скарлетсон", name: "Рагнар", phone: "567567" },
                { family: "Рагнарсон", name: "Сигурд", phone: "678678" },
                { family: "Сигурдсон", name: "Снорри", phone: "789789" },
                { family: "Стурлуссон", name: "Снорри", phone: "890890" },
                { family: "Барбаросса", name: "Фридрих", phone: "779988" },
                { family: "Арагонский", name: "Фердинанд", phone: "123456" },
                { family: "Македонский", name: "Александр", phone: "112233" },
                { family: "Итакский", name: "Одиссей", phone: "123456789" },
                { family: "Африканский", name: "Сципион", phone: "123456123" },
                { family: "Кортес", name: "Эрнан", phone: "7654321" },
                { family: "Юлий Цезарь", name: "Гай", phone: "123123123" },
                { family: "", name: "Ксенофонт", phone: "7775773" },
                { family: "", name: "Фукидид", phone: "7775772" },
                { family: "", name: "Геродод", phone: "7775771" },
                { family: "", name: "Аристотель", phone: "5775773" },
                { family: "", name: "Платон", phone: "5775772" },
                { family: "Плюшкины", name: "", phone: "123771" },
                { family: "Неваляшкины", name: "", phone: "123772" },
                { family: "Поваляшкины", name: "", phone: "123773" },
                { family: "Деточкины", name: "", phone: "123774" },
                { family: "Мышкины", name: "", phone: "123775" }
            ];

            this.$refs.AppPhoneBook.loadContacts(initialContacts);
        }
    });
})();
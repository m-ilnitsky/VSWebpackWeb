"use strict";

import $ from "jquery";
import Vue from "vue";

import PhoneBook from "./PhoneBook.vue";

(function () {
    const app = new Vue({
        el: "#App",
        template: "<phone-book ref='AppPhoneBook'/>",
        components: {
            "phone-book": PhoneBook
        },
        methods: {
            loadContacts(contacts) {
                contacts.forEach(contact => this.$refs.AppPhoneBook.loadContact(contact[0], contact[1], contact[2]));
            }
        }
    });

    $(document).ready(() => {
        const initialContacts = [
            ["Иванов", "Василий", "123321"],
            ["Васильев", "Дмитрий", "234234"],
            ["Дмитриев", "Иоган", "345345"],
            ["Йохансон", "Скарлетт", "456456"],
            ["Скарлетсон", "Рагнар", "567567"],
            ["Рагнарсон", "Сигурд", "678678"],
            ["Сигурдсон", "Снорри", "789789"],
            ["Стурлуссон", "Снорри", "890890"],
            ["Барбаросса", "Фридрих", "779988"],
            ["Арагонский", "Фердинанд", "123456"],
            ["Македонский", "Александр", "112233"],
            ["Итакский", "Одиссей", "123456789"],
            ["Африканский", "Сципион", "123456123"],
            ["Кортес", "Эрнан", "7654321"],
            ["Юлий Цезарь", "Гай", "123123123"],
            ["", "Ксенофонт", "7775773"],
            ["", "Фукидид", "7775772"],
            ["", "Геродод", "7775771"],
            ["", "Аристотель", "5775773"],
            ["", "Платон", "5775772"],
            ["Плюшкины", "", "123771"],
            ["Неваляшкины", "", "123772"],
            ["Поваляшкины", "", "123773"],
            ["Деточкины", "", "123774"],
            ["Мышкины", "", "123775"]
        ];

        app.loadContacts(initialContacts);

        $('[data-toggle="tooltip"]').tooltip({ container: "body" });

        $(app.$refs.AppPhoneBook.$refs.searchInput).popover({ container: "body" });
        $(app.$refs.AppPhoneBook.$refs.searchInput).popover("disable");

        $(app.$refs.AppPhoneBook.$refs.searchInput).focus();
    });
})();
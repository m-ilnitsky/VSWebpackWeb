<template>
    <div class="container phone-book">
        <div class="row phone-book_window">
            <div class="col-sm-12 col-md-3 phone-book_add-wrapper">
                <div class="bg-dark text-white phone-book_add-dialog">
                    <div class="form-group">
                        <h3>Новый контакт</h3>
                    </div>
                    <div class="form-group">
                        <label for="add-dialog_family">Фамилия </label>
                        <input type="text" class="form-control"
                               name="family" id="add-dialog_family"
                               placeholder="Ввести фамилию"
                               data-toggle="tooltip"
                               data-placement="auto"
                               title="Можно не вводить если введено имя"
                               ref="newFamily"
                               v-model="newContact.family"
                               :class="{'is-invalid': newContact.isInvalidFamily}">
                        <div class="invalid-feedback">
                            Нет ни имени ни фамилии.
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="add-dialog_name">Имя </label>
                        <input type="text"
                               class="form-control"
                               name="name"
                               id="add-dialog_name"
                               placeholder="Ввести имя"
                               data-toggle="tooltip"
                               data-placement="auto"
                               title="Можно не вводить если введена фамилия"
                               v-model="newContact.name"
                               :class="{'is-invalid': newContact.isInvalidName}">
                        <div class="invalid-feedback">
                            Нет ни имени ни фамилии.
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="add-dialog_phone">Телефон </label>
                        <input type="text"
                               class="form-control"
                               name="phone"
                               id="add-dialog_phone"
                               placeholder="Ввести телефон"
                               data-toggle="tooltip"
                               data-placement="auto"
                               title="Нужен корректный телефонный номер не совпадающий с уже имеющимися"
                               ref="newPhone"
                               v-model="newContact.phone"
                               :class="{'is-invalid': newContact.isInvalidPhone}">
                        <div class="invalid-feedback"
                             id="add-dialog_phone-feedback">
                            {{newContact.invalidPhoneFeedback}}
                        </div>
                    </div>
                    <button type="submit"
                            class="btn btn-primary button add-button"
                            id="add-button"
                            title="Создать новый контакт"
                            @click="addContact">
                        Добавить
                    </button>
                </div>
            </div>

            <div class="col-sm-12 col-md-9 col-lg-8 col-xl-7 phone-book_table-wrapper">
                <div class="bg-dark phone-book_header">
                    <button type="submit"
                            class="btn btn-primary button edit-button"
                            id="edit-button"
                            title="Изменить все выделенные контакты"
                            @click="confirmEditChecked">
                        Изменить
                    </button>
                    <button type="submit"
                            class="btn btn-primary button delete-button"
                            id="delete-button"
                            title="Удалить все выделенные контакты"
                            @click="confirmRemoveChecked">
                        Удалить
                    </button>
                    <div class="search-wrapper">
                        <input type="text"
                               class="search-input"
                               id="search-input"
                               placeholder="Найти"
                               data-toggle="popover"
                               data-placement="bottom"
                               title="Поиск"
                               data-content="Не найдено ни одного совпадения!"
                               ref="searchInput"
                               v-model="filterString">
                        <div class="search-reset-button"
                             id="search-reset-button"
                             :class="{'visible-button': isFilter}"
                             @click="resetFilter">
                            <img src="icon-close.png"
                                 alt="x"
                                 title="Очистить поле поиска">
                        </div>
                    </div>
                </div>
                <table class="table table-sm table-striped table-hover phone-book_table">
                    <thead class="thead-dark">
                        <tr>
                            <th>№</th>
                            <th>Фамилия</th>
                            <th>Имя</th>
                            <th>Телефон</th>
                            <th>
                                <input type="checkbox"
                                       class="checkbox"
                                       id="all-checkbox-top"
                                       v-model="checkedAll"
                                       @click="checkAll">
                            </th>
                            <th id="checked-counter-top" v-cloak v-text="checkedContactsCount+' / '+filteredContactsCount"></th>
                        </tr>
                    </thead>
                    <tbody id="table-body">
                        <tr v-cloak v-for="(contact, index) in filteredContacts"
                            :key="contact.id"
                            :class="{'checked-row': contact.checked}">
                            <td class="column-number" v-cloak v-text="index+1"></td>
                            <td class="column-family" v-cloak v-text="contact.family"></td>
                            <td class="column-name" v-cloak v-text="contact.name"></td>
                            <td class="column-phone" v-cloak v-text="contact.phone"></td>
                            <td class="column-checkbox">
                                <input type="checkbox"
                                       class="checkbox"
                                       v-model="contact.checked"
                                       @click="check(contact)">
                            </td>
                            <td class="column-buttons">
                                <div class="circle-button add-button"
                                     title="Создать новый контакт на основе данного"
                                     @click="copyContact(contact)">
                                    <img src="icon-add.png"
                                         alt="a">
                                </div>
                                <div class="circle-button edit-button"
                                     title="Изменить контакт"
                                     @click="editContact(contact)">
                                    <img src="icon-edit.png"
                                         alt="e">
                                </div>
                                <div class="circle-button delete-button"
                                     title="Удалить контакт"
                                     @click="confirmRemove(contact)">
                                    <img src="icon-close.png"
                                         alt="x">
                                </div>
                            </td>
                        </tr>

                    </tbody>
                    <tfoot class="thead-dark">
                        <tr>
                            <th>№</th>
                            <th>Фамилия</th>
                            <th>Имя</th>
                            <th>Телефон</th>
                            <th>
                                <input type="checkbox"
                                       class="checkbox"
                                       id="all-checkbox-bottom"
                                       v-model="checkedAll"
                                       @click="checkAll">
                            </th>
                            <th id="checked-counter-bottom" v-cloak
                                v-text="checkedContactsCount+' / '+filteredContactsCount"></th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>

        <div ref="messageDialog"
             class="modal"
             tabindex="-1"
             role="dialog"
             aria-labelledby="exampleModalLabel"
             aria-hidden="true">
            <div class="modal-dialog"
                 role="document">
                <div class="modal-content">
                    <div class="modal-header text-white">
                        <h5 class="modal-title">Сообщение</h5>
                        <button type="button"
                                class="close"
                                data-dismiss="modal"
                                aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body bg-dark text-white">
                        Не выбрано ни одного контакта!<br>
                        Для выполнения операции выберите контакты!
                    </div>
                    <div class="modal-footer bg-dark text-white">
                        <button type="button"
                                class="button btn btn-primary"
                                data-dismiss="modal">
                            Закрыть
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div ref="confirmDialogRemoveContact"
             class="modal"
             tabindex="-1"
             role="dialog"
             aria-labelledby="exampleModalLabel"
             aria-hidden="true">
            <div class="modal-dialog"
                 role="document">
                <div class="modal-content">
                    <div class="modal-header text-white">
                        <h5 class="modal-title">Запрос подтверждения</h5>
                        <button type="button"
                                class="close"
                                data-dismiss="modal"
                                aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body bg-dark text-white">
                        {{confirmRemoveContact.message}}<br>
                        {{confirmRemoveContact.family}}<br>
                        {{confirmRemoveContact.name}}<br>
                        {{confirmRemoveContact.phone}}
                    </div>
                    <div class="modal-footer bg-dark text-white">
                        <button type="button"
                                class="button btn btn-secondary"
                                data-dismiss="modal">
                            Отменить
                        </button>
                        <button type="button"
                                class="button btn btn-primary"
                                @click="removeContact">
                            Удалить
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div ref="confirmDialog"
             class="modal"
             tabindex="-1"
             role="dialog"
             aria-labelledby="exampleModalLabel"
             aria-hidden="true">
            <div class="modal-dialog"
                 role="document">
                <div class="modal-content">
                    <div class="modal-header text-white">
                        <h5 class="modal-title">Запрос подтверждения</h5>
                        <button type="button"
                                class="close"
                                data-dismiss="modal"
                                aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body bg-dark text-white"
                         v-text="confirmDialog.message">
                    </div>
                    <div class="modal-footer bg-dark text-white">
                        <button type="button"
                                class="button btn btn-secondary"
                                data-dismiss="modal">
                            Отменить
                        </button>
                        <button type="button"
                                class="button btn btn-primary"
                                @click="confirm">
                            {{confirmDialog.okButtonText}}
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div ref="editDialog"
             class="modal"
             tabindex="-1"
             role="dialog"
             aria-labelledby="exampleModalLabel"
             aria-hidden="true">
            <div class="modal-dialog"
                 role="document">
                <div class="modal-content">
                    <div class="modal-header text-white">
                        <h5 class="modal-title">Изменение данных контакта</h5>
                        <button type="button"
                                class="close"
                                data-dismiss="modal"
                                aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body bg-dark text-white">
                        <div class="form-group">
                            <label for="edit-dialog_family">Фамилия </label>
                            <input type="text"
                                   class="form-control"
                                   name="family"
                                   id="edit-dialog_family"
                                   ref="editFamily"
                                   v-model="editedContact.family"
                                   :class="{'is-invalid': editedContact.isInvalidFamily}">
                            <div class="invalid-feedback">
                                Нет ни имени ни фамилии.
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="edit-dialog_name">Имя </label>
                            <input type="text"
                                   class="form-control"
                                   name="name"
                                   id="edit-dialog_name"
                                   v-model="editedContact.name"
                                   :class="{'is-invalid': editedContact.isInvalidName}">
                            <div class="invalid-feedback">
                                Нет ни имени ни фамилии.
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="edit-dialog_phone">Телефон </label>
                            <input type="text"
                                   class="form-control"
                                   name="phone"
                                   id="edit-dialog_phone"
                                   ref="editPhone"
                                   v-model="editedContact.phone"
                                   :class="{'is-invalid': editedContact.isInvalidPhone}">
                            <div class="invalid-feedback"
                                 id="edit-dialog_phone-feedback">
                                {{editedContact.invalidPhoneFeedback}}
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer bg-dark text-white">
                        <button type="button"
                                class="button btn btn-secondary"
                                @click="cancelChange">
                            Отменить
                        </button>
                        <button type="button"
                                class="button btn btn-primary"
                                @click="applyChange">
                            Применить
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import "bootstrap/dist/css/bootstrap.min.css";
    import "./PhoneBook.scss";

    import $ from "jquery";
    import "bootstrap/dist/js/bootstrap.bundle.min";
    import Vue from "vue";

    export default {
        props: ["initialContacts"],
        data: function () {
            return {
                contacts: this.initialContacts || [],
                newContact: {
                    family: "",
                    name: "",
                    phone: "",
                    isInvalidFamily: false,
                    isInvalidName: false,
                    isInvalidPhone: false,
                    invalidPhoneFeedback: ""
                },
                editedContact: {
                    family: "",
                    name: "",
                    phone: "",
                    initPhone: "",
                    isInvalidFamily: false,
                    isInvalidName: false,
                    isInvalidPhone: false,
                    invalidPhoneFeedback: ""
                },
                id: 0,
                isEditing: false,
                editIndex: -1,
                filterString: "",
                isFilter: false,
                checkedAll: false,
                contactForRemove: {},
                contactForEdit: {},
                confirmRemoveContact: {
                    message: "",
                    family: "",
                    name: "",
                    phone: ""
                },
                confirmDialog: {
                    message: "",
                    okButtonText: ""
                }
            }
        },
        computed: {
            filteredContacts: function () {
                var str = this.filterString.trim();

                if (str === "") {
                    this.isFilter = false;
                    return this.contacts;
                }

                this.isFilter = true;

                return this.contacts.filter(function (contact) {
                    return contact.family.indexOf(str) >= 0
                        || contact.name.indexOf(str) >= 0
                        || contact.phone.indexOf(str) >= 0;
                });
            },
            checkedContactsCount: function () {
                return this.filteredContacts.reduce(function (number, contact) {
                    if (contact.checked) {
                        return number + 1;
                    }
                    return number;
                }, 0);
            },
            filteredContactsCount: function () {
                if (this.contacts.length === 0) {
                    $(this.$refs.searchInput).popover("disable");
                    $(this.$refs.searchInput).popover("hide");
                    return 0;
                }

                if (this.filteredContacts.length > 0) {
                    $(this.$refs.searchInput).popover("disable");
                    $(this.$refs.searchInput).popover("hide");
                } else {
                    $(this.$refs.searchInput).popover("enable");
                    $(this.$refs.searchInput).popover("show");
                }

                return this.filteredContacts.length;
            }
        },
        methods: {
            getContactString: function (number) {
                var twoDigits = number % 100;
                var lastDigit = number % 10;

                if ((twoDigits >= 5 && twoDigits <= 20) || (lastDigit === 0) || (lastDigit >= 5 && lastDigit <= 9)) {
                    return "контактов";
                } else if (lastDigit === 1) {
                    return "контакт";
                } else if (lastDigit >= 2 && lastDigit <= 4) {
                    return "контакта";
                }

                return "хм..мммм";
            },
            checkAll: function () {
                if (!this.checkedAll) {
                    this.checkedAll = true;
                    this.contacts.forEach(function (element) {
                        element.checked = true;
                    });
                } else {
                    if (this.contacts.every(function (element) {
                        return element.checked;
                    })) {
                        this.checkedAll = false;
                        this.contacts.forEach(function (element) {
                            element.checked = false;
                        });
                    } else {
                        this.checkedAll = true;
                        this.contacts.forEach(function (element) {
                            element.checked = true;
                        });
                    }
                }
            },
            check: function (contact) {
                contact.checked = !contact.checked;

                var isNoChecked = this.contacts.some(function (element) {
                    return !element.checked;
                });

                if (this.checkedAll && isNoChecked) {
                    this.checkedAll = false;
                }
            },
            resetFilter: function () {
                this.filterString = "";
            },
            copyContact: function (contact) {
                this.newContact.family = contact.family;
                this.newContact.name = contact.name;
                this.$refs.newPhone.focus();
            },
            hasPhone: function (phoneNumber) {
                var newPhone = phoneNumber.trim()
                    .replace(/[+]/g, "")
                    .replace(/[(]/g, "")
                    .replace(/[)]/g, "")
                    .replace(/[-]/g, "");

                var isPhone = false;

                this.contacts.forEach(function (contact) {
                    var phoneInRow = contact.phone.trim()
                        .replace(/[+]/g, "")
                        .replace(/[(]/g, "")
                        .replace(/[)]/g, "")
                        .replace(/[-]/g, "");
                    if (phoneInRow === newPhone) {
                        isPhone = true;
                        return false;
                    }
                });

                return isPhone;
            },
            isCorrectPhone: function (phoneNumber) {
                var phoneRegexp = /^(\+[0-9]+)?([(][0-9]+[)])?([\-0-9]+)?[0-9]$/;
                return phoneRegexp.test(phoneNumber);
            },
            loadContact: function (family, name, phone) {
                var contact = {
                    id: this.id,
                    family: family,
                    name: name,
                    phone: phone,
                    checked: false
                };

                this.contacts.push(contact);
                this.id++;
            },
            addContact: function () {
                this.newContact.isInvalidFamily = false;
                this.newContact.isInvalidName = false;
                this.newContact.isInvalidPhone = false;

                if (this.newContact.family === "" && this.newContact.name === "") {
                    this.newContact.isInvalidFamily = true;
                    this.newContact.isInvalidName = true;
                }

                if (this.newContact.phone.trim().length === 0) {
                    this.newContact.isInvalidPhone = true;
                    this.newContact.invalidPhoneFeedback = "Нет номера телефона.";
                } else if (!this.isCorrectPhone(this.newContact.phone.trim())) {
                    this.newContact.isInvalidPhone = true;
                    this.newContact.invalidPhoneFeedback = "Некорректный номер телефона.";
                } else if (this.hasPhone(this.newContact.phone)) {
                    this.newContact.isInvalidPhone = true;
                    this.newContact.invalidPhoneFeedback = "Такой номер телефона уже есть.";
                }

                if (this.newContact.isInvalidFamily || this.newContact.isInvalidName) {
                    this.$refs.newFamily.focus();
                    return;
                }

                if (this.newContact.isInvalidPhone) {
                    this.$refs.newPhone.focus();
                    return;
                }

                var contact = {};
                contact.id = this.id;
                contact.family = this.newContact.family.trim();
                contact.name = this.newContact.name.trim();
                contact.phone = this.newContact.phone.trim();
                contact.checked = false;

                this.contacts.push(contact);
                this.id++;

                this.createToast("Создание", "Добавлен контакт: " + this.newContact.family + " " + this.newContact.name + " " + this.newContact.phone);

                this.newContact.phone = "";
                this.$refs.newPhone.focus();
            },
            removeContact: function () {
                var index = this.contacts.indexOf(this.contactForRemove);

                this.createToast("Удаление", "Удалён контакт: " + this.contacts[index].family + " " + this.contacts[index].name + " " + this.contacts[index].phone);

                this.contacts.splice(index, 1);

                $(this.$refs.confirmDialogRemoveContact).modal("hide");
            },
            confirmRemove: function (contact) {
                this.confirmRemoveContact.message = "Вы действительно хотите удалить контакт?";
                this.confirmRemoveContact.family = contact.family;
                this.confirmRemoveContact.name = contact.name;
                this.confirmRemoveContact.phone = contact.phone;

                this.contactForRemove = contact;

                $(this.$refs.confirmDialogRemoveContact).modal("show");
            },
            removeCheckedContacts: function () {
                var str = this.filterString.trim();
                var oldCount = this.contacts.length;

                this.contacts = this.contacts.filter(function (contact) {
                    return (!contact.checked
                        || (contact.family.indexOf(str) < 0 && contact.name.indexOf(str) < 0 && contact.phone.indexOf(str) < 0));
                    // return !(contact.checked && (contact.family.indexOf(str) >= 0 || contact.name.indexOf(str) >= 0 || contact.phone.indexOf(str) >= 0));
                });

                var deleteCount = oldCount - this.contacts.length;

                this.createToast("Удаление", "Удалено " + deleteCount + " " + this.getContactString(deleteCount));
            },
            confirmRemoveChecked: function () {
                if (this.checkedContactsCount === 0) {
                    $(this.$refs.messageDialog).modal("show");
                } else if (this.checkedContactsCount === 1) {
                    var checkedContacts = this.filteredContacts.filter(function (contact) {
                        return contact.checked;
                    });
                    this.confirmRemove(checkedContacts[0]);
                } else {
                    this.confirmDialog.message = "Вы действительно хотите удалить " + this.checkedContactsCount + " " + this.getContactString(this.checkedContactsCount) + "?";
                    this.confirmDialog.okButtonText = "Удалить все";
                    $(this.$refs.confirmDialog).modal("show");
                }
            },
            cancelChange: function () {
                $(this.$refs.editDialog).modal("hide");
                this.isEditing = false;
                this.editIndex = -1;
            },
            applyChange: function () {
                this.editedContact.isInvalidFamily = false;
                this.editedContact.isInvalidName = false;
                this.editedContact.isInvalidPhone = false;

                if (this.editedContact.family === "" && this.editedContact.name === "") {
                    this.editedContact.isInvalidFamily = true;
                    this.editedContact.isInvalidName = true;
                }

                if (this.editedContact.phone.trim().length === 0) {
                    this.editedContact.isInvalidPhone = true;
                    this.editedContact.invalidPhoneFeedback = "Нет номера телефона.";
                } else if (!this.isCorrectPhone(this.editedContact.phone.trim())) {
                    this.editedContact.isInvalidPhone = true;
                    this.editedContact.invalidPhoneFeedback = "Некорректный номер телефона.";
                } else if ((this.editedContact.initPhone.trim() !== this.editedContact.phone.trim()) && this.hasPhone(this.editedContact.phone)) {
                    this.editedContact.isInvalidPhone = true;
                    this.editedContact.invalidPhoneFeedback = "Такой номер телефона уже есть.";
                }

                if (this.editedContact.isInvalidFamily || this.editedContact.isInvalidName) {
                    this.$refs.editFamily.focus();
                    return;
                }

                if (this.editedContact.isInvalidPhone) {
                    this.$refs.editPhone.focus();
                    return;
                }

                if (this.editedContact.initFamily.trim() !== this.editedContact.family.trim()
                    || this.editedContact.initName.trim() !== this.editedContact.name.trim()
                    || this.editedContact.initPhone.trim() !== this.editedContact.phone.trim()) {
                    this.contactForEdit.family = this.editedContact.family.trim();
                    this.contactForEdit.name = this.editedContact.name.trim();
                    this.contactForEdit.phone = this.editedContact.phone.trim();
                    this.contactForEdit.checked = false;

                    this.createToast("Редактирование", "Изменён контакт: " + this.editedContact.family + " " + this.editedContact.name + " " + this.editedContact.phone);
                }

                $(this.$refs.editDialog).modal("hide");
                this.isEditing = false;
            },
            editContact: function (contact) {
                this.editedContact.family = contact.family;
                this.editedContact.name = contact.name;
                this.editedContact.phone = contact.phone;

                this.editedContact.initFamily = contact.family;
                this.editedContact.initName = contact.name;
                this.editedContact.initPhone = contact.phone;

                this.editedContact.isInvalidFamily = false;
                this.editedContact.isInvalidName = false;
                this.editedContact.isInvalidPhone = false;

                this.contactForEdit = contact;

                $(this.$refs.editDialog).modal("show");
                this.$refs.editPhone.focus();
            },
            confirmEditChecked: function () {
                if (this.checkedContactsCount === 0) {
                    $(this.$refs.messageDialog).modal("show");
                    return;
                }

                var checkedContacts = this.filteredContacts.filter(function (contact) {
                    return contact.checked;
                });

                if (this.checkedContactsCount === 1) {
                    this.editContact(checkedContacts[0]);
                } else {
                    this.confirmDialog.message = "Вы действительно хотите изменить " + this.checkedContactsCount + " " + this.getContactString(this.checkedContactsCount) + "?";
                    this.confirmDialog.okButtonText = "Изменить";
                    $(this.$refs.confirmDialog).modal("show");
                }
            },
            editCheckedContacts: function () {
                var checkedContacts = this.filteredContacts.filter(function (contact) {
                    return contact.checked;
                });

                this.isEditing = false;
                this.editIndex = 0;

                var self = this;
                //var count = 0;

                var timerId = setInterval(function () {
                    //count++;
                    //console.log(count);
                    if (self.editIndex >= checkedContacts.length || self.editIndex < 0) {
                        clearInterval(timerId);
                        return;
                    }
                    if (!self.isEditing) {
                        //console.log("self.editIndex = " + self.editIndex);
                        self.isEditing = true;
                        self.editContact(checkedContacts[self.editIndex]);
                        self.editIndex++;
                    }
                }, 50);
            },
            confirm: function () {
                if (this.confirmDialog.okButtonText === "Удалить все") {
                    this.removeCheckedContacts();
                } else if (this.confirmDialog.okButtonText === "Изменить") {
                    this.editCheckedContacts();
                }

                $(this.$refs.confirmDialog).modal("hide");
            },
            createToast: function (title, message) {
                var divToast = $("<div></div>").addClass("toast")
                    .prop("role", "alert")
                    .prop("aria-live", "assertive")
                    .prop("aria-atomic", "true");

                var divToastHeader = $("<div></div>").addClass("toast-header")
                    .appendTo(divToast);

                $("<strong></strong>").addClass("mr-auto")
                    .text(title)
                    .appendTo(divToastHeader);

                var buttonClose = $("<button></button>").addClass("ml-2 mb-1 close")
                    .prop("data-dismiss", "toast")
                    .prop("aria-label", "Close")
                    .click(function () {
                        divToast.toast("hide");
                    })
                    .appendTo(divToastHeader);

                $("<span>&times;</span>")
                    .prop("aria-hidden", "true")
                    .appendTo(buttonClose);

                $("<div></div>").addClass("toast-body")
                    .text(message)
                    .appendTo(divToast);

                divToast.appendTo("#toastBox");
                divToast.toast({ delay: 60000 });
                divToast.toast("show");
            }
        }
    }
</script>
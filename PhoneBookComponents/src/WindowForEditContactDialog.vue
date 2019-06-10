<template>
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
                    <h5 class="modal-title">{{title}}</h5>
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
                               v-model="contact.family"
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
                               v-model="contact.name"
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
                               v-model="contact.phone"
                               :class="{'is-invalid': editedContact.isInvalidPhone}">
                        <div class="invalid-feedback"
                             id="edit-dialog_phone-feedback">
                            {{invalidPhoneFeedback}}
                        </div>
                    </div>
                </div>
                <div class="modal-footer bg-dark text-white">
                    <button type="button"
                            class="button btn btn-secondary"
                            @click="cancelFunction">
                        Отменить
                    </button>
                    <button type="button"
                            class="button btn btn-primary"
                            @click="okFunction">
                        Применить
                    </button>
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

    export default {
        props: ["title", "contact", "cancelFunction", "okFunction", "validateFunction"]
    }
</script>
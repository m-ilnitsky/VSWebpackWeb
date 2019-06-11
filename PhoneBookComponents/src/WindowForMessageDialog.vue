<template>
    <div ref="dialog"
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
                    {{topMessage}}<br v-if="(bottomMessage!=='')">
                    {{bottomMessage}}
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
</template>

<script>
    import "bootstrap/dist/css/bootstrap.min.css";
    import "./PhoneBook.scss";

    import $ from "jquery";
    import "bootstrap/dist/js/bootstrap.bundle.min";

    export default {
        props: {
            title: String,
            topMessage: String,
            bottomMessage: String
        }
    }
</script>
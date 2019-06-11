<template>
    <div class="search-wrapper">
        <input :type="inputType"
               class="search-input"
               :placeholder="placeholder"
               data-toggle="popover"
               data-placement="bottom"
               :data-content="popoverText"
               :v-model="inputString">
        <div class="search-reset-button"
             :class="{'visible-button': isText}"
             @click="reset">
            <img src="icon-close.png"
                 alt="x"
                 :title="buttonTitle">
        </div>
    </div>
</template>

<script>
    import "bootstrap/dist/css/bootstrap.min.css";
    import "./PhoneBook.scss";

    //import $ from "jquery";
    import "bootstrap/dist/js/bootstrap.bundle.min";

    export default {
        props: {
            inputType: String,
            placeholder: String,
            popoverText: String,
            showPopover: Boolean,
            buttonTitle: String,
            onChangeFunction: Function
        },
        data() {
            return {
                inputString: ""
            }
        },
        computed: {
            isText() {
                return this.inputString.trim() === "";
            }
        },
        methods: {
            reset() {
                this.inputString = "";
            }
        }
    }
</script>
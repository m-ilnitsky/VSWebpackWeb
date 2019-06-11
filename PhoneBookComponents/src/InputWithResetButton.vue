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
    import "bootstrap/dist/js/bootstrap.bundle.min";

    export default {
        props: {
            inputType: {
                type: String,
                default: "text",
                validator: function (value) {
                    return ["text", "email", "search", "tel", "url"].indexOf(value) !== -1;
                }
            },
            placeholder: {
                type: String,
                default: ""
            },
            popoverText: {
                type: String,
                default: ""
            },
            showPopover: {
                type: Boolean,
                default: false
            },
            buttonTitle: {
                type: String,
                default: "Очистить"
            },
            onChangeFunction: {
                type: Function,
                required: true
            }
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
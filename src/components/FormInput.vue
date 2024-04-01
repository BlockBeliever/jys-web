<template>
    <div class="formitem">
        <span class="formname">{{ label }}</span>
        <div class="inputbox">
            <input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"
                :placeholder="placeholder" :type="type" :disabled="disabled" />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        label: String,
        placeholder: String,
        disabled: {
            type: Boolean,
            default: false
        },
        modelValue: [String, Number],
        type: {
            type: String,
            default: "text"
        }
    },
    emits: ["update:modelValue"],
};
</script>

<style lang="scss" scoped>
.formitem {
    padding: 15px 0;
    font-size: 14px;
    border-bottom: 1px solid #F0F4FA;
    position: relative;

    .inputbox {

        color: rgba(16, 16, 16, 1);
        margin-top: 20px;

        input::-webkit-input-placeholder {
            color: rgba(207, 207, 207, 1);
        }

        input {
            border: none;
            font-size: 14px;
            width: 100%;
            background: #fff;
        }
    }
}
</style>
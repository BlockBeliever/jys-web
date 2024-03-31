<template>
    <div class="formitem">
        <span class="formname">{{ label }}</span>
        <div class="inputbox flex2">
            <input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"
                :placeholder="placeholder" type="text" :disabled="disabled" :hidden="hidden">
            <div style="font-size: 14px;">
                <span style="padding-right: 5px;">{{ chooseTypename }}</span>
                <van-icon name="arrow-down" v-if="!showdown" @click="toggleShowdown(identifier)" />
                <van-icon name="arrow-up" v-if="showdown" @click="toggleShowdown(identifier)" />
                <div class="downlist" v-if="showdown">
                    <div class="boxboadssad" v-for="(item, index) in typeList" :key="index"
                        :style="selectedIndex == index ? 'background:#F7FAFF' : 'background:#fff'"
                        @click="changeType(index, item.name || item.en_name)">{{ item.name || item.en_name.toUpperCase()
                        }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        label: {
            type: String,
            default: ''
        },
        modelValue: String,
        placeholder: {
            type: String,
            default: ''
        },
        showdown: {
            type: Boolean,
            default: false
        },
        typeList: {
            type: Array,
            default: []
        },
        selectedIndex: {
            type: Number,
            default: 0
        },
        disabled: {
            type: Boolean,
            default: false
        },
        hidden: {
            type: Boolean,
            default: false
        },
        chooseTypename: {
            type: String,
            default: ''
        },
        identifier: {
            type: Number,
            default: 0
        }
    },
    emits: ["update:modelValue"],

    methods: {
        changeType(index, name) {
            this.$emit('change', index, name)
        },
        toggleShowdown(identifier) {
            this.$emit('toggle-showdown', identifier);
        }
    }

};
</script>

<style lang="scss" scoped>
.formitem {
    padding: 15px 0;
    font-size: 14px;
    border-bottom: 1px solid #F0F4FA;
    position: relative;

    .downlist {
        position: absolute;
        width: 300px;
        height: 68px;
        border-radius: 10px;
        background: #FFFFFF;
        border: 1px solid #E6E6E6;
        overflow: scroll;
        right: 0;
        bottom: -70px;
        z-index: 999;

        .boxboadssad {
            width: 100%;
            line-height: 34px;
            text-align: center;
            height: 34px;
            font-size: 10px;
        }
    }

    .inputbox {
        color: rgba(16, 16, 16, 1);
        margin-top: 20px;

        input::-webkit-input-placeholder {
            color: rgba(207, 207, 207, 1);
        }

        input {
            border: none;
            font-size: 14px;
            width: 120px;
            background: #fff;
        }
    }
}
</style>
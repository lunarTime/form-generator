<script setup lang="ts">
    import { computed } from 'vue'
    import { escapeHtml } from '@/shared/lib/sanitize'

    const props = defineProps<{
        id?: string
        modelValue?: boolean
        label?: string
        required?: boolean
        disabled?: boolean
        ariaLabel?: string
        ariaInvalid?: boolean
        ariaDescribedby?: string
        error?: boolean
    }>()

    const emit = defineEmits<{
        (e: 'update:modelValue', value: boolean): void
        (e: 'blur', event: FocusEvent): void
        (e: 'focus', event: FocusEvent): void
    }>()

    const sanitizedLabel = computed(() => (props.label ? escapeHtml(props.label) : ''))
    const checkboxClasses = computed(() => ({
        'ui-checkbox--checked': props.modelValue,
        'ui-checkbox--error': props.error,
        'ui-checkbox--disabled': props.disabled
    }))

    const handleChange = (event: Event) => {
        if (props.disabled) {
            return
        }

        const target = event.target as HTMLInputElement
        const value = target.checked

        emit('update:modelValue', value)
    }

    const handleBlur = (event: FocusEvent) => {
        emit('blur', event)
    }

    const handleFocus = (event: FocusEvent) => {
        emit('focus', event)
    }
</script>

<template>
    <label :class="['ui-checkbox', checkboxClasses]">
        <input
            :id="id"
            type="checkbox"
            :checked="props.modelValue"
            :required="required"
            :disabled="disabled"
            :aria-label="ariaLabel"
            :aria-invalid="ariaInvalid"
            :aria-describedby="ariaDescribedby"
            class="ui-checkbox__input"
            @change="handleChange"
            @blur="handleBlur"
            @focus="handleFocus"
        />
        <span
            v-if="label"
            class="ui-checkbox__label"
        >
            {{ sanitizedLabel }}
        </span>
    </label>
</template>

<style scoped lang="scss">
    .ui-checkbox {
        display: flex;
        align-items: center;
        gap: 0.3rem;
        cursor: pointer;
        user-select: none;
        position: relative;

        &__label {
            font-size: 1rem;
            color: $color-gray-900;
            line-height: 1.4;
        }

        &__input {
            position: relative;
            flex: none;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 1.4rem;
            height: 1.4rem;
            border: 1px solid $color-gray-700;
            border-radius: 0.3rem;
            appearance: none;
            cursor: pointer;
            transition: all 0.2s ease;

            &:checked {
                background-color: $color-primary;

                &:after {
                    opacity: 1;
                }
            }

            &:after {
                content: 'V';
                position: absolute;
                color: $color-gray-50;
                opacity: 0;
                transition: opacity 0.2s;
            }
        }
    }
</style>

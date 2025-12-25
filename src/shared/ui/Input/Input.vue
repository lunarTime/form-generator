<script setup lang="ts">
    import { computed } from 'vue'
    import { sanitizeString } from '@/shared/lib/sanitize'
    import { validateEmail } from '@/shared/lib/validation'
    import type { InputType } from '@/shared/types/form'

    const props = withDefaults(
        defineProps<{
            id?: string
            modelValue?: string | number
            inputType?: InputType
            placeholder?: string
            required?: boolean
            disabled?: boolean
            readonly?: boolean
            maxLength?: number
            minLength?: number
            pattern?: string
            autocomplete?: string
            ariaLabel?: string
            ariaInvalid?: boolean
            ariaDescribedby?: string
            error?: boolean
        }>(),
        {
            inputType: 'text',
            maxLength: 10000
        }
    )

    const emit = defineEmits<{
        (e: 'update:modelValue', value: string | number): void
        (e: 'blur', event: FocusEvent): void
        (e: 'focus', event: FocusEvent): void
        (e: 'keydown', event: KeyboardEvent): void
    }>()

    const sanitizedValue = computed(() => {
        if (props.modelValue === undefined || props.modelValue === null) {
            return ''
        }

        const value = String(props.modelValue)

        if (props.inputType === 'email') {
            return sanitizeString(value)
        }

        if (props.inputType === 'number') {
            const num = parseFloat(value)

            return isNaN(num) ? '' : num
        }

        return sanitizeString(value).slice(0, props.maxLength)
    })
    const sanitizedPlaceholder = computed(() => (props.placeholder ? sanitizeString(props.placeholder) : ''))
    const inputClasses = computed(() => ({
        'ui-input--error': props.error,
        'ui-input--disabled': props.disabled,
        'ui-input--readonly': props.readonly
    }))

    const handleInput = (event: Event) => {
        if (props.disabled || props.readonly) {
            return
        }

        const target = event.target as HTMLInputElement
        let value: string | number = target.value

        switch (props.inputType) {
            case 'email':
                value = sanitizeString(value)

                if (value && !validateEmail(value)) {
                    console.warn('Email не прошел валидацию')
                }

                break

            case 'number':
                const num = parseFloat(value)

                value = isNaN(num) ? 0 : num

                break

            case 'tel':
                value = value.replace(/[^\d+\-\s()]/g, '')

                break

            default:
                value = sanitizeString(value)
                value = value.slice(0, props.maxLength)
        }

        emit('update:modelValue', value)
    }

    const handleBlur = (event: FocusEvent) => {
        emit('blur', event)
    }

    const handleFocus = (event: FocusEvent) => {
        emit('focus', event)
    }

    const handleKeydown = (event: KeyboardEvent) => {
        if (event.key === 'v' && (event.ctrlKey || event.metaKey)) {
            return
        }

        emit('keydown', event)
    }
</script>

<template>
    <input
        :id="id"
        :type="inputType"
        :value="sanitizedValue"
        :placeholder="sanitizedPlaceholder"
        :required="required"
        :disabled="disabled"
        :readonly="readonly"
        :maxlength="maxLength"
        :minlength="minLength"
        :pattern="pattern"
        :autocomplete="autocomplete"
        :aria-label="ariaLabel"
        :aria-invalid="ariaInvalid"
        :aria-describedby="ariaDescribedby"
        :class="['ui-input', inputClasses]"
        @input="handleInput"
        @blur="handleBlur"
        @focus="handleFocus"
        @keydown="handleKeydown"
    />
</template>

<style scoped lang="scss">
    .ui-input {
        width: auto;
        padding: 0.75rem 1rem;
        border: 2px solid $color-primary;
        border-radius: 0.5rem;
        font-size: 1rem;
        font-family: inherit;
        line-height: 1.5;
        color: $color-gray-900;
        background: #fff;
        transition: all 0.2s ease;

        &::placeholder {
            color: rgba($color-gray-700, 0.5);
        }

        &:focus {
            outline: none;
            border-color: $color-success;
            box-shadow: 0 0 10px -2px $color-gray-700;
        }

        &--disabled {
            cursor: not-allowed;
        }
    }
</style>

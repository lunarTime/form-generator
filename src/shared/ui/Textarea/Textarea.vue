<script setup lang="ts">
    import { sanitizeString } from '@/shared/lib/sanitize'

    const props = withDefaults(
        defineProps<{
            modelValue?: string
            placeholder?: string
            required?: boolean
            rows?: number
        }>(),
        {
            rows: 4
        }
    )

    const emit = defineEmits<{
        (e: 'update:modelValue', value: string): void
    }>()

    const handleInput = (event: Event) => {
        const value = sanitizeString((event.target as HTMLTextAreaElement).value)

        emit('update:modelValue', value)
    }
</script>

<template>
    <textarea
        :value="modelValue"
        :placeholder="placeholder"
        :required="required"
        :rows="rows"
        class="ui-textarea"
        @input="handleInput"
    />
</template>

<style scoped lang="scss">
    .ui-textarea {
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

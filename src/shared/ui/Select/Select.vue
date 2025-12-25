<script setup lang="ts">
    import type { SelectOption } from '@/shared/types/form'

    const props = defineProps<{
        modelValue?: string | number
        options?: SelectOption[]
        placeholder?: string
        required?: boolean
    }>()

    const emit = defineEmits<{
        (e: 'update:modelValue', value: string | number): void
    }>()

    const handleChange = (event: Event) => {
        emit('update:modelValue', (event.target as HTMLSelectElement).value)
    }
</script>

<template>
    <select
        :value="modelValue"
        :required="required"
        class="ui-select"
        id="ui-select"
        name="ui-select"
        @change="handleChange"
    >
        <option
            v-if="placeholder"
            value=""
            disabled
            selected
        >
            {{ placeholder }}
        </option>
        <option
            v-for="option in options"
            :key="option.value"
            :value="option.value"
        >
            {{ option.label }}
        </option>
    </select>
</template>

<style scoped lang="scss">
    .ui-select {
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

        &:focus {
            outline: none;
            border-color: $color-success;
            box-shadow: 0 0 10px -2px $color-gray-700;
        }

        &--disabled {
            cursor: not-allowed;
            opacity: 0.7;
        }
    }
</style>

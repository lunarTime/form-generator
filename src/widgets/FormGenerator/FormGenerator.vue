<script setup lang="ts">
    import type { FormField, FormData } from '@/shared/types/form'
    import UiInput from '@/shared/ui/Input/Input.vue'
    import UiTextarea from '@/shared/ui/Textarea/Textarea.vue'
    import UiSelect from '@/shared/ui/Select/Select.vue'
    import UiCheckbox from '@/shared/ui/Checkbox/Checkbox.vue'
    import UiButton from '@/shared/ui/Button/Button.vue'

    const props = defineProps<{
        fields: FormField[]
        modelValue: FormData
    }>()

    const emit = defineEmits<{
        (e: 'update:modelValue', value: FormData): void
        (e: 'submit', data: FormData): void
        (e: 'cancel'): void
    }>()

    const updateField = (fieldName: string, value: any) => {
        emit('update:modelValue', {
            ...props.modelValue,
            [fieldName]: value
        })
    }

    const handleSubmit = () => {
        emit('submit', props.modelValue)
    }

    const handleCancel = () => {
        emit('cancel')
    }
</script>

<template>
    <form
        class="form-generator"
        @submit.prevent="handleSubmit"
    >
        <TransitionGroup
            name="field-list"
            tag="div"
            class="form-generator__fields"
        >
            <div
                v-for="field in fields"
                :key="field.name"
                class="form-generator__field"
            >
                <slot
                    :name="`field-${field.name}`"
                    :field="field"
                    :modelValue="modelValue[field.name]"
                    :updateValue="(value: any) => updateField(field.name, value)"
                >
                    <label
                        v-if="field.label"
                        class="field-label"
                    >
                        {{ field.label }}
                        <span
                            v-if="field.required"
                            class="required"
                        >
                            *
                        </span>
                    </label>

                    <UiInput
                        v-if="field.type === 'input'"
                        :modelValue="modelValue[field.name]"
                        :inputType="field.inputType"
                        :placeholder="field.placeholder"
                        :required="field.required"
                        :disabled="field.disabled"
                        @update:modelValue="value => updateField(field.name, value)"
                    />

                    <UiTextarea
                        v-else-if="field.type === 'textarea'"
                        :modelValue="modelValue[field.name]"
                        :placeholder="field.placeholder"
                        :required="field.required"
                        :rows="field.rows"
                        @update:modelValue="value => updateField(field.name, value)"
                    />

                    <UiSelect
                        v-else-if="field.type === 'select'"
                        :modelValue="modelValue[field.name]"
                        :options="field.options"
                        :placeholder="field.placeholder"
                        :required="field.required"
                        @update:modelValue="value => updateField(field.name, value)"
                    />

                    <UiCheckbox
                        v-else-if="field.type === 'checkbox'"
                        :modelValue="modelValue[field.name]"
                        :label="field.checkboxLabel || field.label"
                        @update:modelValue="value => updateField(field.name, value)"
                    />
                </slot>
            </div>
        </TransitionGroup>

        <Transition
            name="actions-fade"
            appear
        >
            <div class="form-generator__actions">
                <UiButton
                    type="button"
                    variant="secondary"
                    @click="handleCancel"
                >
                    Сбросить
                </UiButton>
                <UiButton
                    type="submit"
                    variant="primary"
                >
                    Сохранить
                </UiButton>
            </div>
        </Transition>
    </form>
</template>

<style scoped lang="scss">
    .form-generator {
        &__fields {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            margin-bottom: 2rem;
        }

        &__field {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }

        &__actions {
            display: flex;
            gap: 1rem;
            justify-content: flex-end;
            padding-top: 1rem;
        }

        .field-label {
            font-weight: 600;
            font-size: 1rem;
            color: $color-gray-700;
        }

        .required {
            color: $color-danger;
        }
    }
</style>

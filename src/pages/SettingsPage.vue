<script setup lang="ts">
    import { ref, onMounted } from 'vue'
    import { useStore } from 'vuex'
    import type { FormField, FormData } from '@/shared/types/form'
    import FormGenerator from '@/widgets/FormGenerator/FormGenerator.vue'

    const store = useStore()

    const formName = 'settings'

    const formData = ref<FormData>({
        displayName: '',
        language: 'ru',
        notifications: true
    })

    const fields: FormField[] = [
        {
            name: 'displayName',
            type: 'input',
            label: 'Отображаемое имя',
            placeholder: 'Введите тображаемое имя',
            required: true
        },
        {
            name: 'language',
            type: 'select',
            label: 'Язык интерфейса',
            options: [
                { label: 'Русский', value: 'ru' },
                { label: 'English', value: 'en' }
            ]
        },
        {
            name: 'notifications',
            type: 'checkbox',
            checkboxLabel: 'Получать уведомления'
        }
    ]

    const handleSubmit = async (data: FormData) => {
        await store.dispatch('saveForm', {
            formName,
            data
        })

        alert('Настройки сохранены')
    }

    const handleCancel = () => {
        if (confirm('Сбросить поля?')) {
            formData.value = {
                displayName: '',
                language: 'ru',
                notifications: false
            }

            store.dispatch('clearForm', formName)
        }
    }

    onMounted(async () => {
        await store.dispatch('loadForm', formName)

        const saved = store.getters.getFormData(formName)

        if (saved && typeof saved === 'object' && Object.keys(saved).length > 0) {
            formData.value = {
                displayName: (saved.displayName as string) || '',
                language: (saved.language as string) || 'ru',
                notifications: (saved.notifications as boolean) || false
            }
        }
    })
</script>

<template>
    <div class="page">
        <h1 class="page-title">Настройки профиля</h1>

        <div class="form-container">
            <FormGenerator
                v-model="formData"
                :fields="fields"
                @submit="handleSubmit"
                @cancel="handleCancel"
            >
                <template #field-language="{ field, modelValue, updateValue }">
                    <div class="custom-field">
                        <label class="field-label">
                            {{ field.label }}
                        </label>
                        <div class="language-options">
                            <label class="language-option">
                                <input
                                    type="radio"
                                    :checked="modelValue === 'ru'"
                                    @change="updateValue('ru')"
                                />
                                <span>Русский</span>
                            </label>
                            <label class="language-option">
                                <input
                                    type="radio"
                                    :checked="modelValue === 'en'"
                                    @change="updateValue('en')"
                                />
                                <span>English</span>
                            </label>
                        </div>
                    </div>
                </template>
            </FormGenerator>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .custom-field {
        margin-bottom: 1.5rem;
    }

    .field-label {
        display: block;
        font-weight: 600;
        font-size: 1rem;
        color: $color-gray-700;
        margin-bottom: 0.5rem;
    }

    .language {
        &-options {
            display: flex;
            gap: 1rem;
        }

        &-option {
            flex: 1;
            padding: 1rem;
            border: 2px solid $color-gray-200;
            border-radius: 0.5rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            transition: all 0.2s;

            input[type='radio'] {
                margin: 0;
            }

            input:checked + span {
                font-weight: 600;
            }

            &:hover {
                border-color: $color-primary;
            }
        }
    }
</style>

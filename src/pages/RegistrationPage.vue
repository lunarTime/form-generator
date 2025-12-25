<script setup lang="ts">
    import { ref, onMounted } from 'vue'
    import { useStore } from 'vuex'
    import type { FormField, FormData } from '@/shared/types/form'
    import FormGenerator from '@/widgets/FormGenerator/FormGenerator.vue'

    const store = useStore()

    const formName = 'registration'

    const formData = ref<FormData>({
        username: '',
        email: '',
        password: '',
        country: '',
        terms: false
    })

    const fields: FormField[] = [
        {
            name: 'username',
            type: 'input',
            label: 'Имя пользователя',
            placeholder: 'Введите имя',
            required: true
        },
        {
            name: 'email',
            type: 'input',
            inputType: 'email',
            label: 'Email',
            placeholder: 'example@mail.com',
            required: true
        },
        {
            name: 'password',
            type: 'input',
            inputType: 'password',
            label: 'Пароль',
            placeholder: 'Введите пароль',
            required: true
        },
        {
            name: 'country',
            type: 'select',
            label: 'Страна',
            placeholder: 'Выберите страну',
            required: true,
            options: [
                {
                    label: 'Россия',
                    value: 'russia'
                },
                {
                    label: 'Казахстан',
                    value: 'kazakhstan'
                },
                {
                    label: 'Беларусь',
                    value: 'belarus'
                }
            ]
        },
        {
            name: 'terms',
            type: 'checkbox',
            checkboxLabel: 'Согласен с политикой обработки персональных данных.',
            required: true
        }
    ]

    const handleCancel = () => {
        if (confirm('Сбросить поля?')) {
            formData.value = {
                username: '',
                email: '',
                password: '',
                country: '',
                terms: false
            }

            store.dispatch('clearForm', formName)
        }
    }

    const handleSubmit = async (data: FormData) => {
        await store.dispatch('saveForm', {
            formName,
            data
        })

        alert('Регистрация завершена')
    }

    onMounted(async () => {
        await store.dispatch('loadForm', formName)

        const saved = store.getters.getFormData(formName)

        if (saved && typeof saved === 'object' && Object.keys(saved).length > 0) {
            formData.value = {
                username: (saved.username as string) || '',
                email: (saved.email as string) || '',
                password: (saved.password as string) || '',
                country: (saved.country as string) || '',
                terms: (saved.terms as boolean) || false
            }
        }
    })
</script>

<template>
    <div class="page">
        <h1 class="page-title">Регистрация пользователя</h1>

        <div class="form-container">
            <FormGenerator
                v-model="formData"
                :fields="fields"
                @submit="handleSubmit"
                @cancel="handleCancel"
            />
        </div>
    </div>
</template>

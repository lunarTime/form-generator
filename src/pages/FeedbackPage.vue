<script setup lang="ts">
    import { ref, onMounted } from 'vue'
    import { useStore } from 'vuex'
    import type { FormField, FormData } from '@/shared/types/form'
    import FormGenerator from '@/widgets/FormGenerator/FormGenerator.vue'

    const store = useStore()

    const formName = 'question'

    const formData = ref<FormData>({
        name: '',
        email: '',
        subject: '',
        message: ''
    })

    const fields: FormField[] = [
        {
            name: 'name',
            type: 'input',
            label: 'Ваше имя',
            placeholder: 'Введите Ваше имя',
            required: true
        },
        {
            name: 'email',
            type: 'input',
            inputType: 'email',
            label: 'Email',
            placeholder: 'Введите Ваш email',
            required: true
        },
        {
            name: 'subject',
            type: 'select',
            label: 'Тема обращения',
            placeholder: 'Выберите тему',
            required: true,
            options: [
                { label: 'Вопрос', value: 'question' },
                { label: 'Предложение', value: 'proposal' },
                { label: 'Проблема', value: 'issue' }
            ]
        },
        {
            name: 'message',
            type: 'textarea',
            label: 'Сообщение',
            placeholder: 'Введите Ваше сообщение',
            required: true,
            rows: 4
        }
    ]

    const handleSubmit = async (data: FormData) => {
        await store.dispatch('saveForm', {
            formName,
            data
        })

        alert('Сообщение отправлено')
    }

    const handleCancel = () => {
        if (confirm('Сбросить поля?')) {
            formData.value = {
                name: '',
                email: '',
                subject: '',
                message: ''
            }

            store.dispatch('clearForm', formName)
        }
    }

    onMounted(async () => {
        await store.dispatch('loadForm', formName)

        const saved = store.getters.getFormData(formName)

        if (saved && typeof saved === 'object' && Object.keys(saved).length > 0) {
            formData.value = {
                name: (saved.name as string) || '',
                email: (saved.email as string) || '',
                subject: (saved.subject as string) || '',
                message: (saved.message as string) || ''
            }
        }
    })
</script>

<template>
    <div class="page">
        <h1 class="page-title">Обратная связь</h1>

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

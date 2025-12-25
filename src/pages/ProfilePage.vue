<script setup lang="ts">
    import { ref, onMounted } from 'vue'
    import { useStore } from 'vuex'
    import type { FormField, FormData } from '@/shared/types/form'
    import FormGenerator from '@/widgets/FormGenerator/FormGenerator.vue'

    const store = useStore()

    const formName = 'survey'

    const formData = ref<FormData>({
        fullName: '',
        age: '',
        interests1: false,
        interests2: false,
        interests3: false,
        comments: ''
    })

    const fields: FormField[] = [
        {
            name: 'fullName',
            type: 'input',
            label: 'Полное имя',
            placeholder: 'Введите полное имя',
            required: true
        },
        {
            name: 'age',
            type: 'select',
            label: 'Возраст',
            placeholder: 'Выберите возраст',
            required: true,
            options: [
                { label: '18-25', value: '18-25' },
                { label: '26-35', value: '26-35' },
                { label: '36-45', value: '36-45' },
                { label: '46+', value: '46+' }
            ]
        },
        {
            name: 'interests1',
            type: 'checkbox',
            checkboxLabel: 'Программирование'
        },
        {
            name: 'interests2',
            type: 'checkbox',
            checkboxLabel: 'Дизайн'
        },
        {
            name: 'interests3',
            type: 'checkbox',
            checkboxLabel: 'Маркетинг'
        },
        {
            name: 'comments',
            type: 'textarea',
            label: 'Дополнительные комментарии',
            rows: 5
        }
    ]

    const handleSubmit = async (data: FormData) => {
        await store.dispatch('saveForm', {
            formName,
            data
        })

        alert('Профиль сохранен')
    }

    const handleCancel = () => {
        if (confirm('Сбросить поля?')) {
            formData.value = {
                fullName: '',
                age: '',
                interests1: false,
                interests2: false,
                interests3: false,
                comments: ''
            }

            store.dispatch('clearForm', formName)
        }
    }

    onMounted(async () => {
        await store.dispatch('loadForm', formName)

        const saved = store.getters.getFormData(formName)

        if (saved && typeof saved === 'object' && Object.keys(saved).length > 0) {
            formData.value = {
                fullName: (saved.fullName as string) || '',
                age: (saved.age as string) || '',
                interests1: (saved.interests1 as boolean) || false,
                interests2: (saved.interests2 as boolean) || false,
                interests3: (saved.interests3 as boolean) || false,
                comments: (saved.comments as string) || ''
            }
        }
    })
</script>

<template>
    <div class="page">
        <h1 class="page-title">Профиль</h1>

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

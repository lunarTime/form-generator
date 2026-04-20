import { createStore, type ActionContext } from 'vuex'
import { sanitizeString } from '@/shared/lib/sanitize'
import type { FormData } from '@/shared/types/form'

export interface State {
    savedForms: {
        [formName: string]: FormData
    }
}

export default createStore<State>({
    state: (): State => ({
        savedForms: {}
    }),
    getters: {
        getFormData:
            (state: State) =>
            (formName: string): FormData => {
                return state.savedForms[formName] || {}
            }
    },
    mutations: {
        SAVE_FORM(state: State, payload: { formName: string; data: FormData }) {
            state.savedForms = {
                ...state.savedForms,
                [payload.formName]: payload.data
            }
        },
        CLEAR_FORM(state: State, formName: string) {
            if (state.savedForms[formName]) {
                delete state.savedForms[formName]
            }
        }
    },
    actions: {
        saveForm({ commit }: ActionContext<State, State>, payload: { formName: string; data: FormData }) {
            const sanitized: FormData = {}

            for (const [key, value] of Object.entries(payload.data)) {
                sanitized[key] = typeof value === 'string' ? sanitizeString(value) : value
            }

            commit('SAVE_FORM', {
                formName: payload.formName,
                data: sanitized
            })

            try {
                localStorage.setItem(`form_${payload.formName}`, JSON.stringify(sanitized))
            } catch (e) {
                console.error('Ошибка сохранения формы:', e)
            }
        },
        loadForm({ commit }: ActionContext<State, State>, formName: string) {
            try {
                const saved = localStorage.getItem(`form_${formName}`)

                if (saved) {
                    const parsed = JSON.parse(saved)

                    if (typeof parsed === 'object' && parsed !== null) {
                        commit('SAVE_FORM', {
                            formName,
                            data: parsed
                        })
                    }
                }
            } catch (e) {
                console.error('Ошибка загрузки формы:', e)
            }
        },
        clearForm({ commit }: ActionContext<State, State>, formName: string) {
            commit('CLEAR_FORM', formName)

            try {
                localStorage.removeItem(`form_${formName}`)
            } catch (e) {
                console.error('Ошибка очистки формы:', e)
            }
        }
    }
})

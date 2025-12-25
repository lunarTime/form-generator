<script setup lang="ts">
    import { computed, useId } from 'vue'
    import { escapeHtml } from '@/shared/lib/sanitize'

    const props = withDefaults(
        defineProps<{
            modelValue?: string | number | boolean
            label?: string
            error?: boolean
            errorMessage?: string
            hint?: string
            required?: boolean
            disabled?: boolean
            readonly?: boolean
            ariaLabel?: string
            ariaLive?: 'polite' | 'assertive' | 'off'
            showError?: boolean
        }>(),
        {
            showError: true,
            ariaLive: 'polite'
        }
    )

    const emit = defineEmits<{
        (e: 'update:modelValue', value: any): void
        (e: 'blur'): void
        (e: 'focus'): void
    }>()

    const id = useId()

    const sanitizedLabel = computed(() => (props.label ? escapeHtml(props.label) : ''))
    const sanitizedErrorMessage = computed(() => (props.errorMessage ? escapeHtml(props.errorMessage) : ''))
    const sanitizedHint = computed(() => (props.hint ? escapeHtml(props.hint) : ''))
    const fieldClasses = computed(() => ({
        'ui-field--error': props.error,
        'ui-field--disabled': props.disabled,
        'ui-field--readonly': props.readonly,
        'ui-field--required': props.required
    }))

    const handleUpdate = (value: any) => {
        if (!props.disabled && !props.readonly) {
            emit('update:modelValue', value)
        }
    }

    const handleBlur = () => {
        emit('blur')
    }

    const handleFocus = () => {
        emit('focus')
    }
</script>

<template>
    <div
        class="ui-field"
        :class="fieldClasses"
    >
        <label
            v-if="label"
            :for="id"
            class="ui-field__label"
            :aria-label="ariaLabel"
        >
            {{ sanitizedLabel }}
            <span
                v-if="required"
                class="ui-field__required"
                aria-label="Обязательное поле"
            >
                *
            </span>
        </label>

        <div class="ui-field__control-wrapper">
            <slot
                name="control"
                :id="id"
                :value="modelValue"
                :update="handleUpdate"
                :onBlur="handleBlur"
                :onFocus="handleFocus"
            />
        </div>

        <Transition name="error-fade">
            <div
                v-if="showError && error && errorMessage"
                class="ui-field__error"
                role="alert"
                :aria-live="ariaLive"
            >
                <span class="ui-field__error-text">
                    {{ sanitizedErrorMessage }}
                </span>
            </div>
        </Transition>

        <div
            v-if="hint && !error"
            class="ui-field__hint"
        >
            {{ sanitizedHint }}
        </div>
    </div>
</template>

<style scoped lang="scss">
    .ui-field {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

        &__label {
            display: flex;
            align-items: center;
            gap: 0.25rem;
            font-weight: 600;
            font-size: 0.875rem;
            color: $color-gray-700;
            user-select: none;
        }

        &__required {
            color: $color-danger;
            font-weight: 700;
        }

        &__control-wrapper {
            position: relative;
        }

        &__error {
            display: flex;
            align-items: flex-start;
            gap: 0.375rem;
            font-size: 0.875rem;
            color: $color-danger;
            line-height: 1.4;

            &-text {
                flex: 1;
            }
        }

        &__error-icon {
            font-size: 1rem;
            line-height: 1;
        }

        &__hint {
            font-size: 0.75rem;
            color: $color-gray-50;
            font-style: italic;
            line-height: 1.4;
        }

        &--disabled {
            opacity: 0.6;
            cursor: not-allowed;

            .ui-field__label {
                cursor: not-allowed;
            }
        }

        &--readonly {
            .ui-field__control-wrapper {
                pointer-events: none;
            }
        }
    }

    .error-fade {
        &-enter-active,
        &-leave-active {
            transition: all 0.2s ease;
        }

        &-enter-from,
        &-leave-to {
            opacity: 0;
            transform: translateY(-5px);
        }
    }
</style>

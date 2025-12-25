<script setup lang="ts">
    import { computed } from 'vue'
    import { escapeHtml, sanitizeString } from '@/shared/lib/sanitize'
    import type { ButtonType, ButtonVariant, ButtonSize } from '@/shared/types/button'

    const props = withDefaults(
        defineProps<{
            type?: ButtonType
            variant?: ButtonVariant
            size?: ButtonSize
            disabled?: boolean
            loading?: boolean
            icon?: string
            text?: string
            ariaLabel?: string
            fullWidth?: boolean
        }>(),
        {
            type: 'button',
            variant: 'primary',
            size: 'md'
        }
    )

    const emit = defineEmits<{
        (e: 'click', event: MouseEvent): void
    }>()

    const sanitizedText = computed(() => (props.text ? sanitizeString(props.text) : ''))
    const sanitizedIcon = computed(() => {
        if (!props.icon) {
            return ''
        }

        const icon = String(props.icon)

        if (icon.length > 10) {
            return icon.slice(0, 2)
        }

        return escapeHtml(icon)
    })

    const buttonClasses = computed(() => ({
        [`ui-button--${props.variant}`]: true,
        [`ui-button--${props.size}`]: true,
        'ui-button--disabled': props.disabled,
        'ui-button--loading': props.loading,
        'ui-button--full-width': props.fullWidth
    }))

    const handleClick = (event: MouseEvent) => {
        if (props.disabled || props.loading) {
            event.preventDefault()
            event.stopPropagation()

            return
        }

        emit('click', event)
    }
</script>

<template>
    <button
        :type="type"
        :disabled="disabled || loading"
        :aria-label="ariaLabel"
        :aria-busy="loading"
        :class="['ui-button', buttonClasses]"
        @click="handleClick"
    >
        <span
            v-if="loading"
            class="ui-button__spinner"
            aria-hidden="true"
        ></span>
        <span
            v-if="icon && !loading"
            class="ui-button__icon"
            aria-hidden="true"
        >
            {{ sanitizedIcon }}
        </span>
        <span class="ui-button__text">
            <slot>
                {{ sanitizedText }}
            </slot>
        </span>
    </button>
</template>

<style scoped lang="scss">
    .ui-button {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        border: none;
        border-radius: 0.5rem;
        text-align: center;
        font-weight: 600;
        font-family: inherit;
        cursor: pointer;
        overflow: hidden;
        transition: all 0.2s ease;

        &__spinner {
            width: 1rem;
            height: 1rem;
            border: 2px solid $color-gray-200;
            border-top-color: currentColor;
            border-radius: 50%;
            animation: spin 0.6s linear infinite;
        }

        &__icon {
            font-size: 1.25rem;
            line-height: 1;
        }

        &__text {
            line-height: 1;
        }

        &:focus-visible {
            outline: 2px solid $color-primary;
            outline-offset: 2px;
        }

        &--disabled,
        &--loading {
            opacity: 0.6;
            cursor: not-allowed;
            pointer-events: none;
        }

        &--full-width {
            width: 100%;
        }

        &--sm {
            padding: 0.5rem 1rem;
            font-size: 0.875rem;
        }

        &--md {
            padding: 0.75rem 1.5rem;
            font-size: 1rem;
        }

        &--lg {
            padding: 1rem 2rem;
            font-size: 1.125rem;
        }

        &--primary {
            background: $color-primary;
            color: #fff;

            &:hover:not(.ui-button--disabled):not(.ui-button--loading) {
                transform: translateY(-2px);
            }

            &:active:not(.ui-button--disabled):not(.ui-button--loading) {
                transform: translateY(0);
            }
        }

        &--secondary {
            background: #fff;
            color: $color-gray-700;
            border: 2px solid $color-gray-200;

            &:hover:not(.ui-button--disabled):not(.ui-button--loading) {
                border-color: currentColor;
                color: $color-primary;
                transform: translateY(-2px);
            }

            &:active:not(.ui-button--disabled):not(.ui-button--loading) {
                transform: translateY(0);
            }
        }

        &--danger {
            background: $color-danger;
            color: #fff;

            &:hover:not(.ui-button--disabled):not(.ui-button--loading) {
                transform: translateY(-2px);
            }

            &:active:not(.ui-button--disabled):not(.ui-button--loading) {
                transform: translateY(0);
            }
        }

        &--ghost {
            background: transparent;
            color: $color-gray-700;

            &:hover:not(.ui-button--disabled):not(.ui-button--loading) {
                background: $color-gray-200;
            }
        }
    }

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
</style>

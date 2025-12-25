<script lang="ts" setup>
    import { useRouter } from 'vue-router'

    const router = useRouter()

    const goHome = () => {
        router.push({ name: 'home' })
    }
</script>

<template>
    <div class="page not-found">
        <div class="not-found-content">
            <div class="not-found-title">404</div>
            <h1>Страница не найдена</h1>
            <p>
                Такой страницы не существует. <br />
                Проверьте адрес или перейдите на главную страницу.
            </p>
            <button
                class="go-home"
                @click="goHome"
            >
                На главную
            </button>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .page {
        &.not-found {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 65vh;
        }

        .not-found {
            &-content {
                border-radius: 1rem;
                text-align: center;
            }

            &-title {
                font-size: 7rem;
                font-weight: bold;
                color: $color-primary;
                margin-bottom: 1rem;
                letter-spacing: 0.1em;
            }
        }

        h1 {
            margin: 0 0 1rem;
        }

        p {
            color: $color-gray-700;
            margin-bottom: 2rem;
            line-height: 1.5;
        }

        .go-home {
            padding: 0.8rem 2rem;
            background-color: $color-success;
            color: #fff;
            border: none;
            border-radius: 2rem;
            font-size: 1.1rem;
            font-weight: 500;
            cursor: pointer;
            transition: background 0.2s;

            &:hover {
                background-color: $color-primary;
            }
        }
    }
</style>

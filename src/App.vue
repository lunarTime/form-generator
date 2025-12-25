<script setup lang="ts">
    const links = [
        { path: '/registration', text: 'Регистрация' },
        { path: '/feedback', text: 'Обратная связь' },
        { path: '/profile', text: 'Профиль' },
        { path: '/settings', text: 'Настройки' }
    ]
</script>

<template>
    <div id="app">
        <nav class="app-nav">
            <div class="nav-container">
                <router-link
                    to="/"
                    class="nav-logo"
                >
                    Генератор форм
                </router-link>
                <div class="nav-links">
                    <router-link
                        v-for="link in links"
                        :key="link.path"
                        :to="link.path"
                        class="nav-link"
                    >
                        {{ link.text }}
                    </router-link>
                </div>
            </div>
        </nav>

        <main class="app-main">
            <router-view v-slot="{ Component }">
                <Transition
                    name="fade"
                    mode="out-in"
                >
                    <component :is="Component" />
                </Transition>
            </router-view>
        </main>
    </div>
</template>

<style scoped lang="scss">
    .app {
        &-main {
            padding: 2rem;
        }

        &-nav {
            position: sticky;
            top: 0;
            background: $color-primary;
            box-shadow: 0 4px 16px -2px $color-gray-700;
            z-index: 100;
        }
    }

    .nav {
        &-container {
            display: flex;
            align-items: center;
            justify-content: space-between;
            max-width: 80rem;
            margin: 0 auto;
            padding: 1rem 2rem;
        }

        &-logo {
            display: block;
            font-size: 1.25rem;
            font-weight: 800;
            text-decoration: none;
            transition: all 0.2s;
            color: $color-gray-100;

            &:hover {
                color: $color-gray-700;
            }
        }

        &-links {
            display: flex;
            gap: 0.5rem;
        }

        &-link {
            padding: 0.5rem 1rem;
            border-radius: 0.5rem;
            text-decoration: none;
            color: $color-gray-100;
            transition: all 0.2s;

            &:hover,
            &.router-link-active {
                color: $color-gray-900;
            }
        }
    }
</style>

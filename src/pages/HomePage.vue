<template>
    <div class="home-page">
        <section class="hero">
            <h1 class="hero__title"> Генератор форм </h1>
        </section>

        <section class="demos">
            <div class="demos-grid">
                <router-link
                    :to="{ name: 'registration' }"
                    class="demo-card"
                >
                    <h3>Регистрация</h3>
                    <p>Форма регистрации пользователя</p>
                </router-link>

                <router-link
                    :to="{ name: 'feedback' }"
                    class="demo-card"
                >
                    <h3>Обратная связь</h3>
                    <p>Форма обратной связи</p>
                </router-link>

                <router-link
                    :to="{ name: 'profile' }"
                    class="demo-card"
                >
                    <h3>Профиль</h3>
                    <p>Профиль с полями и чекбоксами</p>
                </router-link>

                <router-link
                    :to="{ name: 'settings' }"
                    class="demo-card"
                >
                    <h3>Настройки</h3>
                    <p>Настройки с кастомными слотами</p>
                </router-link>
            </div>
        </section>
    </div>
</template>

<style scoped lang="scss">
    .home-page {
        max-width: $container-width;
        margin-inline: auto;
    }

    .hero {
        padding: 4rem 0;
        text-align: center;

        &__title {
            margin-bottom: 1rem;
            font-size: 3rem;
            font-weight: 800;
            color: $color-secondary;
        }

        &__subtitle {
            font-size: 1.25rem;
            color: $color-gray-700;
            margin-bottom: 2rem;
        }
    }

    .demos {
        margin-top: 2rem;

        &-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
        }

        h2 {
            text-align: center;
            font-size: 2rem;
            margin-bottom: 2rem;
        }
    }

    .demo {
        &-card {
            background: #fff;
            padding: 2rem;
            border-radius: 1rem;
            text-decoration: none;
            color: inherit;
            text-align: center;
            transition: all 0.3s;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

            &:hover {
                transform: translateY(-5px);
                box-shadow: 0 20px 25px rgba(0, 0, 0, 0.15);

                h3 {
                    color: $color-secondary;
                }

                p {
                    color: $color-success;
                }
            }

            h3 {
                font-size: 1.5rem;
                margin-bottom: 0.5rem;
                transition: all 0.3s;
            }

            p {
                color: $color-gray-700;
                transition: all 0.3s;
            }
        }
    }
</style>

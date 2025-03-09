<template>
    <div class="main-layout">
        <Header />
        <main class="container">
            <slot />
        </main>
        <Footer />
    </div>
</template>

<style scoped>
    .main-layout {
        min-height: 100vh;
        min-height: 100dvh;
        display: grid;
        grid-template-rows:
            auto
            1fr
            auto;
    }
</style>

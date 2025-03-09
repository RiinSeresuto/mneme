<template>
    <div class="container">
        <header>
            <h1>Mneme</h1>
            <Navbar />
        </header>
    </div>
</template>

<style scoped>
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--space-s) 0;
    }

    header h1 {
        font-family: "Josefin Slab", serif;
        font-optical-sizing: auto;
        font-weight: 700;
        font-style: normal;
        font-size: var(--step-2);

        color: var(--color-dark);

        height: fit-content;
    }
</style>

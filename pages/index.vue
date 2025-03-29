<script setup lang="ts">
    useSeoMeta({
        title: "Mneme",
        ogTitle: "Mneme",
        description: "Simple photobooth application for the web.",
        ogDescription: "Simple photobooth application for the web.",
        //ogImage: "https://example.com/image.png",
    });
</script>

<template>
    <div id="hero">
        <h1 class="header--title-default">I am a moment, frozen in time.</h1>
        <p class="header--title-phrase">
            Create photostrips on a whim to carry memories on the wind.
        </p>

        <NuxtLink class="cta" to="smile">Get Started</NuxtLink>
    </div>
</template>

<style scoped>
    .header--title-default {
        font-family: "Josefin Slab", serif;
        font-optical-sizing: auto;
        font-weight: 700;
        font-style: normal;
        font-size: var(--step-5);

        color: var(--color-dark);

        text-transform: uppercase;
    }

    #hero {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: var(--space-s);
    }

    .header--title-phrase {
        font-family: "Josefin Sans", sans-serif;
        font-size: var(--step-2);
    }

    .cta {
        padding: var(--space-2xs) var(--space-s);

        background-color: #fff;
        border: 1px var(--color-dark) solid;
        border-radius: 100px;

        font-family: "Josefin Sans", sans-serif;

        font-weight: 700;
        letter-spacing: 4px;
    }
</style>

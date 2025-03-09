<script setup lang="ts">
    useSeoMeta({
        title: "Maku",
        ogTitle: "Maku",
        description: "Simple photobooth application for the web.",
        ogDescription: "Simple photobooth application for the web.",
        //ogImage: "https://example.com/image.png",
    });
</script>

<template>
    <h1 class="header--title-default">I am a moment, frozen in time.</h1>
    <p>Create photostrips on a whim to carry memories on the wind.</p>
</template>

<style>
    .header--title-default {
        font-family: "Josefin Slab", serif;
        font-optical-sizing: auto;
        font-weight: 700;
        font-style: normal;
        font-size: var(--step-5);

        color: var(--color-dark);
    }
</style>

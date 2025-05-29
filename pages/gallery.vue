<script setup>
    useSeoMeta({
        title: "Mneme | Gallery",
        ogTitle: "Mneme | Gallery",
        description: "Simple photobooth application for the web.",
        ogDescription: "Simple photobooth application for the web.",
        //ogImage: "https://example.com/image.png",
    });
</script>

<template>
    <h1>Gallery</h1>

    <Gallery :columns="6" />
</template>

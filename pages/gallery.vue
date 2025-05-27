<script setup>
    import { db } from "../lib/db";

    const thumbnailsrc = ref([]);
    const imageview = ref([]);

    const viewImage = async (id) => {
        imageview.value = await db.images.get(id);
    };

    const fetchImages = async () => {
        thumbnailsrc.value = await db.images
            .orderBy("date_created")
            .reverse()
            .toArray();
    };

    onMounted(() => {
        fetchImages();
    });

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

    <div id="gallery-view">
        <div
            class="gallery--item"
            v-for="img in thumbnailsrc"
            :key="img.id"
            @click="viewImage(img.id)"
        >
            <img :src="img.blob" height="100%" width="100%" />
        </div>
    </div>
</template>

<style scoped>
    #gallery-view {
        display: grid;
        grid-template-columns: repeat(6, 1fr);

        gap: var(--space-s);
    }

    .gallery--item {
        display: block;

        background-color: red;
    }
</style>

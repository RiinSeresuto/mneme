<script setup>
    import { db } from "../lib/db";

    const thumbnailsrc = ref([]);
    const imageview = ref([]);
    const dialog = ref(null);

    const showModal = () => {
        dialog.value.showModal();
    };

    const closeModal = () => {
        dialog.value.close();

        imageview.value = [];
    };

    const viewImage = async (id) => {
        imageview.value = await db.images.get(id);

        showModal();
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

    <dialog ref="dialog">
        <button @click="closeModal()">Close</button>
        <img :src="imageview.blob" />
    </dialog>
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
        cursor: pointer;
        box-shadow: black 1px 1px;
    }

    dialog {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        border: none;
        border-radius: 4px;
    }

    dialog::backdrop {
        background-image: linear-gradient(
            45deg,
            magenta,
            rebeccapurple,
            dodgerblue,
            green
        );
        opacity: 0.5;
    }
</style>

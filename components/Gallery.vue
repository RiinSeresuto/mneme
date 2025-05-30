<script setup>
    import { db } from "../lib/db";

    const emit = defineEmits(["image-selected"]);
    const thumbnailsrc = ref([]);
    const imageview = ref([]);
    const dialog = ref(null);

    const props = defineProps({
        columns: {
            type: Number,
            default: 3,
        },
        selection: {
            type: Boolean,
            default: false,
        },
    });

    const selectImage = (img) => {
        emit("image-selected", img);
    };

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

    const gridCount = computed(() => ({
        "--col-count": props.columns,
    }));

    onMounted(() => {
        fetchImages();
    });
</script>

<template>
    <div id="gallery-view" :style="gridCount">
        <div class="gallery--item" v-for="img in thumbnailsrc" :key="img.id">
            <img :src="img.blob" height="100%" width="100%" />

            <div class="bar">
                <span @click="viewImage(img.id)">View</span>
                <span v-if="props.selection" @click="selectImage(img)"
                    >Select</span
                >
            </div>
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
        grid-template-columns: repeat(var(--col-count), 1fr);

        gap: var(--space-s);
    }

    .gallery--item {
        display: block;

        background-color: red;
        cursor: pointer;

        position: relative;
    }

    .bar {
        width: 100%;
        height: 30px;
        background-color: rgba(0, 0, 0, 0.281);
        position: absolute;
        bottom: 0;
        display: none;
    }

    .gallery--item:hover .bar {
        display: flex;
        justify-content: center;
        gap: 4px;
    }

    .bar span {
        color: aliceblue;
    }

    .bar span:hover {
        text-decoration: underline;
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

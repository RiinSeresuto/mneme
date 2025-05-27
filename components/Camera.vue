<script setup>
    import { nanoid } from "nanoid";
    import { db } from "../lib/db";

    const video = ref(null);
    const snap = ref(null);
    const canvas = ref(null);

    var thumbnailsrc = ref([]);
    var context = null;

    const constraints = {
        audio: false,
        video: {
            width: { ideal: 600 },
            height: { ideal: 400 },
        },
    };

    const webcam = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia(
                constraints
            );

            if (video.value) {
                video.value.srcObject = stream;
            }

            window.stream = stream;
        } catch (e) {
            console.error(e.toString());
        }
    };

    const generateFilename = () => {
        const timestamp = new Date().toISOString().replace(/[:.]/g, "-");

        return `image_${timestamp}`;
    };

    const fetchImages = async () => {
        thumbnailsrc.value = await db.images
            .orderBy("date_created")
            .reverse()
            .limit(5)
            .toArray();
    };

    const clicked = () => {
        if (context && video.value) {
            context.drawImage(video.value, 0, 0, 600, 400);
        }

        if (canvas.value.toDataURL("image/png")) {
            db.images
                .add({
                    id: nanoid(),
                    filename: generateFilename(),
                    date_created: new Date()
                        .toISOString()
                        .slice(0, 19)
                        .replace("T", " "),
                    blob: canvas.value.toDataURL("image/png"),
                })
                .then(() => {
                    fetchImages();
                });
        }
    };

    onMounted(() => {
        import("boxicons");

        if (canvas.value) {
            context = canvas.value.getContext("2d");
        }

        fetchImages();
        webcam();
    });
</script>

<template>
    <div id="camera-view">
        <video
            ref="video"
            id="video"
            style="width: 600px; height: 400px"
            autoplay
        ></video>
    </div>

    <div ref="snap" class="snap" @click="clicked">
        <i class="bx bx-camera"></i> Snap
    </div>

    <div class="thumbnail-view">
        <div v-for="img in thumbnailsrc" :key="img.id" class="thumbnail">
            <img :src="img.blob" height="100%" width="100%" />
        </div>

        <div class="thumbnail">Gallery</div>
    </div>

    <canvas
        ref="canvas"
        width="600px"
        height="400px"
        style="display: none"
    ></canvas>
</template>

<style scoped>
    .snap {
        background-color: red;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        margin-top: 16px;
        margin-inline: auto;
    }

    .thumbnail-view {
        margin-top: 16px;
        width: 100%;
        display: flex;
        justify-content: center;
        gap: 8px;
    }

    .thumbnail {
        background-color: gray;
        height: 75px;
        width: 100px;
        border-radius: 8px;
        overflow: hidden;
    }

    #camera-view {
        width: 100%;

        display: flex;
        justify-content: center;
    }
</style>

<script setup>
    const canvas = ref(null);
    const frameTemplate = ref(null);
    const ctx = ref(null);

    const DPI = 300;
    const widthInInches = 2;
    const heightInInches = 6;

    const props = defineProps({
        imageCount: {
            type: Number,
        },
        selectedImage: {
            type: Array,
            default: [],
        },
    });

    const placeImge = (blob, x, y, width, height) => {
        const img = new Image();
        const url = URL.createObjectURL(blob);

        img.onload = () => {
            ctx.value.drawImage(img, x, y, width, height);

            URL.revokeObjectURL(url);
        };
    };

    onMounted(() => {
        if (canvas.value) {
            ctx.value = canvas.value.getContext("2d");

            canvas.value.width = widthInInches * DPI;
            canvas.value.height = heightInInches * DPI;
        }
    });

    watch(props.selectedImage, () => {
        console.log(props.selectedImage);
    });

    const getCoordinate = (event) => {
        const rect = canvas.value.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        console.log("Coordinates ==>", x, y);
    };

    const canvasBoxStyle = computed(() => ({
        "--width": `${widthInInches * DPI}px`,
        "--height": `${heightInInches * DPI}px`,
    }));
</script>

<template>
    Choose only {{ props.imageCount }} images from the selection

    <!-- <div v-for="img in props.selectedImage">
        <img :src="img.blob" alt="" />
    </div> -->

    <div class="canvas--box" :style="canvasBoxStyle">
        <canvas ref="canvas" @click="getCoordinate"></canvas>

        <img ref="frameTemplate" src="/img/Option-01.png" />
    </div>
</template>

<style scope>
    :root {
        --scale: 0.65;
        --transform-origin: top left;
    }

    template {
        width: 100%;
    }

    .canvas--box {
        position: relative;
        display: block;
        width: var(--width);
        height: var(--height);
        transform: scale(var(--scale));
        transform-origin: var(--transform-origin);
    }

    .canvas--box canvas {
        position: absolute;
        display: block;
        top: 0;
        left: 0;
        transform: scale(var(--scale));
        transform-origin: var(--transform-origin);
    }

    .canvas--box img {
        /* display: none; */
        position: absolute;
        top: 0;
        left: 0;
        pointer-events: none;
        transform: scale(var(--scale));
        transform-origin: var(--transform-origin);
    }
</style>

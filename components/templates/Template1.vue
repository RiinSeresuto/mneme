<script setup>
    const canvasPreview = ref(null);
    const frameTemplate = ref(null);
    const ctxPreview = ref(null);

    const positions = [
        { x: 19.45, y: 36.52, width: 160 },
        { x: 19.45, y: 174.52, width: 160 },
        { x: 19.45, y: 312.52, width: 160 },
    ];

    const props = defineProps({
        imageCount: {
            type: Number,
        },
        selectedImage: {
            type: Array,
            default: [],
        },
    });

    const placeImge = (src, x, y, width) => {
        const img = new Image();

        img.onload = () => {
            const aspectRatio = img.height / img.width;
            const height = width * aspectRatio;

            ctxPreview.value.drawImage(img, x, y, width, height);

            if (frameTemplate.value.complete) {
                ctxPreview.value.drawImage(
                    frameTemplate.value,
                    0,
                    0,
                    canvasPreview.value.width,
                    canvasPreview.value.height
                );
            } else {
                frameTemplate.value.onload = () => {
                    ctxPreview.value.drawImage(
                        frameTemplate.value,
                        0,
                        0,
                        canvasPreview.value.width,
                        canvasPreview.value.height
                    );
                };
            }
        };

        img.src = src;

        console.log(x, y);
    };

    onMounted(() => {
        if (canvasPreview.value) {
            ctxPreview.value = canvasPreview.value.getContext("2d");
        }
    });

    watch(props.selectedImage, () => {
        ctxPreview.value.clearRect(
            0,
            0,
            canvasPreview.value.width,
            canvasPreview.value.height
        );

        props.selectedImage.forEach((image, index) => {
            placeImge(
                image.blob,
                positions[index].x,
                positions[index].y,
                positions[index].width,
                positions[index].height
            );
        });
    });

    const getCoordinate = (event) => {
        const rect = canvasPreview.value.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        console.log("Coordinates ==>", x, y);
    };
</script>

<template>
    <p>Choose only {{ props.imageCount }} images from the selection</p>

    <div class="canvas--containier">
        <div class="canvas--box">
            <canvas
                ref="canvasPreview"
                @click="getCoordinate"
                width="200"
                height="600"
            ></canvas>

            <img ref="frameTemplate" src="/img/Option-01.png" />
        </div>
    </div>
</template>

<style scope>
    :root {
        --scale: 0.65;
        --transform-origin: top left;

        --width: 200px;
        --height: 600px;
    }

    template {
        width: 100%;
    }

    p {
        text-align: center;
    }

    .canvas--containier {
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .canvas--box {
        position: relative;
        display: block;
        width: var(--width);
        height: var(--height);
    }

    .canvas--box canvas {
        position: absolute;
        display: block;
        top: 0;
        left: 0;
        width: var(--width);
        height: var(--height);
    }

    .canvas--box img {
        display: none;
        position: absolute;
        top: 0;
        left: 0;
        pointer-events: none;
    }
</style>

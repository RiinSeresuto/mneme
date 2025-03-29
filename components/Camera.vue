<script setup>
    const video = ref(null);
    const snap = ref(null);
    const canvas = ref(null);
    let context = null;

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

    const clicked = () => {
        if (context && video.value) {
            context.drawImage(video.value, 0, 0, 600, 400);
        }
    };

    onMounted(() => {
        import("boxicons");

        if (canvas.value) {
            context = canvas.value.getContext("2d");
        }

        webcam();
    });
</script>

<template>
    <video
        ref="video"
        id="video"
        style="width: 600px; height: 400px"
        autoplay
    ></video>
    <div ref="snap" class="snap" @click="clicked">
        <i class="bx bx-camera"></i> Snap
    </div>

    <canvas ref="canvas" width="600px" height="400px"></canvas>
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
    }
</style>

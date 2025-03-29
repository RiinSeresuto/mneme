<script setup>
    // aspect ratio of the image is 3:2
    useSeoMeta({
        title: "Mneme | Smile",
        ogTitle: "Mneme | Smile",
        description: "Simple photobooth application for the web.",
        ogDescription: "Simple photobooth application for the web.",
        //ogImage: "https://example.com/image.png",
    });

    // onMounted(() => {
    //     import("boxicons");
    // });
</script>
<template>
    <Camera />
</template>

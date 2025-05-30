<script setup>
    const route = useRoute();
    const validTemplatesId = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    const id = parseInt(route.params.id);

    const selectedImage = ref([]);
    const imageCount = ref(0);

    if (!validTemplatesId.includes(id)) {
        throw createError({
            statusCode: 404,
            statusMessage: "Template Not Found",
        });
    }

    switch (id) {
        case 1:
        case 2:
        case 3:
        case 6:
        case 8:
        case 9:
        case 10:
            imageCount.value = 3;
            break;
        case 4:
        case 5:
        case 11:
            imageCount.value = 4;
            break;
        case 7:
            imageCount.value = 2;
    }

    const addImage = (image) => {
        if (!selectedImage.value.some((img) => img.id === image.id)) {
            if (selectedImage.value.length < imageCount.value) {
                selectedImage.value.push(image);
            }
        }
    };
</script>

<template>
    <h1>Template {{ id }}</h1>

    <div id="sections">
        <div id="galeryCol">
            <Gallery
                :columns="4"
                :selection="true"
                @image-selected="addImage"
            />
        </div>
        <div id="previewCol">
            <div v-if="id == 1">
                <TemplatesTemplate1
                    :imageCount="imageCount"
                    :selectedImage="selectedImage"
                />
            </div>
            <div v-else-if="id == 2">You've Chose Template 2</div>
        </div>
    </div>
</template>

<style scope>
    #sections {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--space-m);
    }
</style>

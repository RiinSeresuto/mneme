<script setup>
    const route = useRoute();
    const validTemplatesId = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    const id = parseInt(route.params.id);

    const selectedIimage = ref([]);

    if (!validTemplatesId.includes(id)) {
        throw createError({
            statusCode: 404,
            statusMessage: "Template Not Found",
        });
    }

    switch (id) {
        case 1:
            break;
        case 2:
            break;
    }
</script>

<template>
    <h1>Template {{ id }}</h1>
    <div v-if="id == 1">You've Chosen Template 1</div>
    <div v-else-if="id == 2">You've Chose Template 2</div>
</template>

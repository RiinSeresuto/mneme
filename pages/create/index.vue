<script setup>
    const templates = ref([
        {
            link: "/img/Option-01.png",
            name: "Option 1",
            description: "2x6 photo strip 3x images top",
        },
        {
            link: "/img/Option-02.png",
            name: "Option 2",
            description: "2x6 photo strip 3x images bottom",
        },
        {
            link: "/img/Option-03.png",
            name: "Option 3",
            description: "2x6 photo strip 3x images middle",
        },
        {
            link: "/img/Option-04.png",
            name: "Option 4",
            description: "2x6 photo strip 4x images bottom",
        },
        {
            link: "/img/Option-05.png",
            name: "Option 5",
            description: "2x6 photo strip 4x images top",
        },
        {
            link: "/img/Option-06.png",
            name: "Option 6",
            description: "2x6 photo strip 3x images middle",
        },
        {
            link: "/img/Option-07.png",
            name: "Option 7",
            description: "4x6 post-card 2x images",
        },
        {
            link: "/img/Option-08.png",
            name: "Option 8",
            description: "2x6 photo strip 3x images horizontal",
        },
        {
            link: "/img/Option-09.png",
            name: "Option 9",
            description: "4x6 post-card 3x images",
        },
        {
            link: "/img/Option-10.png",
            name: "Option 10",
            description: "4x6 post-card 3x images right",
        },
        {
            link: "/img/Option-11.png",
            name: "Option 11",
            description: "4x6 post-card 4x images",
        },
    ]);

    useSeoMeta({
        title: "Mneme | Create",
        ogTitle: "Mneme | Create",
        description: "Simple photobooth application for the web.",
        ogDescription: "Simple photobooth application for the web.",
        //ogImage: "https://example.com/image.png",
    });
</script>

<template>
    <h1>Template</h1>
    <p>Choose a template below for your photosctrips</p>

    <div id="templates">
        <NuxtLink
            v-for="(template, index) in templates"
            :key="index"
            class="template-item"
            :to="`/create/${index + 1}`"
        >
            <img :src="template.link" :alt="template.name" />
        </NuxtLink>
    </div>
</template>

<style scoped>
    #templates {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        gap: var(--space-m);
    }

    .template-item {
        max-width: 300px;
        padding: var(--space-3xs);
        cursor: pointer;

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

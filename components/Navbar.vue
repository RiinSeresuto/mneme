<template>
    <ul>
        <li><NuxtLink class="nav-link" to="/">Home</NuxtLink></li>
        <li><NuxtLink class="nav-link" to="/gallery">Gallery</NuxtLink></li>
        <li><NuxtLink class="nav-link" to="/create">Create</NuxtLink></li>
        <li><NuxtLink class="nav-link" to="/about">About</NuxtLink></li>
        <li>
            <NuxtLink class="nav-link" to="/privacy-policy">
                Privacy Policy
            </NuxtLink>
        </li>
    </ul>
</template>

<style scoped>
    ul {
        list-style-type: none;
        padding: var(--space-2xs) var(--space-s);

        display: flex;
        align-items: center;

        gap: var(--space-s);

        background-color: #fff;
        border: 1px var(--color-dark) solid;
        border-radius: 100px;
    }

    .nav-link {
        /* text-transform: uppercase; */
        font-weight: 700;
        font-family: "Josefin Sans", sans-serif;
    }
</style>

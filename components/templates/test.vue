<template>
    <div>
        <!-- Display area -->
        <div class="relative" style="width: 600px; height: 400px">
            <canvas
                ref="canvas"
                class="absolute top-0 left-0"
                width="600"
                height="400"
            ></canvas>
            <img
                ref="frameTemplate"
                src="/photo-frame.png"
                class="absolute top-0 left-0 pointer-events-none"
                style="display: none"
            />
        </div>

        <!-- Controls -->
        <button @click="loadImageFromDB">Load Image from IndexedDB</button>
        <button @click="generatePhotoStrip" :disabled="!imageLoaded">
            Generate Photo Strip
        </button>

        <!-- Download link (shown only when ready) -->
        <a
            v-if="downloadUrl"
            :href="downloadUrl"
            download="photo-strip.png"
            class="block mt-4 p-2 bg-blue-500 text-white rounded"
        >
            Download Photo Strip
        </a>

        <!-- Clear button -->
        <button
            v-if="downloadUrl"
            @click="clearCanvas"
            class="ml-4 p-2 bg-gray-500 text-white rounded"
        >
            Clear
        </button>
    </div>
</template>

<script setup>
    import { ref, onMounted } from "vue";

    // Refs
    const canvas = ref(null);
    const frameTemplate = ref(null);
    const downloadUrl = ref("");
    const imageLoaded = ref(false);
    const ctx = ref(null);

    // Initialize canvas
    onMounted(() => {
        if (canvas.value) {
            ctx.value = canvas.value.getContext("2d");
            // Set initial background if needed
            ctx.value.fillStyle = "#ffffff";
            ctx.value.fillRect(0, 0, canvas.value.width, canvas.value.height);
        }
    });

    // Load image from IndexedDB
    const loadImageFromDB = async () => {
        try {
            // Replace with your actual IndexedDB retrieval logic
            const imageBlob = await retrieveImageFromIndexedDB();

            if (imageBlob) {
                const imageUrl = URL.createObjectURL(imageBlob);
                await placeImageInTemplate(imageUrl);
                imageLoaded.value = true;
            }
        } catch (error) {
            console.error("Error loading image from IndexedDB:", error);
        }
    };

    // Example IndexedDB retrieval function (replace with your actual implementation)
    const retrieveImageFromIndexedDB = async () => {
        return new Promise((resolve) => {
            // This is a mock implementation - replace with your actual IndexedDB code
            const request = indexedDB.open("YourDatabaseName", 1);

            request.onsuccess = (event) => {
                const db = event.target.result;
                const transaction = db.transaction(["images"], "readonly");
                const store = transaction.objectStore("images");
                const getRequest = store.get("your-image-key");

                getRequest.onsuccess = (e) => {
                    resolve(e.target.result?.blobData);
                };

                getRequest.onerror = (e) => {
                    console.error("Error retrieving image:", e);
                    resolve(null);
                };
            };

            request.onerror = (event) => {
                console.error("Error opening IndexedDB:", event);
                resolve(null);
            };
        });
    };

    // Place image in the template
    const placeImageInTemplate = (imageUrl) => {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
                // Clear canvas
                ctx.value.clearRect(
                    0,
                    0,
                    canvas.value.width,
                    canvas.value.height
                );

                // Draw your image (adjust position and size as needed)
                // Example: Draw 4 images in a photo strip layout
                const positions = [
                    { x: 50, y: 50, width: 200, height: 300 },
                    { x: 300, y: 50, width: 200, height: 300 },
                    { x: 50, y: 370, width: 200, height: 300 },
                    { x: 300, y: 370, width: 200, height: 300 },
                ];

                // Draw each image position
                positions.forEach((pos) => {
                    ctx.value.drawImage(
                        img,
                        pos.x,
                        pos.y,
                        pos.width,
                        pos.height
                    );
                });

                // Draw the frame template on top
                if (frameTemplate.value.complete) {
                    ctx.value.drawImage(
                        frameTemplate.value,
                        0,
                        0,
                        canvas.value.width,
                        canvas.value.height
                    );
                } else {
                    frameTemplate.value.onload = () => {
                        ctx.value.drawImage(
                            frameTemplate.value,
                            0,
                            0,
                            canvas.value.width,
                            canvas.value.height
                        );
                    };
                }

                resolve();
            };
            img.src = imageUrl;
        });
    };

    // Generate the photo strip and create download link
    const generatePhotoStrip = () => {
        if (!canvas.value) return;

        // Convert canvas to data URL
        const dataUrl = canvas.value.toDataURL("image/png");

        // Create download link
        downloadUrl.value = dataUrl;
    };

    // Clear the canvas
    const clearCanvas = () => {
        ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height);
        ctx.value.fillStyle = "#ffffff";
        ctx.value.fillRect(0, 0, canvas.value.width, canvas.value.height);
        downloadUrl.value = "";
        imageLoaded.value = false;
    };
</script>

<style scoped>
    /* Add any custom styles here */
</style>

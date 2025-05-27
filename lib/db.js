import Dexie from "dexie";

export const db = new Dexie("photo-booth");

db.version(1).stores({
    images: "id, filename, date_created",
});

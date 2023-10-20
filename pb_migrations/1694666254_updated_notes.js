/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("oelhq6jodmplthu")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "7zv6kxht",
    "name": "image",
    "type": "file",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 5242880,
      "mimeTypes": [],
      "thumbs": [],
      "protected": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("oelhq6jodmplthu")

  // remove
  collection.schema.removeField("7zv6kxht")

  return dao.saveCollection(collection)
})

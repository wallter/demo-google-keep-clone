/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("oelhq6jodmplthu")

  // remove
  collection.schema.removeField("vitmjzl7")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "x9ly1kp9",
    "name": "content",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("oelhq6jodmplthu")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vitmjzl7",
    "name": "text",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // remove
  collection.schema.removeField("x9ly1kp9")

  return dao.saveCollection(collection)
})

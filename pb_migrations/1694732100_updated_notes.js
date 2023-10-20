/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("oelhq6jodmplthu")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "sjxjhaqe",
    "name": "sort",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": true
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("oelhq6jodmplthu")

  // remove
  collection.schema.removeField("sjxjhaqe")

  return dao.saveCollection(collection)
})

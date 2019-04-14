use node_sample

db.createUser({user:'user',
  pwd:'UserPassword$',
  roles: [
      {
        role:'readWrite', 
        db:'node_sample'
      }
    ]
  }
)

db.createCollection("cities",{
  validator: {
    $jsonSchema: {
      bsonType: "object",
      properties: {
        "ZipCode": {
          "type": "string"
        },
        "CityName": {
          "type": "string"
        }
      },
      required: ["ZipCode", "CityName"]
    }
  }
})

db.cities.createIndex({"ZipCode": 1}, {unique: true})

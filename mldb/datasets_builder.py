def build_from_file(mldb, name, input):
    return mldb.put("/v1/datasets/" + name, {
        "type": "text.csv.tabular",
        "params": {
            "dataFileUrl": "file:///mldb_data/" + input
        }
    })

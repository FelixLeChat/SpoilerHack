def classifier_experiment(mldb, name, training_data, model_file, algorithm):
    return mldb.put("/v1/procedures/" + name, {
        "type": "classifier.experiment",
        "params": {
            "trainingData": training_data,
            "modelFileUrlPattern": "file:///mldb_data/" + model_file,
            "experimentName": name,
            "kfold": 2,
            "algorithm": algorithm,
            "mode": "boolean",
            "runOnCreation": "true",
        }
    })


def classifier_training(mldb, name, training_data, model_file, algorithm):
    return mldb.put("/v1/procedures/" + name, {
        "type": "classifier.training",
        "params": {
            "trainingData": training_data,
            "modelFileUrlPattern": "file:///mldb_data/" + model_file,
            "experimentName": name,
            "kfold": 2,
            "algorithm": algorithm,
            "mode": "boolean",
            "runOnCreation": "true",
        }
    })

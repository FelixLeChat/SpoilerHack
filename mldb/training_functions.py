def classifier_experiment(mldb, name, training_dataset, model_file, algorithm):
    return mldb.put("/v1/procedures/" + name, {
        "type": "classifier.experiment",
        "params": {
            "trainingData": "select {* EXCLUDING(label)} as features, label from "+training_dataset,
            "modelFileUrlPattern": "file:///mldb_data/" + model_file,
            "experimentName": name,
            "kfold": 2,
            "algorithm": algorithm,
            "mode": "boolean",
            "runOnCreation": "true",
        }
    })


def classifier_training(mldb, name, training_dataset, model_file, algorithm):
    return mldb.put("/v1/procedures/" + name, {
        "type": "classifier.train",
        "params": {
            "trainingData": "select {* EXCLUDING(label)} as features, label from "+training_dataset,
            "modelFileUrl": "file:///mldb_data/" + model_file,
            "algorithm": algorithm,
            "functionName": name,
            "mode": "boolean",
            "runOnCreation": "true",
        }
    })

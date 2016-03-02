def baggify(mldb, name, label_name, feature_name, input_dataset, output_dataset, words_filters, ngram_range):
    features = "tokenize(" + feature_name + ", {splitchars:' ', quotechar:'\n', ngram_range:[" + ngram_range + "]}) as *}"
    for filter in words_filters:
        features = filter+"({words:{"+features+"}) as *}"
    features = features[:-2]  # Remove the 2 last char as it will be an extra *}
    features += 'features'
    label = "cast(" + label_name + "as boolean) as label"

    return mldb.put("/v1/procedures/" + name, {
        "type": "transform",
        "params": {
            "inputData": "select " + label + ", " + features + " from "+input_dataset,
            "outputDataset": output_dataset,
            "runOnCreation": "true"
        }
    })

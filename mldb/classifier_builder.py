def build_from_file(mldb, name, model):
    mldb.put("/v1/functions/" + name, {
        "type": "classifier",
        "params": {
            "modelFileUrl": "file:///mldb_data/" + model
        }
    })


def build_endpoint(mldb, name, classifier, words_filters, feature_name, ngram_range):
    features = "tokenize(" + feature_name + ", {splitchars:' ', quotechar:'', ngram_range:[" + ngram_range + "]})"
    for words_filter in words_filters:
        features = words_filter + "({words:{" + features + "}})"

    mldb.put("/v1/functions/" + name, {
        "type": "sql.expression",
        "params": {
            "expression": classifier + "(" + features + " as features)",
            "prepared": "true"
        }
    })

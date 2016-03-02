def create_stemmer(mldb, name, language):
    mldb.put("/v1/functions/" + name, {
        "type": "stemmer",
        "params": {
            "language": language
        }
    })


def create_filter_stopwords(mldb, name):
    mldb.put("/v1/functions/" + name, {
        "type": "filter_stopwords"
    })

from pymldb import Connection
import pandas as pd



mldb = Connection("http://agarant.ddns.net:8080")

mldb.put("/v1/functions/spoiler_classifier", {
    "type": "classifier",
    "params": {
        "modelFileUrl": "file:///mldb_data/model_old.cls"
    }
})


mldb.put("/v1/functions/spoiler_classifier_api", {
    "type": "sql.expression",
    "params": {
        "expression": "spoiler_classifier(my_stemmer({words: {filter_stopwords({words: {tokenize(sentence, {splitchars: ' ', quotechar:'', ngram_range:[1,2,3]})}})}}))",
        "prepared": "true"
    }
})

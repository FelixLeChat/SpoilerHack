from pymldb import Connection
import helper_functions as helpers
import training_functions as trainers
import transform_procedures as transformers
import datasets_builder as datasets_builder
import classifier_builder as classifier_builder

MLDB_ADDRESS = "http://localhost:8080"
LABEL_COL = 'spoiler'
FEATURE_COL = 'sentence'

mldb = Connection(MLDB_ADDRESS)

""" Build helper functions that will be used in other procedures """
stemmer = 'english_stemmer'
words_filter = 'stopwords_filter'
helpers.create_stemmer(mldb, stemmer, 'english')
helpers.create_filter_stopwords(mldb, words_filter)
words_filters = []

""" Build the datasets that we will need to train our models """
spoilers_balanced_ds = 'spoilers_balanced'
datasets_builder.build_from_file(mldb, spoilers_balanced_ds, 'series_balanced.csv')

""" Transform our dataset to have it in a trainable format """
spoilers_balanced_ds_ts = 'spoilers_balanced_split'
transformers.baggify(mldb, 'spoiler_bag_of_word', LABEL_COL, FEATURE_COL, spoilers_balanced_ds, spoilers_balanced_ds_ts,
                     words_filters, '1,2')

""" Train models with the transformed datasets """
spoilers_balanced_fn = 'spoilers_classifier'
spoilers_balanced_md = 'model_trained.cls'
md = trainers.classifier_experiment(mldb, spoilers_balanced_fn, spoilers_balanced_ds_ts, spoilers_balanced_md, 'bbdt')
#
# auc = md.json()["status"]["firstRun"]["status"]["folds"][0]["results"]["auc"]
# print "\nArea under ROC curve = %0.4f\n" % auc


""" Create the classifier enpoints """
spoilers_classifier_fn = 'spoilers_classifier_fn'
spoilers_classifier_endpoint = 'spoilers_classifier_api'
classifier_builder.build_from_file(mldb, spoilers_classifier_fn, spoilers_balanced_md)
classifier_builder.build_endpoint(mldb, spoilers_classifier_endpoint, spoilers_classifier_fn, words_filters, FEATURE_COL, '1,2')

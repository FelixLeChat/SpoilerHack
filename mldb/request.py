from pymldb import Connection
import helper_functions as helpers
import training_functions as trainers
import transform_procedures as transformers
import datasets_builder as datasets_builder

MLDB_ADDRESS = "http://agarant.ddns.net:8080"

mldb = Connection(MLDB_ADDRESS)

""" Build helper functions that will be used in other procedures """
stemmer = 'english_stemmer'
words_filter = 'stopwords_filter'
helpers.create_stemmer(mldb, stemmer, 'english')
helpers.create_filter_stopwords(mldb, words_filter)
filters = [stemmer, words_filter]

""" Build the datasets that we will need to train our models """
spoilers_balanced_ds = 'spoilers_balanced'
datasets_builder.build_from_file(mldb, spoilers_balanced_ds, 'series_balanced.csv')

""" Transform our dataset to have it in a trainable format """
spoilers_balanced_ds_ts = 'spoilers_balanced_split'
transformers.baggify(mldb, 'spoiler_bag_of_word', 'spoiler', 'sentence', spoilers_balanced_ds, spoilers_balanced_ds_ts,
                     filters, '1,2')

""" Train models with the transformed datasets """
spoilers_balanced_md = 'spoilers_classifier'
md = trainers.classifier_experiment(mldb, spoilers_balanced_md, spoilers_balanced_ds_ts, 'model_experiment.cls', 'bbdt')

auc = md.json()["status"]["firstRun"]["status"]["folds"][0]["results"]["auc"]
print "\nArea under ROC curve = %0.4f\n" % auc

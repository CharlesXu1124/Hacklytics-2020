import time
from joblib import load
import sys
import numpy as np
import statistics
import csv

data = []
with open('dataforRF.csv', 'r') as csvfile:
    reader = csv.reader(csvfile, skipinitialspace=True)
    for row in reader:
        data.append(row)


data = np.array(data)
x = []
y = []
data = data[1:]

for i in range(len(data)):
    x.append([data[i, 3].astype(float), data[i, 4].astype(float), data[i, 5].astype(float)])
    diff = data[i, 7].astype(float) - data[i, 6].astype(float)
    y.append([data[i, 1].astype(float), diff])

x = np.array(x)
y = np.array(y)


x = x[0:600]
y = y[0:600]
model = load('clf.joblib')
for i in range(len(x)):
    out = model.predict(x)
    print(out)


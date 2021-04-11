import csv
from collections import defaultdict
import numpy as np
from scipy.stats import gmean

filename = "Historical_NoEmpty.csv"
new_filename = "Historical_Aggregation.csv"

# containers for data
row_names = []
row_data = []


def geomean(a: np.ndarray):
    return a.prod() ** (1.0 / len(a))


# read csv file
with open(filename, 'r') as csvfile:
    csvreader = csv.reader(csvfile)

    # extract field names from first row
    row_names = (next(csvreader))

    # extract rows
    for row in csvreader:
        row_data.append(row)
        print("total number of rows: %d" % csvreader.line_num)

    print('Field names are: ' + ', '.join(name for name in row_names))

    print('\nFirst 5 rows are:\n')
    for row in row_data[:5]:
        for col in row:
            print("%10s" % col),
        print('\n')

    with open(new_filename, 'w') as newfile:
        csvwriter = csv.writer(newfile)
        csvwriter.writerow(row_names)
        csvwriter.writerows(row_data)

        # time to add aggregation rows
        agg_rows = []

        # make a dict keyed by year
        agg_data = defaultdict(list)
        # {year: [[cellphone, internetuser, radio, telephone, tv, population, gdp], []... []]}

        for row in row_data:
            agg_data[row[1]].append(row[2:])

        print("")
        # vals in dict are 2D array of rows {1975: [[cell ...], [],..]}

        for key, val in agg_data.items():
            # make a np array of the val for a year
            arr = np.array(val)  # 2000: arr = [[cell, tele, phone], [cell, tele, phone]]
            for r in arr:
                r[r == ''] = 0
            arr = arr.astype(float)
            arr = arr.transpose()  # arr = [[cell, cell, cell], [tele, tele, tele], ...]

            # cell: [[c1, c2, c3],  => [geo(cell),
            # tele:  [t1, t2, t3]]      geo(tele)]

            medians = np.squeeze(np.median(arr, axis=1).transpose())

            agg_rows.append(["MEDIAN", key] + medians.tolist())

        # write the rows to file

        csvwriter.writerows(agg_rows)
        print("last rows of csv: ")
        print(agg_rows[:5])

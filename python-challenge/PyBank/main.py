import os
import csv
output_path = os.path.join('.', 'pybank_final.csv')

data_dict = {"Oct-12": 1154293,
"Nov-12": 885773,
"Dec-12": -448704,
"Jan-13": 563679,
"Feb-13": 555394,
"Mar-13": 631974,
"Apr-13": 957395,
"May-13": 1104047,
"Jun-13": 693464,
"Jul-13": 454932,
"Aug-13": 727272,
"Sep-13": 125016,
"Oct-13": 339251,
"Nov-13": 78523,
"Dec-13": 977084,
"Jan-14": 1158718,
"Feb-14": 332681,
"Mar-14": -341227,
"Apr-14": 173826,
"May-14": 742611,
"Jun-14": 1189806,
"Jul-14": 607363,
"Aug-14": -1172384,
"Sep-14": 587993,
"Oct-14": 295198,
"Nov-14": -300390,
"Dec-14": 468995,
"Jan-15": 698452,
"Feb-15": 967828,
"Mar-15": -454873,
"Apr-15": 375723,
"May-15": 1140526,
"Jun-15": 83836,
"Jul-15": 413189,
"Aug-15": 551363,
"Sep-15": 1195111,
"Oct-15": 657081,
"Nov-15": 66659,
"Dec-15": 803301,
"Jan-16": -953301,
"Feb-16": 883934
}

dates = list(data_dict.keys())[0:]
print(dates)

revenue = list(data_dict.values())[0:]
print(revenue)

a = revenue[1::]
delta_revenue = [x1 - x2 for (x1, x2) in zip(a, revenue)]

print(a)
print(delta_revenue)

delta_dict = dict(zip(dates, delta_revenue)) 
print(delta_dict)

maximum = max(delta_dict, key=delta_dict.get)
print(maximum, delta_dict[maximum])

minimum = min(delta_dict, key=delta_dict.get)
print(minimum, delta_dict[minimum])

print("Financial Analysis")
print("----------------------------")
# The total number of months included in the dataset
print(f"Total Months: {len(data_dict.keys())}")
# The total amount of revenue gained over the entire period
print(f"Total Revenue: {sum(data_dict.values())}")
# The average change in revenue between months over the entire period
print(f"Total Revenue: {sum(delta_revenue)/len(delta_revenue)}")
# The greatest increase in revenue (date and amount) over the entire period
print(f"Total Revenue: {maximum, delta_dict[maximum]}")
# The greatest decrease in revenue (date and amount) over the entire period
print(f"Total Revenue: {minimum, delta_dict[minimum]}")

with open("pybank_text.txt", "w") as text_file:
    print("Financial Analysis", file=text_file)
    print("----------------------------", file=text_file)
    print(f"Total Months: {len(data_dict.keys())}", file=text_file)
    print(f"Total Revenue: {sum(data_dict.values())}", file=text_file)
    print(f"Total Revenue: {sum(delta_revenue)/len(delta_revenue)}", file=text_file)
    print(f"Total Revenue: {maximum, delta_dict[maximum]}", file=text_file)
    print(f"Total Revenue: {minimum, delta_dict[minimum]}", file=text_file)
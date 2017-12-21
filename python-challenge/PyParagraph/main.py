import os

filepath = os.path.join(".", "paragraph_1.txt")

word_count = {}

with open(filepath) as fh:
    for row in fh:
        words = row.split()
        for word in words:
            if word in word_count:
                word_count[word] = word_count[word] + 1
            else:
                word_count[word] = 1

removespaces = row.replace(' ', '')
removecommas = removespaces.replace(',', '')
lettersonly = removecommas.replace('.', '')      

print(word_count)
print("Financial Analysis")
print("----------------------------")
# Approximate word count
print(f"Approximate Word Count: {len(word_count)}")
# Approximate sentence count
print(f"Approximate Sentence Count: {row.count('.')}")
# Approximate letter count (per word)
print(f"Average Letter Count: {len(lettersonly)/len(word_count)}")
# Average sentence length (in words)
print(f"Average Sentence Length: {len(words)/row.count('.')}")
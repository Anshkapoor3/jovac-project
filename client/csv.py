import pandas as pd

# Load the CSV file (path to your file)
file_path = 'Bengaluru_House_Data.csv'
df = pd.read_csv('Bengaluru_House_Data.csv')

# Select the necessary columns and drop missing data
df_filtered = df[['location', 'size', 'total_sqft', 'bath', 'price']].dropna()

# Limit to 600 rows
df_filtered = df_filtered.head(600)

# Rename columns to match the field names used in the JS code
df_filtered.columns = ['location', 'size', 'total_squarefeet', 'no_of_bathrooms', 'price']

# Convert the dataframe to a CSV format string suitable for embedding in JS
csv_string = df_filtered.to_csv(index=False)

# Print out the CSV data
print(csv_string)
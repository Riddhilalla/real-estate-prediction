import pandas as pd
import numpy as np
import joblib
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error, r2_score




data = pd.read_csv('C:/Users/ADMIN/Desktop/Mumbai_property_details.csv')


def extract_locality_and_society(title):
    if pd.isna(title):
        return np.nan, np.nan

    keyword = 'Multistorey Apartment for Rent in '
    if keyword in title:
        # Split the title by the keyword
        parts = title.split(keyword, 1)
        if len(parts) > 1:
            # Check if the title contains "at"
            if ' at ' in parts[1]:
                # If 'at' is present, split by it to get society and locality
                society_locality_part = parts[1].split(' at ', 1)
                society = society_locality_part[0].strip()
                if len(society_locality_part) > 1 and society_locality_part[1].strip():
                    locality = society_locality_part[1].strip().split()[0]  # Taking the first word as locality
                    return locality, society
                else:
                    # Fallback: if the 'at' part exists but there's no locality, use the society for both
                    return society, society
            else:
                # If 'at' is not present, assume the whole part is both locality and society
                locality_society = parts[1].strip()
                return locality_society, locality_society
    return np.nan, np.nan

# Apply the function to create 'Locality' and 'Society' columns
data[['Locality', 'Society']] = data['Title'].apply(lambda title: pd.Series(extract_locality_and_society(title)))

# Strip any extra spaces
data['Locality'] = data['Locality'].str.strip()
data['Society'] = data['Society'].str.strip()

# Replace empty strings with NaN
data['Locality'] = data['Locality'].replace('', np.nan)
data['Society'] = data['Society'].replace('', np.nan)

# Display the updated DataFrame with 'Locality' and 'Society' columns


# Check unique values for locality and society




def convert_price(price_str):
    if pd.isna(price_str):
        return np.nan  # Keep NaN as is
    elif isinstance(price_str, float):
        return int(price_str)  # Convert to integer if it's a float
    else:

        price_str = price_str.replace(',', '')


        if 'Lac' in price_str:
            price_str = price_str.replace('Lac', '').strip()
            return int(float(price_str) * 100000)


        elif 'Cr' in price_str:
            price_str = price_str.replace('Cr', '').strip()
            return int(float(price_str) * 10000000)


        elif not price_str.isdigit():
            return np.nan


        return int(price_str)


data['Price'] = data['Price'].apply(convert_price)




def convert_to_int(value):
    if pd.isna(value):
        return np.nan
    try:

        return int(value)
    except ValueError:

        return np.nan

def convert_to_float(value):
    if pd.isna(value):
        return np.nan
    try:

        first_value = value.split()[0]
        return float(first_value)
    except (ValueError, IndexError):
        return np.nan


data['Area'] = data['Area'].apply(convert_to_float)
data['Bathrooms'] = data['Bathrooms'].apply(convert_to_int)
data['Floor'] = data['Floor'].apply(convert_to_int)
data['BHK'] = data['BHK'].apply(convert_to_int)


print("checkpoint 1")

dfr = data.drop(columns=['Property Image', 'Description','Is Luxury'])


missing_val = dfr.isnull().sum()


data_percent = (missing_val/len(dfr))*100


columns_to_drop = data_percent[data_percent > 50].index
data_cleaned = dfr.drop(columns=columns_to_drop)




data_more_cleaned = data_cleaned.dropna()

def remove_outliers_iqr(df, column):
    Q1 =  data_more_cleaned[column].quantile(0.25)
    Q3 =  data_more_cleaned[column].quantile(0.75)
    IQR = Q3 - Q1
    lower_bound = Q1 - 1.5 * IQR
    upper_bound = Q3 + 1.5 * IQR
    return  data_more_cleaned[( data_more_cleaned[column] >= lower_bound) & ( data_more_cleaned[column] <= upper_bound)]


for column in ['Price', 'Area', 'Bathrooms', 'Floor', 'BHK']:
    if column in data_more_cleaned.columns:
        data_more_cleaned = remove_outliers_iqr(data_more_cleaned, column)

# Group the data by BHK and calculate the average price
bhk_avg_price = data_more_cleaned.groupby('BHK')['Price'].mean().reset_index()

# Sort by BHK to make the bars ordered
bhk_avg_price = bhk_avg_price.sort_values('BHK')



# Assume 'price' is the column in the dataset for current rental prices
current_year = 2024
growth_rate = 0.05  # 5% growth rate
time_periods = 15  # For every 5 years over 30 years


# Function to calculate the price in the past based on reverse compound growth
def historical_price(current_price, growth_rate, years):
    # Formula: P_past = P_present / (1 + growth_rate)^years
    return current_price / ((1 + growth_rate) ** years)


# Ensure 'Price' column is in the correct format
data_more_cleaned['Price'] = data_more_cleaned['Price'].astype(float)

# Create synthetic historical data for the last 30 years (at 2-year intervals)
for i in range(1, time_periods + 1):
    past_year = current_year - i * 2

    # Apply historical price calculation conditionally
    data_more_cleaned[f'price_{past_year}'] = data_more_cleaned.apply(
        lambda row: historical_price(row['Price'], growth_rate, i * 2)
        if past_year > row['Year of Construction'] else None,
        axis=1
    )

# Save the new dataframe with historical prices to a new CSV file
data_more_cleaned.to_csv('rental_finalist4.csv', index=False)

print("checkpoint 2")

#add amenities
# Define a function to count the number of desired amenities
def count_amenities(amenities_str):
    if pd.isna(amenities_str):
        return 0

    # Define the attributes you're interested in
    attributes = ['Garden/Park', 'Pool', 'Main Road']

    # Count how many of the attributes are in the amenities string
    count = sum(1 for attribute in attributes if attribute in amenities_str)

    return count


# Apply the function to the 'Amenities' column and create a new 'Amenities_Count' column
data_more_cleaned['Amenities_Count'] = data_more_cleaned['Amenities'].apply(count_amenities)

print("checkpoint 3")

# Now you can include 'Amenities_Count' as a feature in your Random Forest model

# Define a mapping for the 'Furnished' column
furnished_mapping = {
    'Furnished': 3,
    'Semi-Furnished': 2,
    'Unfurnished': 1
}

# Apply the mapping to the 'Furnished' column
data_more_cleaned['Furnished_Rank'] = data_more_cleaned['Furnished'].map(furnished_mapping)

# Display the updated DataFrame to verify the changes


data_more_cleaned['Age'] = 2024 - data_more_cleaned['Year of Construction']
data_more_cleaned['Area_per_BHK'] = data_more_cleaned['Area'] / data_more_cleaned['BHK']

facing_mapping = {
    'East': 6,
    'North - East': 5,
    'North': 4,
    'West': 3,
    'South -West': 2,
    'South': 1
}

# Apply the mapping to the 'Furnished' column
data_more_cleaned['Facing_Rank'] = data_more_cleaned['Facing'].map(facing_mapping)




# Remove any rows where Price is NaN (if not already handled)
data_more_cleaned = data_more_cleaned.dropna(subset=['Price'])

# Define features including the new 'Amenities_Count' column
X = data_more_cleaned[['Area', 'Bathrooms', 'Floor', 'BHK', 'Age', 'Amenities_Count', 'Furnished_Rank', 'Facing_Rank']]  # Add the new feature
y = data_more_cleaned['Price']  # Target variable

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Initialize the Random Forest Regressor
model = RandomForestRegressor(n_estimators=100, random_state=42)

# Fit the model
model.fit(X_train, y_train)

# Get feature importances
importances = model.feature_importances_

# Create a DataFrame to hold feature names and their importances
feature_importance_df = pd.DataFrame({'Feature': X.columns, 'Importance': importances})

# Sort the DataFrame by importance
feature_importance_df = feature_importance_df.sort_values(by='Importance', ascending=False)



# Get the top 5 features
top_features = feature_importance_df.head(8)['Feature'].values

# Create new training and test sets with only the top 5 features
X_train_top = X_train[top_features]
X_test_top = X_test[top_features]

# Fit the model again with top features
model.fit(X_train_top, y_train)

# Predict on the test set using top features
y_pred_top = model.predict(X_test_top)

# Evaluate the model
mse_top = mean_squared_error(y_test, y_pred_top)
r2_top = r2_score(y_test, y_pred_top)


print("checkpoint 4")


# After fitting your model, you can store the feature names
model.feature_names_in_ = ['Area', 'Bathrooms', 'Floor', 'BHK', 'Age', 'Amenities_Count', 'Furnished_Rank', 'Facing_Rank']

# Function to predict the current price using the trained model
def predict_current_price(area, bathrooms, floor, bhk, age, amenities_count, furnished_rank, facing_rank):
    # Handle NaN values
    facing_rank = facing_rank if pd.notnull(facing_rank) else 0  # Replace with a default value

    input_data = pd.DataFrame(
        [[area, bathrooms, floor, bhk, age, amenities_count, furnished_rank, facing_rank]],
        columns=['Area', 'Bathrooms', 'Floor', 'BHK', 'Age', 'Amenities_Count', 'Furnished_Rank', 'Facing_Rank']
    )





    predicted_price = model.predict(input_data)
    return predicted_price[0]
# Calculate the compound annual growth rate (CAGR) from historical prices

def calculate_aagr(prices):
    n = len(prices) - 1  # Number of intervals
    if n == 0:
        raise ValueError("Not enough data to calculate AAGR.")

    total_growth = sum([(prices[i + 1] - prices[i]) / prices[i] for i in range(n)])
    return total_growth / n  # Return the average growth rate


# Predict future prices based on the current price and CAGR
def predict_future_prices(current_price, cagr, years_into_future=2, intervals=5):
    future_prices = {}
    if np.isnan(current_price) or np.isnan(cagr):
        raise ValueError("Cannot predict future prices with invalid current price or CAGR.")

    for i in range(1, intervals + 1):
        future_year = years_into_future * i
        future_price = current_price * ((1 + cagr) ** future_year)
        future_prices[future_year] = future_price
    return future_prices


# Example usage:
# Extracting historical prices from the dataset up to the year of construction
def get_historical_prices(data_row, year_of_construction):
    historical_prices = {}
    for col in data_row.index:
        if 'price_' in col:
            year = int(col.split('_')[1])
            if year > year_of_construction:
                historical_prices[col] = data_row[col]
    return historical_prices


for index, row in data_more_cleaned.iterrows():
    year_of_construction = row['Year of Construction']
    historical_prices = get_historical_prices(row, year_of_construction)

    try:
        current_price = predict_current_price(
            area=row['Area'],
            bathrooms=row['Bathrooms'],
            floor=row['Floor'],
            bhk=row['BHK'],
            age=row['Age'],
            amenities_count=row['Amenities_Count'],
            furnished_rank=row['Furnished_Rank'],
            facing_rank=row['Facing_Rank']
        )

  
        valid_prices = [price for price in historical_prices.values() if pd.notna(price)]
        valid_prices.reverse()
        # Debug output
   


        if len(valid_prices) < 2:
         
            continue

        # Calculate CAGR with valid_prices
        aagr = calculate_aagr(valid_prices)
    

        # Predict future prices
        future_prices = predict_future_prices(current_price, aagr)

    

    except ValueError as e:
        print(f"Error for Property {index}: {e}")


joblib.dump(model, 'random_forest_model.joblib')

print("checkpoint 5")
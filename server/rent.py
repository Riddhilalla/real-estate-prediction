from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS

# Your existing imports
import joblib
import numpy as np
import pandas as pd

# Load the model
model = joblib.load('random_forest_model.joblib')


app = Flask(__name__)
CORS(app)  



@app.route('/investment-calculator', methods=['POST']) 
def investment_calculator():
    print("Received POST request")  
    data = request.json
    print(f"Data: {data}")  
   
    try:
        area = float(data.get('Area', 0))
        bathrooms = int(data.get('Bathrooms', 0))
        floor = int(data.get('Floor', 0))
        bhk = int(data.get('BHK', 0))
        age = int(data.get('Age', 0))
        amenities_count = int(data.get('Amenities', 0))
        furnished_ranking = int(data.get('Furnished', 0))
        facing_ranking = int(data.get('Facing', 0))
       
        
        features = pd.DataFrame([[area, bathrooms, floor, bhk, age, amenities_count, furnished_ranking, facing_ranking]],
                                columns=['Area', 'Bathrooms', 'Floor', 'BHK', 'Age', 'Amenities_Count', 'Furnished_Rank', 'Facing_Rank'])

        # Make a prediction using the loaded model
        prediction = model.predict(features)[0]

        # Return the prediction as a JSON response
        return jsonify({'predicted_price': prediction})

    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(port=9000, debug=True)

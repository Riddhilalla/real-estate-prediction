import numpy as np
import pandas as pd
from sklearn.preprocessing import LabelEncoder
from flask import Flask, render_template, request
import pickle

app = Flask(__name__)

# Load the data and model
data = pd.read_csv('train.csv')
model = pickle.load(open('model.pkl', 'rb'))

# Create and fit the LabelEncoder
le = LabelEncoder()
le.fit(data['Location'])

@app.route('/')
def index():
    locations = sorted(data['Location'].unique())
    return render_template('home.html', locations=locations)

@app.route('/predict', methods=['POST'])
def predict():
    # Get form data
    location = request.form.get('location')
    area = float(request.form.get('area'))
    bhk = int(request.form.get('bhk'))
    new = 1 if request.form.get('toggle') == 'on' else 0
    gym = 1 if request.form.get('gym') == 'on' else 0
    indd = 1 if request.form.get('ind') == 'on' else 0
    car = 1 if request.form.get('car') == 'on' else 0
    jogg = 1 if request.form.get('jog') == 'on' else 0

    # Encode the location
    location_encoded = le.transform([location])[0]

    # Create input DataFrame
    input_data = pd.DataFrame([[area, location_encoded, bhk, new, gym, car, indd, jogg]], 
                              columns=['Area', 'Location', 'No. of Bedrooms', 'New/Resale', 
                                       'Gymnasium', 'Car Parking', 'Indoor Games', 'Jogging Track'])

    # Make prediction
    pred_log = model.predict(input_data)[0]
    
    # Reverse log transformation if it was applied during training
    pred = np.exp(pred_log)

    return str(np.round(pred, 2))

if __name__ == "__main__":
    app.run(debug=True, port=5001)
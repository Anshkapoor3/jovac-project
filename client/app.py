from flask import Flask, request, jsonify

app = Flask(__name__)

# Simulated prediction function
def predict(features):
    # You can change this to any logic you want
    feature1, feature2, feature3 = features
    prediction = feature1 * 2 + feature2 * 0.5 + feature3 * 3
    return prediction

@app.route('/predict', methods=['POST'])
def get_prediction():
    # Get the input data from the request
    data = request.json
    feature1 = data.get('feature1', 0)
    feature2 = data.get('feature2', 0)
    feature3 = data.get('feature3', 0)
    
    # Perform a "prediction"
    prediction = predict([feature1, feature2, feature3])

    # Return the prediction as a JSON response
    return jsonify({'prediction': prediction})

if __name__ == '__main__':
    app.run(debug=True)

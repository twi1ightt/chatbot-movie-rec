import pandas as pd
import os
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__) #initialise a flask application 
CORS(app) #enable Cross-Origin Resource Sharing to allow requests from different browsers

def load_films(pathname):  #loading movie dataset using pathname
    try:
        movies_data = pd.read_csv(pathname) 
        return movies_data[['title', 'description', 'genres', 'type']] #These are the only columns i want from the movie dataset/
    except Exception as e:
        print(f"Error loading dataset: {e}") # throw error if dataset cannot be found 
        return None


def preprocess_data(movies_data):
    if movies_data is None:
        return None
    movies_data['text_data'] = movies_data['description'] + ' ' + movies_data['genres'] # These are the only columns that are going to have their features extraced for cosine similarity, so they are concatinated into one column 
    movies_data.dropna(subset=['text_data'], inplace=True)  # remove rows with any missing values
    return movies_data

def recommend_movies(user_input, tfidf_vectorizer, tfidf_matrix, movies_data):
    try:
        user_tfidf = tfidf_vectorizer.transform([user_input]) # convert input into TFIDF vector, TFIDF considers the frequency of words in data.
        cosine_similarities = linear_kernel(user_tfidf, tfidf_matrix).flatten() #calculate the cosine silimarity between userTFIDF matrix and and user TFIDF using linear kernel
        similar_indices = cosine_similarities.argsort()[:-6:-1] #sorting from most simialr to least
        recommended_movies = movies_data.iloc[similar_indices][[ 'title', 'genres', 'description', 'type']] #extract similar movie data
        return recommended_movies.to_dict(orient='records') #put that data in  a dict.
    except Exception as e:
        print(f"Error recommending movies: {e}")
        return None


@app.route('/', methods=['GET'])
def hello_world():
        return jsonify({'message': "Im Alive!"}) #testing if my api works

@app.route('/recommend-movies', methods=['POST'])
def recommend_movies_route(): #handling POST requests to the api 
    user_input = request.json.get('userInput') #convert user input to json
    if not user_input:
        return jsonify({'error': 'User input is required'}), 400

    cwd = os.getcwd()
    pathname = os.path.join(cwd, 'Backend/src/titles.csv') #assign the dataset path to pathname to be used by the program
    movies_data = load_films(pathname)
    if movies_data is None:
        return jsonify({'error': 'Failed to load movies data'}), 500

    movies_data = preprocess_data(movies_data) #process the data using the function from above
    if movies_data is None:
        return jsonify({'error': 'Failed to preprocess movies data'}), 500

    tfidf_vectorizer = TfidfVectorizer(stop_words='english') #initialise a TfidfVectorizer
    tfidf_matrix = tfidf_vectorizer.fit_transform(movies_data['text_data'])# transform text_data toa tfidf matrix

    recommended_movies = recommend_movies(user_input, tfidf_vectorizer, tfidf_matrix, movies_data) 
    if recommended_movies is not None:
        return jsonify(recommended_movies)
    else:
        return jsonify({'message': 'No recommendations available!!!'}), 404

if __name__ == "__main__":
    app.run(debug=True)
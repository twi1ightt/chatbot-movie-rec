import pandas as pd
import os
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
def load_movies_data(pathname):  #loading movie dataset 
    try:
        movies_data = pd.read_csv(pathname)
        return movies_data[['Series_Title', 'Overview', 'Genre']]
    except Exception as e:
        print(f"Error loading data: {e}")
        return None


def preprocess_data(movies_data):
    if movies_data is None:
        return None
    movies_data['text_data'] = movies_data['Overview'] + ' ' + movies_data['Genre']
    movies_data.dropna(subset=['text_data'], inplace=True)
    return movies_data

def recommend_movies(user_input, tfidf_vectorizer, tfidf_matrix, movies_data):
    try:
        user_tfidf = tfidf_vectorizer.transform([user_input])
        cosine_similarities = linear_kernel(user_tfidf, tfidf_matrix).flatten()
        similar_indices = cosine_similarities.argsort()[:-6:-1]
        recommended_movies = movies_data.iloc[similar_indices][[ 'Series_Title',  'Genre', 'Overview']]
        return recommended_movies.to_dict(orient='records')
    except Exception as e:
        print(f"Error recommending movies: {e}")
        return None


@app.route('/', methods=['GET'])
def hello_world():
        return jsonify({'message': "Im Alive!"})

@app.route('/recommend-movies', methods=['POST'])
def recommend_movies_route():
    user_input = request.json.get('userInput')
    if not user_input:
        return jsonify({'error': 'User input is required'}), 400

    cwd = os.getcwd()
    pathname = os.path.join(cwd, 'imdb_top_1000.csv')
    movies_data = load_movies_data(pathname)
    if movies_data is None:
        return jsonify({'error': 'Failed to load movies data'}), 500

    movies_data = preprocess_data(movies_data)
    if movies_data is None:
        return jsonify({'error': 'Failed to preprocess movies data'}), 500

    tfidf_vectorizer = TfidfVectorizer(stop_words='english')
    tfidf_matrix = tfidf_vectorizer.fit_transform(movies_data['text_data'])

    recommended_movies = recommend_movies(user_input, tfidf_vectorizer, tfidf_matrix, movies_data)
    if recommended_movies is not None:
        return jsonify(recommended_movies)
    else:
        return jsonify({'message': 'No recommendations available'}), 404

if __name__ == "__main__":
    app.run(debug=True)
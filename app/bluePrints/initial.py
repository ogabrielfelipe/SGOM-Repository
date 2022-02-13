from app import app
from flask import Flask, render_template


@app.route('/', methods=['GET'])
def root():
    return render_template('index.html')

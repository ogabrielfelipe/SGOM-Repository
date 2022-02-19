from app import app
from flask import Flask, render_template
from flask_login import login_required


@app.route('/Home', methods=['GET'])
#@login_required
def root():
    return render_template('.html')

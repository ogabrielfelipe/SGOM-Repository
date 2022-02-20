from app import app
from flask import Flask, jsonify, render_template
from flask_login import login_required
from ..controller.servicosController import cad_servicos


@app.route('/Home', methods=['GET'])
#@login_required
def root():
    return render_template('home.html')


@app.route('/Servico', methods=['POST'])
def servicos():
    result = cad_servicos()
    return jsonify({'msg': result})
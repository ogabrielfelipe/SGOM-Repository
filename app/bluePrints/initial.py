from app import app
from flask import Flask, jsonify, render_template
from flask_login import login_required
from ..controller.servicosController import cad_servicos


@app.route('/Home', methods=['GET'])
#@login_required
def root():
    return render_template('home.html')


@app.route('/OrdemDeServico', methods=['GET'])
def root_ordemDeServico():
    return render_template('ordemDeServico.html')


@app.route('/Mecanico', methods=['GET'])
def root_mecanico():
    return render_template('mecanico.html')

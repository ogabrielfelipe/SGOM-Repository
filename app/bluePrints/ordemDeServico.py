from flask import Blueprint, render_template


ordem = Blueprint('ordem', __name__)


@ordem.route('/OrdemDeServico'. methods=['GET'])
def root_ordemDeServico():
    return render_template('.html')
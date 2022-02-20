from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow


db = SQLAlchemy()
ma = Marshmallow()


class ItemOrcamento(db.Model):
    __tablename__ = 'itemOrcamento'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nome = db.Column(db.String(150))
    valor = db.Column(db.Float)
    ordemDeServico = db.relationship('OrdemDeServico', secondary='servicos', back_populates="itemOrcamento")

    def __init__(self, nome, valor):
        self.nome = nome
        self.valor = valor

class ItemOrcamentoSchema(ma.Schema):
    class Meta:
        fields = ('id', 'nome', 'valor')


itemOrcamento_schema = ItemOrcamentoSchema()
itemOrcamentos_schema = ItemOrcamentoSchema(many=True)

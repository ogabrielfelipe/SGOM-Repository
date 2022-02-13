from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow


db = SQLAlchemy()
ma = Marshmallow()


class ItemOrcamento(db.Model):
    __tablename__ = 'itemOrcamento'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nome = db.Column(db.String(150))
    quantidade = db.Column(db.Integer)
    valor = db.Column(db.Float)

    def __init__(self, nome, quantidade, valor):
        self.nome = nome
        self.quantidade = quantidade
        self.valor = valor

class ItemOrcamentoSchema(ma.Schema):
    class Meta:
        fields = ('nome', 'quantidade', 'valor')

itemOrcamento_schema = ItemOrcamentoSchema()
itemOrcamentos_schema = ItemOrcamentoSchema(many=True)

from enum import unique
from .ItemOrcamento import db, ma


class Carro(db.Model):
    __tablename__ = 'carro'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    placa = db.Column(db.String(7), unique=True)
    telefone = db.Column(db.String(14))

    def __init__(self, placa, telefone):
        self.placa = placa
        self.telefone = telefone


class CarroSchema(ma.Schema):
    class Meta:
        fields = ('id', 'placa', 'telefone')


carro_schema = CarroSchema()
carros_schema = CarroSchema(many=True)

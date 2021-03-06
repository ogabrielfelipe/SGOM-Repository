
from .ItemOrcamento import db, ma
from sqlalchemy import Enum
from .Status import Status
from datetime import date

class RegistroDaOS(db.Model):
    __tablename__='registroDaOS'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    data = db.Column(db.DATE, default=date.today())
    statusAnterior = db.Column(Enum(Status))
    novoStatus = db.Column(Enum(Status))
    valorTotal = db.Column(db.Float)
    problema = db.Column(db.String(1024))
    mecanico = db.Column(db.Integer, db.ForeignKey('funcionario.id'))
    ordemServico = db.Column(db.ForeignKey('ordemDeServico.id'))



    def __init__(self, data, statusA, novoS, valorTotal, problema, mecanico, ordemDeServico):
        self.data = data
        self.statusAnterior = statusA
        self.novoStatus = novoS
        self.valorTotal = valorTotal
        self.problema = problema
        self.mecanico = mecanico
        self.ordemServico = ordemDeServico


class RegistroDaOSSchema(ma.Schema):
    class Meta:
        fields = ('data', 'statusAnterior', 'novoStatus', 'valorTotal', 'problema', 'mecanico', 'ordemDeServicos')


registroDaOS_schema = RegistroDaOSSchema()
registroDaOSs_schema = RegistroDaOSSchema(many=True)

from .ItemOrcamento import db, ma
from sqlalchemy import Enum
from .Status import Status


class RegistroDaOS(db.Model):
    __tablename__='registroDaOS'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    data = db.Column(db.Date, nullable=False)
    statusAnterior = db.Column(Enum(Status))
    novoStatus = db.Column(Enum(Status))
    valorTotal = db.Column(db.Float)
    problema = db.Column(db.String(1024))


    mecanico_id = db.Column(db.Integer, db.ForeignKey('funcionario.id'))


    ordemDeServicos = db.relationship('OrdemDeServico', back_populates='registroDaOS')



    def __init__(self, data, statusA, novoS, valorTotal, problema, mecanico, ordemDeServico):
        self.data = data
        self.statusAnterior = statusA
        self.novoStatus = novoS
        self.valorTotal = valorTotal
        self.problema = problema
        self.mecanico = mecanico
        self.ordemDeServico_id = ordemDeServico

    def __int__(self):
        pass


class RegistroDaOSSchema(ma.Schema):
    class Meta:
        fields = ('data', 'statusAnterior', 'novoStatus', 'valorTotal', 'problema', 'mecanico', 'ordemDeServicos')


registroDaOS_schema = RegistroDaOSSchema()
registroDaOSs_schema = RegistroDaOSSchema(many=True)

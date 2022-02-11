from .OrdemDeServico import db, ma
from .TipoFuncionario import TipoFuncionario
from sqlalchemy import Enum


class Funcionario(db.Model):
    __tablename__='funcionario'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    status = db.Column(db.Boolean, default=True, nullable=False)
    dataDeAdmissao = db.Column(db.Date, nullable=False)
    nome = db.Column(db.String(150), nullable=False)
    cpf = db.Column(db.String(14), nullable=False)
    telefone = db.Column(db.String(14))
    usuario = db.Column(db.String(20), nullable=False, unique=True)
    senha = db.Column(db.String)
    tipoFuncionario = db.Column(Enum(TipoFuncionario))

    def __init__(self, status, dataA, nome, cpf, tel, user, senha, tFunc):
        self.status = status
        self.dataDeAdmissao = dataA
        self.nome = nome
        self.cpf = cpf
        self.telefone = tel
        self.usuario = user
        self.senha = senha
        self.tipoFuncionario = tFunc


class FuncionarioSchema(ma.Schema):
    class Meta:
        fields=('status','nome','dataDeAdmissao','cpf','telefone','usuario','senha','tipoFuncionario')


funcionario_schema = FuncionarioSchema()
funcionarios_schema = FuncionarioSchema(many=True)
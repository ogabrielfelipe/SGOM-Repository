from email.policy import default
from app import db, ma
from sqlalchemy.ext.mutable import MutableList
from .ItemOrcamento import ItemOrcamento


class OrdemDeServico(db.Schema):
    __tablename__ = 'ordemDeServico'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nomeRequerente = db.Column(db.String(150), nullable=False)
    cpfDoRequerente = db.Column(db.String(14), nullable=False)
    telefoneRequerente = db.Column(db.String(14), nullable=False)
    problema = db.Column(db.String(1024), nullable=False)
    requisicaoOrcamento = db.Column(db.Boolean, nullable=False)
    estadoAtualDoVeiculo = db.Column(db.String(4096), nullable=False)
    orcamento = db.Column(MutableList.as_mutable(db.ARRAY(ItemOrcamento.id)), default=[])
    custoMecanico = db.Column(db.FLoat)
    valorTodal = db.Column(db.Float)
    respostaCliente = db.Column(db.Boolean)
    carro = db.Column(db.Integer, db.ForeignKey('carro.id'))
    mecanico = db.Column(db.Integer, db.ForeignKey('funcionario.id'))
    registroDaOS = db.relationship('RegistroDaOS', back_populates='ordemDeServico')

    def __init__(self, nomeR, cpfR, telR, problema, reqOr, estV, orc, cusM, valT, respC, regisDO):
        self.nomeRequerente = nomeR
        self.cpfDoRequerente = cpfR
        self.telefoneRequerente = telR
        self.problema = problema
        self.requisicaoOrcamento = reqOr
        self.estadoAtualDoVeiculo = estV
        self.orcamento = orc
        self.custoMecanico = cusM
        self.valorTodal = valT
        self.respostaCliente = respC
        self.registroDaOS = regisDO

    def abrirOrdemDeServico(self, carro, cpfR, telR, problema, reqOr, estadoA):
        self.carro = carro
        self.cpfDoRequerente = cpfR
        self.telefoneRequerente = telR
        self.problema = problema
        self.requisicaoOrcamento = reqOr
        self.estadoAtualDoVeiculo = estadoA
    
    def aceitarServico(self, mecanico):
        self.mecanico = mecanico

    def registraOrcamento(self, problema, custoMec):
        self.problema = problema
        self.custoMecanico = custoMec

    def avaliarOrdemServico(self, respC):
        self.respostaCliente = respC

    def atenderServico():
        pass

    def concluirServico():
        pass

    def finalizarServico():
        pass


class OrdemDeServicoSchema(ma.Schema):
    class Meta:
        fields = ('nomeRequerente', 'cpfDoRequerente', 'telefoneRequerente', 'problema', 'requisicaoOrcamento',
                'estadoAtualDoVeiculo', 'orcamento', 'custoMecanico', 'valorTodal', 'respostaCliente', 'registroDaOS')


OrdemDeServico_schema = OrdemDeServicoSchema()
OrdemDeServicos_schema = OrdemDeServicoSchema(many=True)
from .ItemOrcamento import ItemOrcamento, db, ma
from sqlalchemy import Enum
from .Status import Status


class OrdemDeServico(db.Model):
    __tablename__ = 'ordemDeServico'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nomeRequerente = db.Column(db.String(150), nullable=False)
    cpfDoRequerente = db.Column(db.String(14), nullable=False)
    telefoneRequerente = db.Column(db.String(14), nullable=False)
    problema = db.Column(db.String(1024), nullable=False)
    requisicaoOrcamento = db.Column(db.Boolean, nullable=False)
    estadoAtualDoVeiculo = db.Column(db.String(4096), nullable=False)
    custoMecanico = db.Column(db.Float)
    valorTodal = db.Column(db.Float)
    respostaCliente = db.Column(db.Boolean)
    carro = db.Column(db.Integer, db.ForeignKey('carro.id'))
    mecanico = db.Column(db.Integer, db.ForeignKey('funcionario.id'))
    itemOrcamento = db.relationship('ItemOrcamento', secondary='servicos', back_populates='ordemDeServico')
    status = db.Column(Enum(Status))

    def __init__(self, nomeR, cpfR, telR, problema, reqOr, estV, orc, cusM, valT, respC, regisDO, carro, status):
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
        self.carro = carro
        self.status = status
        
    def __init__(self, nomeR, cpfR, telR, problema, reqOr, estV, carro, status):
        self.nomeRequerente = nomeR
        self.cpfDoRequerente = cpfR
        self.telefoneRequerente = telR
        self.problema = problema
        self.requisicaoOrcamento = reqOr
        self.estadoAtualDoVeiculo = estV
        self.carro = carro
        self.status = status

    @classmethod
    def abrirOrdemDeServico(cls, carro, nomeR, cpfR, telR, problema, reqOr, estadoA, status):
        return cls(
            nomeR = nomeR, 
            carro = carro, 
            cpfR = cpfR,
            telR = telR,
            problema = problema,
            reqOr = reqOr,
            estV = estadoA,
            status = status
        )

    @staticmethod
    def aceitarServico(mecanico, status):
        self.mecanico = mecanico
        self.status = status


    def registraOrcamento(self, problema, custoMec, itens):
        self.problema = problema
        self.custoMecanico = custoMec
        self.itemOrcamento = itens

    def avaliarOrdemServico(self, respC):
        self.respostaCliente = respC

    def atenderServico(self):
        pass

    def concluirServico(self):
        pass

    def finalizarServico(self):
        pass


class OrdemDeServicoSchema(ma.Schema):
    class Meta:
        fields = ('id', 'nomeRequerente', 'cpfDoRequerente', 'telefoneRequerente', 'problema', 'requisicaoOrcamento',
                'estadoAtualDoVeiculo', 'orcamento', 'custoMecanico', 'valorTodal', 'respostaCliente', 'registroDaOS')


ordemDeServico_schema = OrdemDeServicoSchema()
ordemDeServicos_schema = OrdemDeServicoSchema(many=True)

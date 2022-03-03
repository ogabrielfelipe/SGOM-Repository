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
    estadoAtualDoVeiculo = db.Column(db.String(4096), nullable=True)
    custoMecanico = db.Column(db.Float)
    valorTodal = db.Column(db.Float)
    respostaCliente = db.Column(db.Boolean)
    carro = db.Column(db.Integer, db.ForeignKey('carro.id'))
    mecanico = db.Column(db.Integer, db.ForeignKey('funcionario.id'))
    itemOrcamento = db.relationship('ItemOrcamento', secondary='servicos', back_populates='ordemDeServico')
    status = db.Column(Enum(Status))

    
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

    
    def aceitarServico(self, mecanico, stas):
        self.mecanico=mecanico
        self.status=stas
        

    
    def registraOrcamento(self, problema, custoMec, valTodal, status):
        self.problema = problema
        self.custoMecanico = custoMec
        self.valorTodal = valTodal
        self.status = status

    
    def avaliarOrdemServico(self, respC, status):
        self.respostaCliente = respC
        self.status = status

    
    def atenderServico(self, mecanico, status):
        self.mecanico = mecanico
        self.status = status

    
    def concluirServico(self, status):
        self.status = status

    
    def finalizarServico(self, status):
        self.status = status


class OrdemDeServicoSchema(ma.Schema):
    class Meta:
        fields = ('id', 'nomeRequerente', 'cpfDoRequerente', 'telefoneRequerente', 'problema', 'requisicaoOrcamento',
                'estadoAtualDoVeiculo', 'orcamento', 'custoMecanico', 'valorTodal', 'respostaCliente', 'registroDaOS', 'status',
                'carro', 'mecanico')


ordemDeServico_schema = OrdemDeServicoSchema()
ordemDeServicos_schema = OrdemDeServicoSchema(many=True)

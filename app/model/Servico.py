from .ItemOrcamento import db, ma


class Servico(db.Model):
    __tablename__ = 'servico'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    ordemDeServico = db.Column(db.Integer, db.ForeignKey('itens.id'))
    itemOrcamento = db.Column(db.Integer, db.ForeignKey('ordens.id'))
    quantidade = db.Column(db.Integer)

    def __init__(self, ordem, item, quant):
        self.ordemDeServico = ordem
        self.itemOrcamento = item
        self.quantidade = quant


class ServicoScheme(ma.Schema):
    class Meta:
        fields = 'id', 'ordemDeServico', 'itemOrcamento', 'quantidade'


servico_schema = ServicoScheme()
servicos_schema = ServicoScheme(many=True)

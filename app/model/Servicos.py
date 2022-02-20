from app.model.OrdemDeServico import OrdemDeServico
from .ItemOrcamento import ItemOrcamento, db, ma


class Servicos(db.Model):
    __tablename__ = 'servicos'
    ordemDeServico = db.Column(db.Integer, db.ForeignKey("ordemDeServico.id"), nullable=False, primary_key=True)
    itemOrcamento = db.Column(db.ForeignKey("itemOrcamento.id"), nullable=False)
    quantidade = db.Column(db.Float)

    def __init__(self, ordem, item, quant):
        self.ordemDeServico = ordem
        self.itemOrcamento = item
        self.quantidade = quant


class ServicosScheme(ma.Schema):
    class Meta:
        fields = ('id', 'ordemDeServico', 'itemOrcamento', 'quantidade')


servico_schema = ServicosScheme()
servicos_schema = ServicosScheme(many=True)

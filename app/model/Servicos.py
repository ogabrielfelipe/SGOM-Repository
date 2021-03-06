from app.model.OrdemDeServico import OrdemDeServico
from .ItemOrcamento import ItemOrcamento, db, ma


class Servicos(db.Model):
    __tablename__ = 'servicos'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    ordemDeServico = db.Column(db.Integer, db.ForeignKey("ordemDeServico.id"), nullable=False)
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

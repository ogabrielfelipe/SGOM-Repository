import enum
import pydantic
import typing as t


class Status(int, enum.Enum):
    EMABERTO = 0
    ACEITA = 1
    AGUARDANDOAPROVACAO = 2
    APROVADA = 3
    EMATENDIMENTO = 4
    AGUARDANDOPAGAMENTO = 5
    FINALIZADA = 6


class Model(pydantic.BaseModel):
    m: t.Dict[Status, int]

    class Config:
        use_enum_values = True

Model(m={
    Status.EMABERTO: 0,
    Status.ACEITA: 1,
    Status.AGUARDANDOAPROVACAO: 2,
    Status.APROVADA: 3,
    Status.EMATENDIMENTO: 4,
    Status.AGUARDANDOPAGAMENTO:5,
    Status.FINALIZADA: 6
}).json()    
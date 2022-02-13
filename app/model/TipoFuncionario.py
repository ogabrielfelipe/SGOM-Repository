import enum
import pydantic
import typing as t

class TipoFuncionario(int, enum.Enum):
    GERENTE = 0
    ATENDENTE = 1
    MECANICO = 2

class Model(pydantic.BaseModel):
    m: t.Dict[TipoFuncionario, int]

    class Config:
        use_enum_values = True

Model(m={TipoFuncionario.GERENTE: 0,
         TipoFuncionario.ATENDENTE: 1,
         TipoFuncionario.MECANICO: 2}).json()

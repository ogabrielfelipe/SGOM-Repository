import random
import string
import configparser

config = configparser.ConfigParser()
config.read('CONFIG.ini')


stringKey = string.ascii_letters + string.ascii_lowercase + string.ascii_uppercase
chave = ''.join(random.choice(stringKey) for i in range(12))

DEBUG = True
SQLALCHEMY_DATABASE_URI = f"sqlite:///{config.get('DATABASE', 'DB')}"
SQLALCHEMY_TRACK_MODIFICATIONS = False
SECRET_KEY = chave























from sqlalchemy import create_engine, Column, Integer, String, ForeignKey
from sqlalchemy.orm import declarative_base, relationship, Session

# Make the engine
engine = create_engine("sqlite+pysqlite:///:memory:", future=True, echo=False)

# Make the DeclarativeMeta
Base = declarative_base()


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    name = Column(String)
    projects = relationship('Project', secondary='project_users', back_populates='users')


class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True)
    name = Column(String)
    users = relationship('User', secondary='project_users', back_populates='projects')


class ProjectUser(Base):
    __tablename__ = "project_users"

    id = Column(Integer, primary_key=True)
    notes = Column(String, nullable=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    project_id = Column(Integer, ForeignKey('projects.id'))



# Create the tables in the database
Base.metadata.create_all(engine)

# Test it
with Session(bind=engine) as session:

    # add users
    usr1 = User(name="bob")
    session.add(usr1)

    usr2 = User(name="alice")
    session.add(usr2)

    session.commit()

    # add projects
    prj1 = Project(name="Project 1")
    session.add(prj1)

    prj2 = Project(name="Project 2")
    session.add(prj2)

    session.commit()

    # map users to projects
    prj1.users = [usr1, usr2]
    prj2.users = [usr2]

    session.commit()


with Session(bind=engine) as session:

    print(session.query(User).where(User.id == 1).one().projects)
    print(session.query(Project).where(Project.id == 1).one().users)





















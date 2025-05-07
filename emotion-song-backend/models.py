from pydantic import BaseModel

class User(BaseModel):
    name: str
    email: str
    picture: str
    sub: str

class MoodAnswers(BaseModel):
    answers: dict

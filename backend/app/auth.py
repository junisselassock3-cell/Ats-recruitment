from datetime import datetime, timedelta
from jose import jwt,JWSError
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
oauth2_scheme= OAuth2PasswordBearer(tokenUrl="login")
SECRET_KEY = "une_cle_secrete_tres_longue"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60
def create_access_token(data: dict):
    to_encode=data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp":expire})
    return jwt.encode(to_encode, SECRET_KEY,algorithm=ALGORITHM)
def verify_token(token: str= Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
        if email is None:
            raise HTTPException(
                status_code=401,
                detail="Token invalide"
            )
        return email 
    except JWSError:
        raise HTTPException(
            status_code="401",
            detail="Token invalide"
        )
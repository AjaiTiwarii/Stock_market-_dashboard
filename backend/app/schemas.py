from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional

class StockPriceBase(BaseModel):
    date: datetime
    open_price: float
    high_price: float
    low_price: float
    close_price: float
    volume: int

class StockPriceCreate(StockPriceBase):
    company_id: int

class StockPrice(StockPriceBase):
    id: int
    company_id: int
    
    class Config:
        from_attributes = True

class CompanyBase(BaseModel):
    symbol: str
    name: str
    sector: str

class CompanyCreate(CompanyBase):
    pass

class Company(CompanyBase):
    id: int
    stock_prices: List[StockPrice] = []
    
    class Config:
        from_attributes = True
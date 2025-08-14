from sqlalchemy.orm import Session
from . import models, schemas
from datetime import datetime, timedelta
import random

def get_company(db: Session, company_id: int):
    return db.query(models.Company).filter(models.Company.id == company_id).first()

def get_company_by_symbol(db: Session, symbol: str):
    return db.query(models.Company).filter(models.Company.symbol == symbol).first()

def get_companies(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Company).offset(skip).limit(limit).all()

def create_company(db: Session, company: schemas.CompanyCreate):
    db_company = models.Company(**company.dict())
    db.add(db_company)
    db.commit()
    db.refresh(db_company)
    return db_company

def get_stock_prices(db: Session, company_id: int, days: int = 30):
    end_date = datetime.now()
    start_date = end_date - timedelta(days=days)
    return db.query(models.StockPrice).filter(
        models.StockPrice.company_id == company_id,
        models.StockPrice.date >= start_date
    ).order_by(models.StockPrice.date).all()

def create_stock_price(db: Session, stock_price: schemas.StockPriceCreate):
    db_stock_price = models.StockPrice(**stock_price.dict())
    db.add(db_stock_price)
    db.commit()
    db.refresh(db_stock_price)
    return db_stock_price

# Function to populate sample data
def populate_sample_data(db: Session):
    # Sample companies (Indian stock market)
    sample_companies = [
        {"symbol": "RELIANCE", "name": "Reliance Industries Ltd", "sector": "Oil & Gas"},
        {"symbol": "TCS", "name": "Tata Consultancy Services", "sector": "IT"},
        {"symbol": "INFY", "name": "Infosys Ltd", "sector": "IT"},
        {"symbol": "HINDUNILVR", "name": "Hindustan Unilever Ltd", "sector": "FMCG"},
        {"symbol": "ICICIBANK", "name": "ICICI Bank Ltd", "sector": "Banking"},
        {"symbol": "HDFCBANK", "name": "HDFC Bank Ltd", "sector": "Banking"},
        {"symbol": "SBIN", "name": "State Bank of India", "sector": "Banking"},
        {"symbol": "BHARTIARTL", "name": "Bharti Airtel Ltd", "sector": "Telecom"},
        {"symbol": "WIPRO", "name": "Wipro Ltd", "sector": "IT"},
        {"symbol": "MARUTI", "name": "Maruti Suzuki India Ltd", "sector": "Automobile"}
    ]
    
    # Create companies if they don't exist
    for company_data in sample_companies:
        existing_company = get_company_by_symbol(db, company_data["symbol"])
        if not existing_company:
            company = schemas.CompanyCreate(**company_data)
            db_company = create_company(db, company)
            
            # Generate sample stock data for the last 30 days
            base_price = random.uniform(100, 3000)
            for i in range(30):
                date = datetime.now() - timedelta(days=29-i)
                
                # Generate realistic stock data
                daily_change = random.uniform(-0.05, 0.05)  # -5% to +5% daily change
                open_price = base_price * (1 + random.uniform(-0.02, 0.02))
                close_price = open_price * (1 + daily_change)
                high_price = max(open_price, close_price) * (1 + random.uniform(0, 0.03))
                low_price = min(open_price, close_price) * (1 - random.uniform(0, 0.03))
                volume = random.randint(100000, 1000000)
                
                stock_price_data = {
                    "company_id": db_company.id,
                    "date": date,
                    "open_price": round(open_price, 2),
                    "high_price": round(high_price, 2),
                    "low_price": round(low_price, 2),
                    "close_price": round(close_price, 2),
                    "volume": volume
                }
                
                stock_price = schemas.StockPriceCreate(**stock_price_data)
                create_stock_price(db, stock_price)
                
                base_price = close_price  # Update base price for next day